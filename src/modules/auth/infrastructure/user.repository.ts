import mongoose from "mongoose";
import { User } from "../domain/user.entity";

const userSchema = new mongoose.Schema<User>(
   {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, default: "viewer" },
   },
   { timestamps: true }
);

const UserModel = mongoose.model<User>("User", userSchema);

export class UserRepository {
   async findByEmail(email: string): Promise<User | null> {
      return UserModel.findOne({ email }).lean();
   }

   async create(user: Omit<User, "id">): Promise<User> {
      const created = await UserModel.create(user);
      return created.toObject();
   }

   async findById(id: string): Promise<User | null> {
      return UserModel.findById(id).lean();
   }
};