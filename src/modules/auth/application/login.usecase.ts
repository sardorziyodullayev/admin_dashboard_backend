import bcrypt from 'bcrypt';
import { UserRepository } from "../infrastructure/user.repository";
import { LoginInput } from "../domain/auth.types";
import { generateAccessToken, generateRefreshToken, } from "../../../shared/utils/token";
import { RefreshTokenRepository } from '../infrastructure/refresh-token.repository';

export class LoginUseCase {
   constructor(private userRepo: UserRepository, private refreshTokenRepo: RefreshTokenRepository) { }

   async execute(input: LoginInput) {
      const user = await this.userRepo.findByEmail(input.email);

      if (!user) {
         throw new Error('Invalid email or password');
      }

      const isMatch = await bcrypt.compare(input.password, user.password);

      if (!isMatch) {
         throw new Error('Invalid email or password');
      }

      const payload = {
         userId: user.id.toString(),
         role: user.role,
      };

      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      await this.refreshTokenRepo.save({
         userId: user.id,
         token: refreshToken,
         expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
      });


      return {
         accessToken,
         refreshToken,
         user: {
            id: user.id,
            email: user.email,
            role: user.role,
         },
      };
   }
}
