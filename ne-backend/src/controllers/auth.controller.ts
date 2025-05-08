import { config } from "dotenv";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma-client";
import ServerResponse from "../utils/ServerResponse";
import { sendOtpEmail } from "../utils/otp";

config();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      ServerResponse.error(res, "Email already in use", null, 409);
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, firstName, lastName },
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
    ServerResponse.created(res, "User registered successfully", { user, token });
  } catch (error: any) {
    ServerResponse.error(res, "Error occurred", { error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      ServerResponse.error(res, "Invalid credentials", null, 401);
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      ServerResponse.error(res, "Invalid credentials", null, 401);
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
    ServerResponse.success(res, "Login successful", { user, token });
  } catch (error: any) {
    ServerResponse.error(res, "Error occurred", { error });
  }
};

export const requestOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.oTP.create({ data: { email, code } });
    await sendOtpEmail(email, code);
    ServerResponse.success(res, "OTP sent successfully");
  } catch (error: any) {
    ServerResponse.error(res, "Error occurred", { error });
  }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code } = req.body;
    const record = await prisma.oTP.findFirst({
      where: { email, code },
      orderBy: { createdAt: "desc" },
    });
    if (!record) {
      ServerResponse.error(res, "Invalid or expired OTP", null, 400);
      return;
    }
    ServerResponse.success(res, "OTP verified", { verified: true });
  } catch (error: any) {
    ServerResponse.error(res, "Error occurred", { error });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.oTP.create({ data: { email, code } });
    await sendOtpEmail(email, code);
    ServerResponse.success(res, "Reset OTP sent");
  } catch (error: any) {
    ServerResponse.error(res, "Error occurred", { error });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code, newPassword } = req.body;
    const record = await prisma.oTP.findFirst({
      where: { email, code },
      orderBy: { createdAt: "desc" },
    });
    if (!record) {
      ServerResponse.error(res, "Invalid or expired OTP", null, 400);
      return;
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashed },
    });
    ServerResponse.success(res, "Password reset successful");
  } catch (error: any) {
    ServerResponse.error(res, "Error occurred", { error });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  // token is stateless; client should discard it
  ServerResponse.success(res, "Logged out successfully");
};
