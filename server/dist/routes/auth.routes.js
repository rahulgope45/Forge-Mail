import { Router } from "express";
import { googleLogin, logout } from "../controller/user/user.controller.js";
const router = Router();
router.get("/google", googleLogin);
router.post("/logout", logout);
//# sourceMappingURL=auth.routes.js.map