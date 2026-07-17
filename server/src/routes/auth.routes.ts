import { Router } from "express";
import {
  googleLogin,
  logout,
  googleCallback,
  getMe,
  refresh,
  exchangeCode,
} from "../controller/user/user.controller.js";
import { requireAuth } from "../Middleware/auth.middleware.js";
import type { AuthenticatedRequest } from "../types/auth.types.js";

const router: Router = Router();

// router.get("/me", requireAuth, (req: AuthenticatedRequest, res) => {
//   res.json(req.user);
// });

router.get("/login", googleLogin);
router.get("/callback", googleCallback);
router.get("/exchange", exchangeCode);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);
router.post('/refresh',refresh)
router.get("/debug-cookies", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  res.json(req.cookies);
});

export default router;