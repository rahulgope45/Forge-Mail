import type { Request, Response } from "express";
export declare const googleLogin: (req: Request, res: Response) => Promise<void>;
export declare const googleCallback: (req: Request, res: Response) => Promise<void>;
export declare const refresh: (req: Request, res: Response) => Promise<void>;
export declare const logout: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map