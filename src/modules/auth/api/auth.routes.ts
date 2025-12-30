import { Router } from "express";
import { loginController, registerController } from "./auth.controller";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";
import { roleMiddleware } from "../../../shared/middleware/role.middleware";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/me", authMiddleware, (req: any, res) => {
   res.json({
      message: "Protected route",
      user: req.user,
   });
});

router.get("/admin-only", authMiddleware, roleMiddleware(["admin"]), (req: any, res) => {
   res.json({ message: "Admin access granted" })
});

export default router;