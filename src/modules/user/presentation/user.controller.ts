import { Response } from "express";
import { AuthRequest } from "../../../shared/middleware/auth.middleware";
import { UserRepository } from "../infrastructure/user.repository";
import { GetUsersUseCase } from "../application/get-users.usecase";
import { UpdateMeUseCase } from "../application/update-me.usecase";
import { CreateUserUseCase } from "../application/create-user.usecase";
import { DeleteUserUseCase } from "../application/delete-user.usecase";
import { UpdateUserUseCase } from "../application/update-user.usecase";

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

export const createUserController = async (req: AuthRequest, res: Response) => {
   try {
      const useCase = new CreateUserUseCase(new UserRepository());
      const user = await useCase.execute({
         email: req.body.email,
         password: req.body.password,
         role: req.body.role,
      });
      res.status(201).json(user);
   } catch (error: any) {
      res.status(400).json({ message: error.message });
   }
};

export const updateUserController = async (req: AuthRequest, res: Response) => {
   try {
      const useCase = new UpdateUserUseCase(new UserRepository());
      const updated = await useCase.execute({ userId: req.params.id, ...req.body });
      res.status(200).json(updated);
   } catch (error: any) {
      res.status(400).json({ message: error.message });
   }
};

export const deleteUserController = async (req: AuthRequest, res: Response) => {
   try {
      const useCase = new DeleteUserUseCase(new UserRepository());
      const result = await useCase.execute(req.params.id);
      res.status(200).json(result);
   } catch (error: any) {
      res.status(400).json({ message: error.message });
   }
};
