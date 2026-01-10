import bcrypt from "bcrypt";
import { UserRepository } from "../infrastructure/user.repository";
import { UpdateMeInput } from "../domain/update-me.types";

export class UpdateMeUseCase {
   constructor(private userRepo: UserRepository) { }

   async execute(input: UpdateMeInput) {
      const { userId, email, password } = input;

      const user = await this.userRepo.findById(userId);
      if (!user) {
         throw new Error("User not found");
      }

      const updateData: any = {};

      if (email) {
         updateData.email = email;
      }

      if (password) {
         updateData.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await this.userRepo.updateById(
         userId,
         updateData
      );

      if (!updatedUser) {
         throw new Error("Update failed");
      }

      return {
         id: updatedUser.id,
         email: updatedUser.email,
         role: updatedUser.role,
         createdAt: updatedUser.createdAt,
      };
   }
}
