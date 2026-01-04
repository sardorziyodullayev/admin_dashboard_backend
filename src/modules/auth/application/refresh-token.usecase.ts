import jwt from 'jsonwebtoken';
import { env } from "../../../shared/config/env"
import { generateAccessToken } from '../../../shared/utils/token';

interface RefreshTokenPayload {
   userId: string;
}

export class RefreshTokenUseCase {
   execute(refreshToken: string): { accessToken: string } {
      try {
         const decode = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
         const accessToken = generateAccessToken({
            userId: decode.userId,
         })

         return { accessToken };
      } catch (error) {
         throw new Error('Invalid refresh token');
      }
   }
}