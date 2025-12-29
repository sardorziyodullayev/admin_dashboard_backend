import { Router } from "express";
import { loginController, registerController } from "./auth.controller";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/me", authMiddleware, (req: any, res) => {
   res.json({
      message: "Protected route",
      user: req.user,
   });
});

export default router;