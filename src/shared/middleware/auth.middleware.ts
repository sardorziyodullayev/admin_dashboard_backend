import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env"

export interface AuthRequest extends Request {
   user?: {
      userId: string;
      role: string;
   };
}

interface JwtPayload {
   userId: string;
   role: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
   console.log("🔥 AUTH MIDDLEWARE TRIGGERED");

   try {
      const authHeader = req.headers.authorization;
      console.log("AUTH HEADER:", req.headers.authorization);

      if (!authHeader) {
         return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = authHeader.split(" ")[1];
      console.log("TOKEN:", token);
      if (!token) {
         return res.status(401).json({ message: 'Unauthorized' });
      }
      const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
       console.log("DECODED:", decoded);

      req.user = decoded;

      next();
   } catch (error) {
      console.log("JWT ERROR:", error);
      return res.status(401).json({ message: 'Unauthorized' });
   }
}