import mongoose from "mongoose";
import { User, UserRole } from "../domain/user.entity";

const userSchema = new mongoose.Schema(
   {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, default: "viewer" },
   },
   { timestamps: true }
);

const UserModel = mongoose.model("AuthUser", userSchema);

export class UserRepository {
   async findByEmail(email: string): Promise<User | null> {
      const user = await UserModel.findOne({ email }).lean();
      if (!user) return null;

      return {
         id: user._id.toString(),
         email: user.email,
         password: user.password,
         role: user.role as UserRole,
         createdAt: user.createdAt,
      };
   }

   async findById(id: string): Promise<User | null> {
      const user = await UserModel.findById(id).lean();
      if (!user) return null;

      return {
         id: user._id.toString(),
         email: user.email,
         password: user.password,
         role: user.role as UserRole,
         createdAt: user.createdAt,
      };
   }

   async create(user: Omit<User, "id" | "createdAt">): Promise<User> {
      const created = await UserModel.create(user);
      return {
         id: created._id.toString(),
         email: created.email,
         password: created.password,
         role: created.role as UserRole,
         createdAt: created.createdAt,
      };
   }
}
