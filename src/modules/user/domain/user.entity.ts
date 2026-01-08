export enum UserRole {
   ADMIN = "admin",
   MANAGER = "manager",
   USER = "user",
}

export interface User {
   id: string;
   email: string;
   password: string;
   role: UserRole;
   createdAt: Date;
}
