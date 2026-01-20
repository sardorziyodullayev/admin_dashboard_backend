import bcrypt from "bcrypt";
import { UserRepository } from "../infrastructure/user.repository";
import { User, UserRole } from "../domain/user.entity";

interface UpdateUserInput {
   userId: string;
   email?: string;
   password?: string;
   role?: UserRole;
}

export class UpdateUserUseCase {
   constructor(private userRepo: UserRepository) { }

   async execute(input: UpdateUserInput): Promise<Omit<User, "password">> {
      const user = await this.userRepo.findById(input.userId);
      if (!user) throw new Error("User not found");

      const updateData: Partial<User> = {};

      if (input.email) updateData.email = input.email;
      if (input.role) updateData.role = input.role;
      if (input.password) updateData.password = await bcrypt.hash(input.password, 10);

      const updated = await this.userRepo.updateById(input.userId, updateData);
      if (!updated) throw new Error("Update failed");

      return {
         id: updated.id,
         email: updated.email,
         role: updated.role,
         createdAt: updated.createdAt,
      };
   }
}
