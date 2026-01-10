import mongoose from "mongoose";
import { User, UserRole } from "../domain/user.entity";

const userSchema = new mongoose.Schema<User>({
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
}, { timestamps: true });

const UserModel = mongoose.model<User>("User", userSchema);

export class UserRepository {

   async findById(id: string): Promise<User | null> {
      return UserModel.findById(id).lean();
   }

   async findByEmail(email: string): Promise<User | null> {
      return UserModel.findOne({ email }).lean();
   }

   async updateById(id: string, data: Partial<User>) {
      return await UserModel.findByIdAndUpdate(id, data, { new: true }).lean();
   }

   async findAll(
      page: number,
      limit: number,
      filters: { role?: string; email?: string }
   ) {
      const query: any = {};

      if (filters.role) {
         query.role = filters.role;
      }

      if (filters.email) {
         query.email = { $regex: filters.email, $options: "i" };
      }

      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
         UserModel.find(query)
            .skip(skip)
            .limit(limit)
            .lean(),
         UserModel.countDocuments(query),
      ]);

      return {
         data,
         total,
         page,
         limit,
         totalPages: Math.ceil(total / limit),
      };
   }
}
