import mongoose from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { Http } from "winston/lib/winston/transports";
import HttpStatus from "../constants/htttpStatusCode";
const generateToken = (
  id: string | mongoose.Types.ObjectId | undefined,
  role: string | undefined
): string => {
  logger.info(`id: ${id}, role: ${role}`);

  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET as string, {
    expiresIn: "1m",
  });
};

const generateRefreshToken = (
  id: string | mongoose.Types.ObjectId | undefined,
  role: string | undefined
): string => {
  return jwt.sign(
    { id: id, role: role },
    process.env.REFRESH_JWT_SECRET as string,
    {
      expiresIn: "2d",
    }
  );
};

const verifyRefreshToken = (refreshToken: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET as string
    ) as JwtPayload;

    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};

interface DecodedUser {
  id: string;
  email: string;
  role?: string;
  iat: number;
  exp: number;
}

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    console.log(req.headers);
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      res.status(401).json({ message: "Authorization header missing" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token missing" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DecodedUser;

    (req as any).user = decoded;
    next(); // ✅ continue if valid
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
    res.status(HttpStatus.UNAUTHORIZED).json({ message: "Invalid or expired token" });
  }
};

export { generateRefreshToken, generateToken, verifyRefreshToken };
