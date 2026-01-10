import { Response } from "express";
import { AuthRequest } from "../../../shared/middleware/auth.middleware"; // 🔑 bu kerak
import { UserRepository } from "../infrastructure/user.repository";
import { GetUsersUseCase } from "../application/get-users.usecase";
import { UpdateMeUseCase } from "../application/update-me.usecase";

export const getUsersController = async (req: AuthRequest, res: Response) => {
   try {
      const useCase = new GetUsersUseCase(new UserRepository());

      const result = await useCase.execute(req.query);
      res.status(200).json(result);
   } catch (error: any) {
      res.status(500).json({ message: error.message });
   }
};

export const updateMeController = async (req: AuthRequest, res: Response) => {
   try {
      const userId = req.user!.userId; 

      const userCase = new UpdateMeUseCase(new UserRepository());

      const updatedUser = await userCase.execute({
         userId,
         email: req.body.email,
         password: req.body.password,
      });

      res.status(200).json(updatedUser);
   } catch (error: any) {
      res.status(400).json({ message: error.message });
   }
}
