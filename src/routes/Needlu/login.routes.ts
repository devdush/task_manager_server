import { Router } from "express";
import { LoginController } from "../../controllers/Needlu/login.controller";

export const loginRoutes = Router();

loginRoutes.post("/login", LoginController.login);
