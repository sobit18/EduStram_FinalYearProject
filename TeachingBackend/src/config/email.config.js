import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs/promises";
import logger from "./logger.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let transporter;

const initializeEmail = () => {
    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_PORT === '465',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

const loadTemplate = async (templateName) => {
    const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.hbs`);
    const template = await fs.readFile(templatePath, 'utf-8');
    return handlebars.compile(template);
};

const sendEmail = async ({ to, subject, template, data }) => {
    try {
        const compiledTemplate = await loadTemplate(template);
        const html = compiledTemplate(data);

        const result = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html,
        });

        logger.info('Email sent successfully', { messageId: result.messageId });
        return result;
    } catch (error) {
        logger.error('Email sending failed:', error);
        throw error;
    }
};

const emailconfig = {
    initializeEmail,
    sendEmail,
};

export default emailconfig;
