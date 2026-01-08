import { RefreshTokenRepository } from "../infrastructure/refresh-token.repository";

export class LogoutUseCase {
   constructor(
      private readonly refreshTokenRepo: RefreshTokenRepository
   ) { }

   async execute(refreshToken: string): Promise<void> {
      if (!refreshToken) {
         throw new Error("Refresh token required");
      }

      await this.refreshTokenRepo.deleteByToken(refreshToken);
   }
}
