import { Request, Response } from "express";
import { UsersService } from "../services/users.service";

export class UsersController {
  static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        profilePicture,
        password,
        role = "user",
      } = req.body;

      const result = await UsersService.registerUser(
        firstName,
        lastName,
        email,
        phoneNumber,
        profilePicture,
        password,
        role
      );
      res.status(201).json(result);
    } catch (error) {
      console.error("Error registering user:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await UsersService.loginUser(email, password);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
