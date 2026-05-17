import { Router } from "express";
import { googleLogin ,logout,googleCallback} from "../controller/user/user.controller.js";

const router:Router = Router();

router.get("/login", googleLogin);
router.get("/callback", googleCallback);
router.post("/logout", logout);

export default router