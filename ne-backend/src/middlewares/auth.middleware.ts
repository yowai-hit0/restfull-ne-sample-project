import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import ServerResponse from "../utils/ServerResponse";
import { AuthRequest } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

/**
 * Verifies Bearer token and attaches payload to req.user
 */
export const verifyAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    ServerResponse.error(res, "Missing or invalid token", null, 401);
    return;
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
    };
    // cast and attach
    (req as AuthRequest).user = {
      id: payload.id,
      role: payload.role as any,
    };
    next();
  } catch {
    ServerResponse.error(res, "Invalid or expired token", null, 401);
  }
};
