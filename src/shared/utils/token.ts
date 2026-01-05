import jwt from 'jsonwebtoken';
import { env } from "../config";

export interface JwtPayload {
   userId: string;
   role: string;
}

export const generateAccessToken = (payload: JwtPayload) => {
   return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: '15m',
   });
}

export const generateRefreshToken = (payload: JwtPayload) => {
   return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: '7d',
   });
}
