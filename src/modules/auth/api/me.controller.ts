import { Response } from "express";
import { AuthRequest } from "../../../shared/middleware/auth.middleware";
import { GetMeUseCase } from "../application/get-me.usecase";

export const meController = async (req: AuthRequest, res: Response) => {
   const userId = req.user?.userId;

   if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
   }

   const useCase = new GetMeUseCase();
   const user = await useCase.execute(userId);

   return res.json(user);
}