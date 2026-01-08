import { Request, Response } from "express";
import { UserRepository } from "../infrastructure/user.repository";
import { GetUsersUseCase } from "../application/get-users.usecase";

export const getUsersController = async (req: Request, res: Response) => {
   const useCase = new GetUsersUseCase(new UserRepository());
   const result = await useCase.execute(req.query);
   res.json(result);
};