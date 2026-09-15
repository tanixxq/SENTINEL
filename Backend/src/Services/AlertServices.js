import nodemailer from "nodemailer";

console.log("EMAIL_USER loaded:", !!process.env.EMAIL_USER);
console.log("EMAIL_PASSWORD loaded:", !!process.env.EMAIL_PASSWORD);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendDownAlert = async (email, monitor) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `🚨 Sentinel Alert: ${monitor.name || monitor.url} is DOWN`,
            text: `Your Sentinel monitor "${monitor.name || monitor.url}" is currently DOWN.\n\nURL: ${monitor.url}\n\nSentinel detected that the website is not responding successfully.`
        });

        console.log(
            `[SENTINEL] Down alert sent to ${email}`
        );
    } catch (error) {
        console.log(
            `[SENTINEL] Failed to send down alert: ${error.message}`
        );
    }
};

export const sendRecoveryAlert = async (email, monitor) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `✅ Sentinel Recovery: ${monitor.name || monitor.url} is UP`,
            text: `Your Sentinel monitor "${monitor.name || monitor.url}" is back UP.\n\nURL: ${monitor.url}\n\nSentinel detected that the website is responding successfully again.`
        });

        console.log(
            `[SENTINEL] Recovery alert sent to ${email}`
        );
    } catch (error) {
        console.log(
            `[SENTINEL] Failed to send recovery alert: ${error.message}`
        );
    }
};