import mongoose from "mongoose";
import jwt,{ JwtPayload } from "jsonwebtoken";
import logger from "../config/logger";
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

export {generateRefreshToken,generateToken,verifyRefreshToken}