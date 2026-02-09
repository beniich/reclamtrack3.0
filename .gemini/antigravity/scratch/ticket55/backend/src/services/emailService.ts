import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

let transporter: any = null;

// Initialize only if SMTP is configured
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });
}

export const sendMail = async ({
    to,
    subject,
    html
}: {
    to: string;
    subject: string;
    html: string;
}) => {
    if (!transporter) {
        logger.warn('⚠️  Service email non configuré - email non envoyé');
        return null;
    }

    const info = await transporter.sendMail({
        from: `"ReclamTrack" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html
    });
    logger.info(`✉️ Email envoyé : ${info.messageId}`);
    return info;
};
