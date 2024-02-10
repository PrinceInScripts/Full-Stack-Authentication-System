import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { AvailableUserROles, userLoginType, userRolesEnum } from "../constant";

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

userSchema.plugin(mongooseAggregatePaginate);

export const User=mongoose.model("User",userSchema)