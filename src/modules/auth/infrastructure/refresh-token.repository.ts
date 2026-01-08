import mongoose from "mongoose";
import { RefreshToken } from "../domain/refresh-token.entity";

const refreshTokenSchema = new mongoose.Schema(
   {
      userId: { type: String, required: true },
      token: { type: String, required: true },
      expiresAt: { type: Date, required: true },
   },
   { timestamps: true }
);


const RefreshTokenModel = mongoose.model<RefreshToken>(
   "RefreshToken",
   refreshTokenSchema
);

export class RefreshTokenRepository {
   async save(data: Omit<RefreshToken, "id" | "createdAt">) {
      const created = await RefreshTokenModel.create(data);
      return created.toObject();
   }

   async findByToken(token: string) {
      return RefreshTokenModel.findOne({ token }).lean();
   }

   async delete(token: string) {
      return RefreshTokenModel.deleteOne({ token });
   }
}
