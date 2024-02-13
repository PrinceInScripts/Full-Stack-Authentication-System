import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { USER_TEMPORARY_TOKEN_EXPIRY, userLoginType, userRolesEnum } from "../constant.js";

const userSchema = new Schema({
           username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            index:true,
           },
           password:{
            type:String,
            required:true,
           },
           email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true,
           },
           role:{
            type:String,
            required:true,
            enum:userRolesEnum,
            default:userRolesEnum.USER,
           },
           avatar:{
            type:String,
           },
           firstName:{
            type:String,
            default:"",
           },
           lastName:{
            type:String,
            default:""
           },
           loginType:{
            type:String,
            enum:userLoginType,
            default:userLoginType.EMAIL_PASSWORD,
           },
           isEmailVerified:{
            type:Boolean,
            default:false,
           },
           refreshToken:{
            type:String
           },
           forgotPasswordToken:{
            type:String,
           },
           forgotPasswordTokenExpiry:{
            type:Date,
           },
           emailVerificationToken:{
            type:String,
           },
           emailVerificationTokenExpiry:{
            type:Date,
           }


},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function (){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            role:this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken=function (){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateTemporaryToken=function(){
    const unhashedToken=crypto.randomBytes(20).toString("hex")

    const hashedToken=crypto.createHash("sha256").update(unhashedToken).digest("hex")

    const tokenExpiry=Date.now()+USER_TEMPORARY_TOKEN_EXPIRY

    return {unhashedToken,hashedToken,tokenExpiry}
}

userSchema.plugin(mongooseAggregatePaginate);

export const User=mongoose.model("User",userSchema)