export const setTokenCookies = (res, accessToken, refreshToken) => {
    res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.ENVIORNMENT === "production",
        maxAge: 30 * 60 * 1000
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.ENVIORNMENT === "production",
        maxAge: 2 * 24 * 60 * 60 * 1000,
        path: "/api/auth/refresh"
    });
    //  console.log(res.getHeaders()["set-cookie"]);
};
export const clearTokenCookies = (res) => {
    res.clearCookie("token");
    res.clearCookie("refreshToken", { path: '/api/auth/refresh' });
};
//# sourceMappingURL=cookie.util.js.map