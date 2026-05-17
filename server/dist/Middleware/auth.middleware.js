import { verifyJWT } from "../utils/token.util.js";
export const requireAuth = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        req.user = verifyJWT(token);
        next();
    }
    catch {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
//# sourceMappingURL=auth.middleware.js.map