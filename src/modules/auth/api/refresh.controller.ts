import { Request, Response } from "express";
import { RefreshTokenUseCase } from "../application/refresh-token.usecase";

export const refreshTokenController = (req: Request, res: Response) => {
   const { refreshToken } = req.body;

   if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
   }

   const useCase = new RefreshTokenUseCase();
   const result = useCase.execute(refreshToken);

   return res.status(200).json(result);
}