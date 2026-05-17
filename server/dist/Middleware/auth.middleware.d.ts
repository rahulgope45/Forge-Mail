import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../types/auth.types.js";
export declare const requireAuth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map