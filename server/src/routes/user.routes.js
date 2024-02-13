import { Router } from "express";
import { logInUser, userRegistration } from "../controllers/user.controller.js";
import { loginUserValidator, userRegisterValidators } from "../validators/user.validators.js"
import { validate } from "../validators/validate.js"

const router=Router();

router.route('/register').post(userRegisterValidators(),validate,userRegistration)
router.route("/login").post(loginUserValidator(),validate,logInUser)

export default router;