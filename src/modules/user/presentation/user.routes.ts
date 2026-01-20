import { Router } from "express";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";
import { roleMiddleware } from "../../../shared/middleware/role.middleware";
import { createUserController, deleteUserController, getUsersController, updateMeController } from "./user.controller";

const router = Router();

router.get("/users",authMiddleware,roleMiddleware(["admin"]),getUsersController);
router.patch("/me",authMiddleware,updateMeController);
router.post("/users", authMiddleware, roleMiddleware(["admin"]), createUserController);
// router.patch("/users/:id", authMiddleware, roleMiddleware(["admin"]), updateUserController);
router.delete("/users/:id", authMiddleware, roleMiddleware(["admin"]), deleteUserController);

export default router;
