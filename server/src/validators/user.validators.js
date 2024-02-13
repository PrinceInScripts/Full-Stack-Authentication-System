import {body} from "express-validator"
import { AvailableUserROles } from "../constant.js"

const userRegisterValidators=()=>{
    return [
        body("email")
                    .trim()
                    .notEmpty()
                    .withMessage("Email is required")
                    .isEmail()
                    .withMessage("Email is not valid"),
        body("username")
                    .trim()
                    .notEmpty()
                    .withMessage("Username is required")
                    .isLowercase()
                    .withMessage("Username must be lowercase")
                    .isLength({min:3,max:20})
                    .withMessage("Username must be between 3 and 20 characters"),
        body("password")
                    .trim()
                    .notEmpty()
                    .withMessage("Password is required"),
        body("confirmPassword")
                    .trim()
                    .notEmpty()
                    .withMessage("Confirm Password is required"),
        body("role")
                    .optional()
                    .isIn(AvailableUserROles)
                    .withMessage("Invalid role")
    ]
}

const loginUserValidator=()=>{
    return [ 
        body("email")
                    .optional()
                    .isEmail()
                    .withMessage("Email is not valid"),
        body("username")
                     .optional(),
        body("password")
                    .trim()
                    .notEmpty()
                    .withMessage("Password is required")
        
    ]
}

export {
    userRegisterValidators,
    loginUserValidator
}