import { IUser, TaskUsers } from "../models/Users.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/verification-email-service";
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

      console.log("User logged in:", user);
      return { success: true, message: "User logged in successfully" };
    } catch (error) {
      console.error("Error logging in user:", error);
      return { success: false, message: "Error logging in user" };
    }
  }
}
