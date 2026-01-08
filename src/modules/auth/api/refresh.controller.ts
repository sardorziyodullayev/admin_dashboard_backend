import { Request, Response } from "express";
import { RefreshTokenUseCase } from "../application/refresh-token.usecase";
import { RefreshTokenRepository } from "../infrastructure/refresh-token.repository";

export const refreshTokenController = async (req: Request, res: Response) => {
   try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
         return res.status(400).json({ message: 'Refresh token is required' });
      }

      const useCase = new RefreshTokenUseCase(
         new RefreshTokenRepository()
      );

      const result = await useCase.execute(refreshToken);

      return res.status(200).json(result);
   } catch (error: any) {
      return res.status(401).json({ message: error.message });
   }
};