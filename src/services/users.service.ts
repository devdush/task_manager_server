import { IUser, TaskUsers } from "../models/Users.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/verification-email-service";
import jwt from "jsonwebtoken";
export class UsersService {
  static async registerUser(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    profilePicture: string,
    password: string,
    role: string
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const user = new TaskUsers({
        firstName,
        lastName,
        email,
        phoneNumber,
        profilePicture,
        password: hashedPassword,
        role,
      });

      await user.save();
      await sendVerificationEmail(email, verificationToken);

      console.log("User registered:", user);
      return { success: true, message: "User registered successfully" };
    } catch (error) {
      console.error("Error registering user:", error);
      return { success: false, message: "Error registering user" };
    }
  }
  static async loginUser(email: string, password: string) {
    try {
      const user = await TaskUsers.findOne({ email });
      if (!user) {
        return { success: false, message: "User not found" };
      }
      if (!user.verified) {
        return { success: false, message: "Email not verified" };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { success: false, message: "Invalid credentials" };
      }
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
          email: user.email,
          firstName: user.firstName,
        },
        "CLIENT_SECRET_KEY",
        { expiresIn: "500m" }
      );
      console.log("User logged in:", user);
      return {
        success: true,
        message: "User logged in successfully",
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          profilePicture: user.profilePicture,
          token: token,
        },
      };
    } catch (error) {
      console.error("Error logging in user:", error);
      return { success: false, message: "Error logging in user" };
    }
  }
  static async getUsers() {
    try {
      const users = await TaskUsers.find({ role: "user" })
      console.log("Fetched users:", users);
      return { success: true, data: users };
    } catch (error) {
      console.error("Error fetching users:", error);
      return { success: false, message: "Error fetching users" };
    }
  }
}
