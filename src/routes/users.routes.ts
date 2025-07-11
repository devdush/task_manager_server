import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

export const usersRoutes = Router();

usersRoutes.post("/register", UsersController.registerUser);
usersRoutes.post("/login", UsersController.loginUser);