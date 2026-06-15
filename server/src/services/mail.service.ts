import { transporter } from "../lib/mailer.js";

export const sendWelcomeMail = async (
    toEmail: string,
    name: string
): Promise<void> => {
await transporter.sendMail({
    from : `"Mail Forge <${process.env.GMAIL_USER}>"`,
    to: toEmail,
    subject: "Welcome back to MailForge ;)",
     html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
                <h2>Hey ${name}!</h2>
                <p>You just logged in successfully.</p>
                <p>If this wasn't you, please secure your account immediately.</p>
                <br/>
                <p>— Rahul</p>
            </div>
        `,

});
console.log(`Welcome email sent to ${toEmail}`);
}