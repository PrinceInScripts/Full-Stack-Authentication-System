import { Router } from "express";
import passport from "passport";
import { addUserByAdmin, assignRole, changeCurrentPassword, deleteUserByAdmin, forgotPassword, getAllUser, getCurrentUser, handleSocialLogin, logInUser, logoutUser, refreshAccessToken, resendEmailVerification, resetForgotPassword, updateProfile, updateUserAvatar, userRegistration, verifyEmail } from "../controllers/user.controller.js";
import { addUserViaAdminValidator, loginUserValidator, resetForgotPasswordValidator, udpateProfileValidator, userAssignRoleValidator, userChangeCurrentPasswordValidator, userForgotPasswordValidator, userRegisterValidators } from "../validators/user.validators.js"
import { validate } from "../validators/validate.js"
import { verifyJWT, verifyPermission } from "../middlewares/auth.middlewares.js";
import { userRolesEnum } from "../constant.js";
import { mongoIdPathVariableValidator } from "../validators/mongoose.validators.js";
import { upload } from "../middlewares/multer.middlewares.js";
import "../passport/index.js"

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
router.route("/update-profile").post(verifyJWT,udpateProfileValidator(),validate,updateProfile)
router.route("/admin/assign-role/:userId").post(verifyJWT,verifyPermission([userRolesEnum.ADMIN]),mongoIdPathVariableValidator("userId"),userAssignRoleValidator(),validate,assignRole)
router.route("/super-admin/assign-role/:userId").post(verifyJWT,verifyPermission([userRolesEnum.SUPER_ADMIN]),mongoIdPathVariableValidator("userId"),userAssignRoleValidator(),validate,assignRole)
router.route("/super-admin/add-user").post(verifyJWT,verifyPermission([userRolesEnum.SUPER_ADMIN]),addUserViaAdminValidator(),validate,addUserByAdmin)
router.route("/super-admin/delete-user/:userId").delete(verifyJWT,verifyPermission([userRolesEnum.SUPER_ADMIN]),deleteUserByAdmin)
router.route("/all-user").get(verifyJWT,verifyPermission([userRolesEnum.SUPER_ADMIN,userRolesEnum.ADMIN,userRolesEnum.MANAGER]),getAllUser)


router.route("/google").get(
    passport.authenticate('google',{scope:["profile","email"]}),
    (req,res)=>res.send("redirecting to google.....")
)
router.route("/github").get(
    passport.authenticate('github',{scope:["profile","email"]}),
    (req,res)=>res.send("redirecting to github.....")
)

router
  .route("/google/callback")
  .get(passport.authenticate("google"), handleSocialLogin);

router
  .route("/github/callback")
  .get(passport.authenticate("github"), handleSocialLogin);

export default router;