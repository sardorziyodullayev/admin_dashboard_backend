import { Router } from "express";
import { loginController, registerController } from "./auth.controller";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";
import { roleMiddleware } from "../../../shared/middleware/role.middleware";
import { validate } from "../../../shared/middleware/validation.middleware";
import { loginSchema, registerSchema } from "../domain/auth.schema";
import { refreshTokenController } from "./refresh.controller";
import { meController } from "./me.controller";

const router = Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), loginController);
router.get("/me", authMiddleware, meController);
router.post("/refresh", refreshTokenController);

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