import bcrypt from "bcrypt";
import { UserRepository } from "../infrastructure/user.repository";
import { User, UserRole } from "../domain/user.entity";

interface CreateUserInput {
   email: string;
   password: string;
   role?: UserRole;
}

export class CreateUserUseCase {
   constructor(private userRepo: UserRepository) { }

   async execute(input: CreateUserInput): Promise<Omit<User, "password">> {
      const existing = await this.userRepo.findByEmail(input.email);
      if (existing) throw new Error("Email already exists");

      const hashedPassword = await bcrypt.hash(input.password, 10);

      const user = await this.userRepo.create({
         email: input.email,
         password: hashedPassword,
         role: input.role || UserRole.USER,
      });

      return {
         id: user.id,
         email: user.email,
         role: user.role,
         createdAt: user.createdAt,
      };
   }
}
