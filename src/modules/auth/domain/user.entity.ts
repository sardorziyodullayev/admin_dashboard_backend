export type UserRole = "admin" | "manager" | "viewer";

export interface User {
   id: string;
   email: string;
   password: string;
   role: UserRole;
   createdAt: Date;
}