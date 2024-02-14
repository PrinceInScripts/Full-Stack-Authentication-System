import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken"



export const verifyJWT=AsyncHandler(async (req,res,next)=>{
      const token=req?.cookies?.accessToken || req.header("Authorization").replace("Bearer ","");

      if(!token){
        throw new ApiError(401,"Unautorized Request")
      }

      try {
         const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        
         const user=await User.findById(decodedToken._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry"
         )

         if(!user){
            throw new ApiError(401,"Invalid access Token")
         }

         req.user=user
         next()
      } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
      }
})
