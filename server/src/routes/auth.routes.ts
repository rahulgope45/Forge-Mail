import { Router } from "express";
import { googleLogin ,logout} from "../controller/user/user.controller.js";

const router:Router = Router();

router.get("/google", googleLogin);
router.post("/logout", logout);
