import { Response } from "express";
import { AuthRequest } from "../../../shared/middleware/auth.middleware";
import { GetMeUseCase } from "../application/get-me.usecase";
import { UserRepository } from "../infrastructure/user.repository";

export const meController = async (req: AuthRequest, res: Response) => {
   try {
      const userId = req.user?.userId;

      if (!userId) {
         return res.status(401).json({ message: "Unauthorized" });
      }

      const userRepo = new UserRepository();
      const useCase = new GetMeUseCase(userRepo);

      const user = await useCase.execute(userId);

      return res.json(user);
   } catch (error: any) {
      return res.status(400).json({
         message: error.message || "Something went wrong",
      });
   }
};
