import { Router } from "express";
import { getMailJobs, sendMail } from "../../controller/user/mailSender/Mailsend.controller.js";
import { requireAuth } from "../../Middleware/auth.middleware.js";

const router = Router();

router.post('/send-mail',requireAuth,sendMail);
router.get('/mail-jobs',requireAuth,getMailJobs);

export default router;