import {env } from '../utils/env.js';
import createHttpError from 'http-errors';
import nodemailer from 'nodemailer';
import { SMTP } from '../constants/contact-constants.js';

const transporter = nodemailer.createTransport({
    host: env(SMTP.SMTP_HOST),
    port: env(SMTP.SMTP_PORT),
    auth: {
        user: env(SMTP.SMTP_USER),
        pass: env(SMTP.SMTP_PASSWORD),
    },
});
export const sendEmail = async (mailOptions) => {
    await transporter.sendMail(mailOptions);
    if (!sendEmail) {
        throw createHttpError('Failed to send the email, please try again later.');
    };
};
