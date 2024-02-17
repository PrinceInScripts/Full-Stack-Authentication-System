import passport from "passport"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import {Strategy as GithubStrategy} from "passport-github2"
import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { userLoginType, userRolesEnum } from "../constant.js"


try {
    passport.serializeUser((user,next)=>{
        next(null,user._id)
    })

    passport.deserializeUser(async (id,next)=>{
        try {
            const user=await User.findById(id)

            if(user)
               next(null,user);
            else
               next(new ApiError(404,"User does not exist"),null)
        } catch (error) {
            next(
                new ApiError(
                    500,
                    "Something went wrong while desrializing the user. Error: "+error
                ),
                null
            )
        }
    })

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
            },
            async (_,__,profile,next)=>{
                const user=await User.findOne({email:profile.email[0].value})

                if(user){
                    if(user.loginType !== userLoginType.GOOGLE){
                        next(
                            new ApiError(
                              400,
                              "You have previously registered using " +
                                user.loginType?.toLowerCase()?.split("_").join(" ") +
                                ". Please use the " +
                                user.loginType?.toLowerCase()?.split("_").join(" ") +
                                " login option to access your account."
                            ),
                            null
                          );
                    } else{
                        next(null,user)
                    }
                }else {
                    const createUser=await User.create({
                        email:profile._json.email,
                        passport:profile._json.email,
                        username:profile._json.email?.split("@")[0],
                        isEmailVerified:true,
                        role:userRolesEnum.USER,
                        avatar:profile._json.piture,
                        loginType:userLoginType.GOOGLE
                    })

                    if(createUser){
                        next(null,createUser)
                    } else {
                        next(new ApiError(500,"Error while regsitering the user"),null)
                    }
                }
            }
        )
    )


    passport.use(
        new GithubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: process.env.GITHUB_CALLBACK_URL,
            },
            async (_,__,profile,next)=>{
                const user=await User.findOne({email:profile._json.email})

                if(user){
                    if(user.loginType !== userLoginType.GITHUB){
                        next(
                            new ApiError(
                              400,
                              "You have previously registered using " +
                                user.loginType?.toLowerCase()?.split("_").join(" ") +
                                ". Please use the " +
                                user.loginType?.toLowerCase()?.split("_").join(" ") +
                                " login option to access your account."
                            ),
                            null
                          );
                    } else {
                        next(null,user)
                    }
                } else {
                    if(!profile._json.email){
                        next(
                            new ApiError(
                                400,
                                "User does not have a public email associated with their account. Please try another login method"
                            ),
                            null
                        )
                    } else {
                        const userNameExist=await User.findOne({
                            username:profile?.username
                        })

                        const createUser=await User.create({
                            email: profile._json.email,
                            password:profile._json.node_id,
                            username: userNameExist ? profile._json.email?.split("@")[0] : profile?.username,
                            isEmailVerified:true,
                            role:userRolesEnum.USER,
                            avatar:profile._json.avatar_url,
                            loginType:userLoginType.GITHUB
                        });
                        if(createUser){
                            next(null,createUser)
                        }else {
                            next(new ApiError(500,"Error while register the user"),null)
                        }
                    }
                }
            }
        )
    )
} catch (error) {
    console.log("passport error : ",error);
}