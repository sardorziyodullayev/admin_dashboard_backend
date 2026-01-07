import { UserRepository } from "../infrastructure/user.repository";

export class GetMeUseCase {
   constructor(private userRepo: UserRepository) { }

   async execute(userId: string) {
      const user = await this.userRepo.findById(userId);

      if (!user) {
         throw new Error("User not found");
      }

      return {
         id: user.id,
         email: user.email,
         role: user.role,
         createdAt: user.createdAt,
      };
   }
}
