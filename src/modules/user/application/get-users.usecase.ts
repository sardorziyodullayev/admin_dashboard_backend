import { UserRepository } from "../infrastructure/user.repository";

export class GetUsersUseCase {
   constructor(private userRepo: UserRepository) { }

   execute(query: any) {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;

      return this.userRepo.findAll(page, limit, {
         role: query.role,
         email: query.email,
      });
   }
}
