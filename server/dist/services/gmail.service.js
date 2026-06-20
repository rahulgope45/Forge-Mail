import { google } from "googleapis";
export const getGmailClient = async (googleRefreshToken) => {
    const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
    oAuth2Client.setCredentials({
        refresh_token: googleRefreshToken,
    });
    return google.gmail({
        version: "v1",
        auth: oAuth2Client,
    });
};
//# sourceMappingURL=gmail.service.js.map