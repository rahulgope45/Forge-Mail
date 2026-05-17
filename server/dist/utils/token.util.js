import jwt from 'jsonwebtoken';
export const genrateJWT = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};
export const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
//# sourceMappingURL=token.util.js.map