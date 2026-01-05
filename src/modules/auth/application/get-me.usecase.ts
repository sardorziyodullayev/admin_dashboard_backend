import { UserRepository } from "../infrastructure/user.repository";

export class GetMeUseCase {
   constructor(private readonly userRepository = new UserRepository()) { }

   async execute(userId: string) {
      const user = await this.userRepository.findById(userId);

      if (!user) {
         throw new Error("User not found");
      }

      const { password, ...safeUser } = user;
      return safeUser;
   }
}