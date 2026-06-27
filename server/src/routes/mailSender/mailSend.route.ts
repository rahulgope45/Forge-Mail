import { Router } from "express";
import { sendMail } from "../../controller/user/mailSender/Mailsend.controller.js";
import { requireAuth } from "../../Middleware/auth.middleware.js";

const router = Router();

router.post('/send-mail',requireAuth,sendMail);

export default router;