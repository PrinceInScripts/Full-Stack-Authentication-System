import { Router } from "express";
import { assignRole, changeCurrentPassword, forgotPassword, getCurrentUser, logInUser, logoutUser, refreshAccessToken, resendEmailVerification, resetForgotPassword, userRegistration, verifyEmail } from "../controllers/user.controller.js";
import { loginUserValidator, resetForgotPasswordValidator, userAssignRoleValidator, userChangeCurrentPasswordValidator, userForgotPasswordValidator, userRegisterValidators } from "../validators/user.validators.js"
import { validate } from "../validators/validate.js"
import { verifyJWT, verifyPermission } from "../middlewares/auth.middlewares.js";
import { userRolesEnum } from "../constant.js";
import { mongoIdPathVariableValidator } from "../validators/mongoose.validators.js";

const router=Router();

router.route('/register').post(userRegisterValidators(),validate,userRegistration)
router.route("/login").post(loginUserValidator(),validate,logInUser)
router.route("/verify-email/:verificationToken").get(verifyEmail)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/forgot-password").post(userForgotPasswordValidator(),validate,forgotPassword)
router.route("/reset-password/:resetPasswordToken").post(resetForgotPasswordValidator(),validate,resetForgotPassword)


router.route("/logout").post(verifyJWT,logoutUser)
router.route("/resend-email-verification").post(verifyJWT,resendEmailVerification)

router.route("/change-password").post(verifyJWT,userChangeCurrentPasswordValidator(),validate,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/assign-role/admin/:userId").post(verifyJWT,verifyPermission([userRolesEnum.ADMIN]),mongoIdPathVariableValidator("userId"),userAssignRoleValidator(),validate,assignRole)
router.route("/assign-role/super-admin/:userId").post(verifyJWT,verifyPermission([userRolesEnum.SUPER_ADMIN]),mongoIdPathVariableValidator("userId"),userAssignRoleValidator(),validate,assignRole)

export default router;