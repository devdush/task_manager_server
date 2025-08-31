import { Cashier } from "../../models/Needlu/Cashiers.model";

export class LoginService {
  static async login(username: string, password: string) {
    try {
      const cashier = await Cashier.findOne({ username, password }).select("-password");
      if (!cashier) {
        return { success: false, message: "Invalid credentials" };
      }
      return { success: true, data: cashier };
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Error during login");
    }
  }
}
