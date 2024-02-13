import {AsyncHandler} from "../utils/AsyncHandler.js"
import {User} from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { userLoginType, userRolesEnum } from "../constant.js"
import { emailVerificationMailgenContent, sendEmail } from "../utils/Mail.js"

// const generateAccessAndRefreshToken=async (userId)=>{
//     try {
//         const user=await User.findById(userId)

//         const accessToken=await generateAccessToken()
//         const refreshToken=await generateRefreshToken()

//         user.refreshToken=refreshToken
//         await user.save({validateBeforeSave:false})

//         return {accessToken,refreshToken}
//     } catch (error) {
//         throw new ApiError(500,"Something went wrong while generating the access token")
//     }
// }

const generateAccessAndRefreshToken=async (userId)=>{
    try {
        const user=await User.findById(userId)
    
        const accessToken=await user.generateAccessToken()
        const refreshToken=await user.generateRefreshToken()
    
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
    
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(401,"access and refresh token is not created")
    }

}

const userRegistration=AsyncHandler (async (req,res)=>{
    const {username, email, password,confirmPassword,role}=req.body

    if(password!==confirmPassword){
        throw new ApiError(400, "Passwords do not match")
    }

    const existedUser=await User.findOne({
        $or:[{email},{username}]
    })

    if(existedUser){
        throw new ApiError(400,"User already exists")
    }

    const user=await User.create({
        username,
        email,
        password,
        isEmailVerified:false,
        role:role || userRolesEnum.USER
    })

    const {unhashedToken,hashedToken,tokenExpiry}=user.generateTemporaryToken()
    user.emailVerificationToken=hashedToken
    user.emailVerificationTokenExpiry=tokenExpiry
    await user.save({validateBeforeSave:false})

    const mailgenContent = await emailVerificationMailgenContent(
        user.username,
        `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashedToken}`
    );

    await sendEmail({
        email:user?.email,
        subject:"Please verify your email",
        mailgenContent
    });

    const createUser=await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    )

    if(!createUser){
        throw new ApiError(500, "user not created")
    }

    return res
             .status(201)
             .json(
                new ApiResponse(
                    200,
                    createUser,
                    "Users registered successfully and verification email has been sent on your email."
                )
             )
                                            

})

const logInUser=AsyncHandler(async (req, res)=>{
    const {email,username,password}=req.body

    const user=await User.findOne({
        $or:[{email},{username}]
    })

    if(!user){
        throw new ApiError(401,"Invalid crdentials")
    }

    if(user.loginType !== userLoginType.EMAIL_PASSWORD){
        throw new ApiError(401,
            "You have previously registered using " +
            user.loginType?.toLowerCase() +
            ". Please use the " +
            user.loginType?.toLowerCase() +
            " login option to access your account."
            )
    }

    const isPasswordValid=await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid credentials")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)

    const loggedInUser=await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    )

    const options={
        httpOnly:true,
        secure:true,
        // secure: process.env.NODE_ENV === "production",
    }

    return res
             .status(200)
             .cookie("accessToken",accessToken,options)
             .cookie("refreshToken",refreshToken,options)
             .json(
                new ApiResponse(
                    200,
                    {
                        loggedInUser,accessToken,refreshToken
                    },
                    "User logged In Successfully"
                )
             )

})


export {
    userRegistration,
    logInUser
}