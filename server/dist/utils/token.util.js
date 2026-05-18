import jwt from 'jsonwebtoken';
export const genrateJWT = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
};
export const genrateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "2d" });
};
export const generateTokenPair = (payload) => ({
    accessToken: genrateJWT(payload),
    refreshToken: genrateRefreshToken(payload),
});
export const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_SECRET);
};
//# sourceMappingURL=token.util.js.map