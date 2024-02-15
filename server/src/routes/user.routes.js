import { Router } from "express";
import { forgotPassword, logInUser, logoutUser, refreshAccessToken, resendEmailVerification, resetForgotPassword, userRegistration, verifyEmail } from "../controllers/user.controller.js";
import { loginUserValidator, resetForgotPasswordValidator, userForgotPasswordValidator, userRegisterValidators } from "../validators/user.validators.js"
import { validate } from "../validators/validate.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router=Router();

router.route('/register').post(userRegisterValidators(),validate,userRegistration)
router.route("/login").post(loginUserValidator(),validate,logInUser)
router.route("/verify-email/:verificationToken").get(verifyEmail)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/forgot-password").post(userForgotPasswordValidator(),validate,forgotPassword)
router.route("/reset-password/:resetPasswordToken").post(resetForgotPasswordValidator(),validate,resetForgotPassword)


router.route("/logout").post(verifyJWT,logoutUser)
router.route("/resend-email-verification").post(verifyJWT,resendEmailVerification)


export default router;