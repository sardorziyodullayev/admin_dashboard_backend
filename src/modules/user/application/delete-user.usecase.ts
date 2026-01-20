import { UserRepository } from "../infrastructure/user.repository";

export class DeleteUserUseCase {
   constructor(private userRepo: UserRepository) { }

   async execute(userId: string) {
      const deleted = await this.userRepo.deleteById(userId);
      if (!deleted) throw new Error("User not found or already deleted");
      return { message: "User deleted successfully" };
   }
}
