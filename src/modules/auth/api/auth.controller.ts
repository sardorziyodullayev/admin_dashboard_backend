import { Request, Response } from "express";
import { RegisterUseCase } from "../application/register.usecase";
import { UserRepository } from "../infrastructure/user.repository";

export const registerController = async (req: Request, res: Response) => {
   try {
      const useCase = new RegisterUseCase(new UserRepository());

      const user = await useCase.execute(req.body);

      res.status(201).json(user);
   } catch (error: any) {
      res.status(400).json({ message: error.message });
   }
};