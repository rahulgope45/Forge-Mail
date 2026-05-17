import axios from "axios";
import { googleConfig } from "../config/google.config.js";
export const getGoogleAuthUrl = () => {
    const params = new URLSearchParams({
        client_id: googleConfig.clientID,
        redirect_uri: googleConfig.redirectUri,
        response_type: "code",
        scope: googleConfig.scopes.join(" "),
        access_type: "offline",
        prompt: "consent",
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
};
export const exchangeCodeForToken = async (code) => {
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
        code,
        client_id: googleConfig.clientID,
        client_secret: googleConfig.clientSecret,
        redirect_uri: googleConfig.redirectUri,
        grant_type: "authorization_code",
    });
    return data;
};
export const getGoogleUser = async (accessToken) => {
    const { data } = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", { headers: { Authorization: `Bearer ${accessToken}` } });
    return data;
};
//# sourceMappingURL=auth.service.js.map