import {AsyncHandler} from "../utils/AsyncHandler.js"
import {User} from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { userLoginType, userRolesEnum } from "../constant.js"
import { emailVerificationMailgenContent, sendEmail } from "../utils/Mail.js"
import crypto from "crypto"

const generateAccessAndRefreshToken=async (userId)=>{
    try {
        const user=await User.findById(userId)

        const accessToken=await generateAccessToken()
        const refreshToken=await generateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating the access token")
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
        "-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry"
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

const logoutUser=AsyncHandler(async (req,res)=>{
   await User.findByIdAndUpdate(
    req.user._id,
    {
        $set:{
            refreshToken:undefined
        }
    },
    {new:true}
   )

   const options={
    httpOnly:true,
    secure:true,
    // secure:process.env.NODE_ENV==='prodcution'
   }

   return res
            .status(200)
            .clearCookie("accessToken",options)
            .clearCookie("refreshToken",options)
            .json(
                new ApiError(
                    200,
                    {},
                    "User Logout Successfully"
                )
            )
})

const verifyEmail=AsyncHandler(async (req,res)=>{
      const {verificationToken}=req.params;

      if(!verificationToken){
        throw new ApiError(401,"email verification token is missing")
      }

     let hashedToken=crypto
                           .createHash("sha256")
                           .update(verificationToken)
                           .digest("hex")

     const user=await User.findOne({
        emailVerificationToken:hashedToken,
        emailVerificationTokenExpiry:{$gt:Date.now()}
     })

     if(!user){
        throw new ApiError(400,"Token is invalid and expired")
     }

     user.emailVerificationToken=undefined
     user.emailVerificationTokenExpiry=undefined

     user.isEmailVerified=true;

     await user.save({validateBeforeSave:true})

     return res
               .status(200)
               .json(
                new ApiResponse(
                    200,
                    {isEmailVerified:true},
                    "Email verified successfully"
                )
               )
})



export {
    userRegistration,
    logInUser,
    logoutUser,
    verifyEmail
}