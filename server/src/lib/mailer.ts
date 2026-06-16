import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER!,
        pass: process.env.GMAIL_APP_PASSWORD!,
    },
});

// ======= Verification of the connection on startup ======

export const testMailerConnection = async (): Promise<boolean> => {
    try {
        await transporter.verify();
        console.log("|\\/| Mailer is connected");
        return true;
    } catch (error) {
        console.log("|\/| Mailer failed to connect",error);
        return false;
    }
}