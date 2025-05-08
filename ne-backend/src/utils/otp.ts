import { config } from "dotenv";
import nodemailer from "nodemailer";

config();

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT ? Number(SMTP_PORT) : 587,
  secure: SMTP_SECURE === "true",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export async function sendOtpEmail(to: string, code: string): Promise<void> {
  await transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${code}`,
    html: `<p>Your OTP code is: <strong>${code}</strong></p>`,
  });
}
