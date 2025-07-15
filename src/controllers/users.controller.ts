import { Request, Response, NextFunction } from "express";
import { UsersService } from "../services/users.service";
import { uploadToS3 } from "../utils/upload";
import expressFileUpload from "express-fileupload";
import jwt from "jsonwebtoken";

export class UsersController {
  static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        role = "user",
      } = req.body;

      if (!req.files || !req.files.profilePicture) {
        res
          .status(400)
          .json({ success: false, message: "Profile picture is required" });
        return;
      }

      const file = req.files.profilePicture as expressFileUpload.UploadedFile;

      const s3Url = await uploadToS3(file.data, file.name, file.mimetype);

      const result = await UsersService.registerUser(
        firstName,
        lastName,
        email,
        phoneNumber,
        s3Url,
        password,
        role
      );

      console.log("User registration result:", result);
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

  static authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized user!",
      });
      return;
    }

    try {
      const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
      (req as any).user = decoded;
      next();
    } catch (error) {
      res.status(403).json({
        success: false,
        message: "Unauthorized user!",
      });
    }
  }
  static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const result = await UsersService.getUsers();
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
