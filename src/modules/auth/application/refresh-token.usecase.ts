import jwt from 'jsonwebtoken';
import { env } from "../../../shared/config/env"
import { generateAccessToken, generateRefreshToken } from '../../../shared/utils/token';
import { RefreshTokenRepository } from '../infrastructure/refresh-token.repository';

interface RefreshTokenPayload {
   userId: string;
   role: string;
}

export class RefreshTokenUseCase {
   constructor(private refreshTokenRepo: RefreshTokenRepository) { }

   async execute(oldRefreshToken: string): Promise<{ accessToken: string, refreshToken: string }> {
      let decoded: RefreshTokenPayload;

      try {
         decoded = jwt.verify(
            oldRefreshToken,
            env.JWT_REFRESH_SECRET
         ) as RefreshTokenPayload;
      } catch {
         throw new Error("Invalid refresh token");
      }

      const storedToken = await this.refreshTokenRepo.findValidToken(oldRefreshToken);

      if (!storedToken) {
         throw new Error("Refresh token expired or not found");
      }

      await this.refreshTokenRepo.deleteByToken(oldRefreshToken);

      const newRefreshToken = generateRefreshToken({
         userId: decoded.userId,
         role: decoded.role,
      })

      const accessToken = generateAccessToken({
         userId: decoded.userId,
         role: decoded.role,
      });

      await this.refreshTokenRepo.save({
         userId: decoded.userId,
         token: newRefreshToken,
         expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000 
         ),
      })

      return {
         accessToken,
         refreshToken: newRefreshToken,
      };
   }
}