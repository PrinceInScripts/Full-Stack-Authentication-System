import { Router } from "express";
import { addUserByAdmin, assignRole, changeCurrentPassword, deleteUserByAdmin, forgotPassword, getCurrentUser, logInUser, logoutUser, refreshAccessToken, resendEmailVerification, resetForgotPassword, updateUserAvatar, userRegistration, verifyEmail } from "../controllers/user.controller.js";
import { addUserViaAdminValidator, loginUserValidator, resetForgotPasswordValidator, userAssignRoleValidator, userChangeCurrentPasswordValidator, userForgotPasswordValidator, userRegisterValidators } from "../validators/user.validators.js"
import { validate } from "../validators/validate.js"
import { verifyJWT, verifyPermission } from "../middlewares/auth.middlewares.js";
import { userRolesEnum } from "../constant.js";
import { mongoIdPathVariableValidator } from "../validators/mongoose.validators.js";
import { upload } from "../middlewares/multer.middlewares.js";

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
router.route("/avatar").post(verifyJWT,upload.single('avatar'),updateUserAvatar)
router.route("/admin/assign-role/:userId").post(verifyJWT,verifyPermission([userRolesEnum.ADMIN]),mongoIdPathVariableValidator("userId"),userAssignRoleValidator(),validate,assignRole)
router.route("/super-admin/assign-role/:userId").post(verifyJWT,verifyPermission([userRolesEnum.SUPER_ADMIN]),mongoIdPathVariableValidator("userId"),userAssignRoleValidator(),validate,assignRole)
router.route("/super-admin/add-user").post(verifyJWT,verifyPermission([userRolesEnum.SUPER_ADMIN]),addUserViaAdminValidator(),validate,addUserByAdmin)
router.route("/super-admin/delete-user/:userId").delete(verifyJWT,verifyPermission([userRolesEnum.SUPER_ADMIN]),deleteUserByAdmin)

export default router;