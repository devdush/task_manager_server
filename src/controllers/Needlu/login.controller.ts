import { Request, Response } from "express";
import { LoginService } from "../../services/Needlu/login.service";
export class LoginController {
  static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    console.log("Login attempt:", { username, password });
    try {
      const result = await LoginService.login(username, password);
  
      if (!result.success) {
        res.status(401).json({ message: result.message });
      }
      res.status(200).json({ data: result.data });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
