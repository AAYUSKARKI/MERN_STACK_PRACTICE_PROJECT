import { Router } from "express";
import { 
    signup,
    login,
    logout,
    updateprofile,
    changePassword,
    getyourprofile
     } from "../controller/user.controller.js";

import VerifyJwt from "../middleware/auth.middleware.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(VerifyJwt,logout);
router.route("/updateprofile").patch(VerifyJwt,updateprofile);
router.route("/changepassword").patch(VerifyJwt,changePassword);
router.route("/getyourprofile").get(VerifyJwt,getyourprofile);

export default router;