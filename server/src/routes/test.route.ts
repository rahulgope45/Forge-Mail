import { Router } from "express";
import { requireAuth } from "../Middleware/auth.middleware.js";
import { sendTestEmail } from "../test/gmailClient.test.js";

const route = Router();

route.post("/email/test",requireAuth,sendTestEmail)