import { Router } from "express";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";
import { roleMiddleware } from "../../../shared/middleware/role.middleware";
import { getUsersController, updateMeController } from "./user.controller";

const router = Router();

router.get(
   "/users",
   authMiddleware,
   roleMiddleware(["admin"]),
   getUsersController
);

router.patch(
   "/me",
   authMiddleware,
   updateMeController
);

export default router;
