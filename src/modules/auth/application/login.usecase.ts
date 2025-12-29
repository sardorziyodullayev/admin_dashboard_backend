import bcrty from 'bcrypt';
import jwt from "jsonwebtoken";
import { UserRepository } from "../infrastructure/user.repository";
import { LoginInput } from "../domain/auth.types";

export class LoginUseCase {
   constructor(private userRepo: UserRepository) { }

   async execute(input: LoginInput) {
      // Find user by email
      const user = await this.userRepo.findByEmail(input.email);
      if (!user) {
         throw new Error('Invalid email or password');
      }

      // Compare passwords
      const isMatch = await bcrty.compare(input.password, user.password);
      if (!isMatch) {
         throw new Error('Invalid email or password');
      }

      // Generate JWT token
      const token = jwt.sign(
         {
            userId: user.id,
            role: user.role,
         },
         process.env.JWT_SECRET as string,
         { expiresIn: '1d' }
      );

      return {
         token,
         user: {
            id: user.id,
            email: user.email,
            role: user.role,
         },
      };
   }
}