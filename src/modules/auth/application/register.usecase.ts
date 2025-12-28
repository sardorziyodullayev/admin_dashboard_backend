import bcrypt from "bcrypt";
import { UserRepository } from "../infrastructure/user.repository";
import { RegisterInput } from "../domain/auth.types";

export class RegisterUseCase {
   constructor(private userRepo: UserRepository) { }

   async execute(input: RegisterInput) {
      const existingUser = await this.userRepo.findByEmail(input.email);

      if (existingUser) {
         throw new Error("User already exits");
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);

      const user = await this.userRepo.create({
         email: input.email,
         password: hashedPassword,
         role: "viewer",
         createdAt: new Date(),
      });

      return {
         id: user.id,
         email: user.email,
         role: user.role,
      };
   }
};