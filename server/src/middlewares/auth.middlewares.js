import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken"



// export const verifyJWT=AsyncHandler(async (req,res,next)=>{
//       const token=req?.cookies?.accessToken || req.header("Authorization").replace("Bearer ","");
//       console.log(token);

//       if(!token){
//         throw new ApiError(401,"Unautorized Request")
//       }

//       try {
//          const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        
//          const user=await User.findById(decodedToken._id).select(
//             "-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry"
//          )

//          if(!user){
//             throw new ApiError(401,"Invalid access Token")
//          }

//          req.user=user
//          next()
//       } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid access token");
//       }
// })

export const verifyJWT = AsyncHandler(async (req, res, next) => {
   let token;
   if (req.cookies && req.cookies.accessToken) {
       token = req.cookies.accessToken;
   } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       token = req.headers.authorization.split(' ')[1];
   }

   if (!token) {
       throw new ApiError(401, "Unauthorized Request");
   }
   

   try {
       const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
       const user = await User.findById(decodedToken._id).select("-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry");

       if (!user) {
           throw new ApiError(401, "Invalid access Token");
       }

       req.user = user;
       next();
   } catch (error) {
       throw new ApiError(401, error?.message || "Invalid access token");
   }
});

export const verifyPermission= (roles=[])=>
   
    AsyncHandler(async (req,res,next)=>{
        console.log("hiji");
      if(!req.user?._id){
         throw new ApiError(401,"Unathorized request")
      }

      if(roles.includes(req.user.role)){
        console.log("hih");
         next()
      }else{
         throw new ApiError(403,"You are not allowed to perform these action")
      }
    })
