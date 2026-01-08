import jwt from 'jsonwebtoken';
import { env } from "../../../shared/config/env"
import { generateAccessToken } from '../../../shared/utils/token';
import { RefreshTokenRepository } from '../infrastructure/refresh-token.repository';

interface RefreshTokenPayload {
   userId: string;
   role: string;
}

export class RefreshTokenUseCase {
   constructor(private refreshTokenRepo: RefreshTokenRepository) { }

   async execute(refreshToken: string): Promise<{ accessToken: string }> {
      let decoded: RefreshTokenPayload;

      try {
         decoded = jwt.verify(
            refreshToken,
            env.JWT_REFRESH_SECRET
         ) as RefreshTokenPayload;
      } catch {
         throw new Error("Invalid refresh token");
      }

      const storedToken = await this.refreshTokenRepo.findValidToken(refreshToken);

      if (!storedToken) {
         throw new Error("Refresh token expired or not found");
      }

      const accessToken = generateAccessToken({
         userId: decoded.userId,
         role: decoded.role,
      });

      return { accessToken };
   }
}