import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../errors/app.error";

export const validate =
   (schema: ZodSchema) =>
      (req: Request, res: Response, next: NextFunction) => {
         const result = schema.safeParse(req.body);

         if (!result.success) {
            throw new AppError(
               result.error.issues[0]?.message || "Noto‘g‘ri ma’lumot",
               400
            );
         }

         next();
      };
