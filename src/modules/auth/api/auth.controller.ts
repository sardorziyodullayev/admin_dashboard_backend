import { Request, Response } from "express";
import { RegisterUseCase } from "../application/register.usecase";
import { LoginUseCase } from "../application/login.usecase";
import { UserRepository } from "../infrastructure/user.repository";
import { RefreshTokenRepository } from "../infrastructure/refresh-token.repository";
import { LogoutUseCase } from "../application/logout.usecase";

export const registerController = async (req: Request, res: Response) => {
   try {
      const useCase = new RegisterUseCase(new UserRepository());

      const user = await useCase.execute(req.body);

      res.status(201).json(user);
   } catch (error: any) {
      res.status(400).json({ message: error.message });
   }
};

export const loginController = async (req: Request, res: Response) => {
   try {
      const useCase = new LoginUseCase(new UserRepository(), new RefreshTokenRepository());

      const result = await useCase.execute(req.body);

      res.status(200).json(result);
   } catch (error: any) {
      res.status(401).json({ message: error.message });
   }
};

export const logoutController = async (req: Request, res: Response) => {
   try {
      const refreshToken = req.body.refreshToken;

      const usecase = new LogoutUseCase(new RefreshTokenRepository());
      await usecase.execute(refreshToken);

      res.status(200).json({ message: "Logged out successfully" });
   } catch (error: any) {
      res.status(400).json({ message: error.message });
   }
};