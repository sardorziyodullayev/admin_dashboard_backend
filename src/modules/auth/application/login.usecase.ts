import bcrty from 'bcrypt';
import jwt from "jsonwebtoken";
import { UserRepository } from "../infrastructure/user.repository";
import { LoginInput } from "../domain/auth.types";

export class LoginUseCase {
   constructor(private userRepo: UserRepository) { }

   async execute(input: LoginInput) {
      const user = await this.userRepo.findByEmail(input.email);
      if (!user) {
         throw new Error('Invalid email or password');
      }

      const isMatch = await bcrty.compare(input.password, user.password);
      if (!isMatch) {
         throw new Error('Invalid email or password');
      }

      const accessToken = jwt.sign(
         {
            userId: user.id,
            role: user.role,
         },
         process.env.JWT_SECRET as string,
         { expiresIn: '1d' }
      );

      const refreshToken = jwt.sign(
         {
            userId: user.id,
            role: user.role,
         },
         process.env.JWT_REFRESH_SECRET as string,
         { expiresIn: '7d' }
      );

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