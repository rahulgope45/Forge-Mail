import type{ NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../types/auth.types.js";
import { verifyJWT } from "../utils/token.util.js";

export const requireAuth =(
    req: AuthenticatedRequest,
    res:Response,
    next: NextFunction
): void =>{
  console.log(req.cookies);

  const authHeader  = req.headers.authorization;
    const headerToken = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : undefined;

    //  Fallback to cookie (for browser-based requests)
    const cookieToken = req.cookies?.token as string | undefined;

   const token = headerToken || cookieToken;

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