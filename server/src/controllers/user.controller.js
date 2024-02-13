import {AsyncHandler} from "../utils/AsyncHandler.js"
import {User} from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { userRolesEnum } from "../constant.js"
import { emailVerificationMailgenContent, sendEmail } from "../utils/Mail.js"

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
                    "User created successfully",

                )
             )
                                            

})

export {
    userRegistration
}