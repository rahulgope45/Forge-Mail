import { Router } from "express";
import {
  googleLogin,
  logout,
  googleCallback,
  getMe,
} from "../controller/user/user.controller.js";
import { requireAuth } from "../Middleware/auth.middleware.js";
import type { AuthenticatedRequest } from "../types/auth.types.js";

const router: Router = Router();

// router.get("/me", requireAuth, (req: AuthenticatedRequest, res) => {
//   res.json(req.user);
// });

router.get("/login", googleLogin);
router.get("/callback", googleCallback);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);

export default router;