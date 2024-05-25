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

const userForgotPasswordValidator=()=>{
    return [
        body("usernameOrEmail")
          .notEmpty()
          .withMessage("Username or email is required")
          .isEmail()
          .withMessage("Invalid email")
          .bail()
          .custom((value, { req }) => {
            if (!value.includes("@")) { 
              if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                throw new Error("Invalid username");
              }
            }
            return true;
          }),
      ];
}

const resetForgotPasswordValidator=()=>{
    return [
        body("password")
                         .notEmpty()
                         .withMessage("Passsword is required")
    ]
}

const userChangeCurrentPasswordValidator = () => {
    return [
      body("oldPassword").notEmpty().withMessage("Old password is required"),
      body("newPassword").notEmpty().withMessage("New password is required"),
    ];
  };

const userAssignRoleValidator = () => {
    return [
      body("role")
        .optional()
        .isIn(AvailableUserROles)
        .withMessage("Invalid user role"),
    ];
 };

const addUserViaAdminValidator=()=>{
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
        body("role")
                .optional()
                .isIn(AvailableUserROles)
                .withMessage("Invalid role")
    ]
}

const udpateProfileValidator=()=>{
    return [
        body("firstName")
                       .trim()
                       .notEmpty()
                       .withMessage("firstName is required"),
        body("lastName")
                       .trim()
                       .notEmpty()
                       .withMessage("LastName is required"),
        body("username")
                       .optional()
                       .trim()
                       .notEmpty()
                       .withMessage("Username is required")
                       .isLowercase()
                       .withMessage("Username must be lowercase")
                       .isLength({min:3,max:20})
                       .withMessage("Username must be between 3 and 20 characters"),
    ]
}

export {
    userRegisterValidators,
    loginUserValidator,
    userForgotPasswordValidator,
    resetForgotPasswordValidator,
    userChangeCurrentPasswordValidator,
    userAssignRoleValidator,
    addUserViaAdminValidator,
    udpateProfileValidator
}
