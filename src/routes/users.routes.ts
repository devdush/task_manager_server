import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

export const usersRoutes = Router();

usersRoutes.post("/register", UsersController.registerUser);
usersRoutes.post("/login", UsersController.loginUser);
usersRoutes.get("/check_auth", UsersController.authMiddleware, (req, res) => {
  const user = (req as any).user;

  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});
usersRoutes.get("/", UsersController.getUsers)