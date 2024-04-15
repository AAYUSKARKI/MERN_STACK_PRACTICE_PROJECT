import { Router } from "express";
import { sendmessage, getallmessages, getmessage } from "../controller/message.controller";
import VerifyJwt from "../middleware/auth.middleware";
const router = Router();

router.route("/sendmessage/:id").post(VerifyJwt,sendmessage);
router.route("/getallmessages").get(VerifyJwt,getallmessages);
router.route("/getmessage/:id").get(VerifyJwt,getmessage);

export default router

