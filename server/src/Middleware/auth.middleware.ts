import type{ NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../types/auth.types.js";
import { verifyJWT } from "../utils/token.util.js";

export const requireAuth =(
    req: AuthenticatedRequest,
    res:Response,
    next: NextFunction
): void =>{
   const token = req.cookies?.token as string | undefined;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    req.user = verifyJWT(token);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  } 
}