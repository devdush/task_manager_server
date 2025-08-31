import { Cashier } from "../../models/Needlu/Cashiers.model";

export class CashierService {
  static async createCashier(name: string, username: string, password: string) {
    try {
      const newCashier = await Cashier.create({
        name,
        username,
        password,
        role: "cashier",
      });
      return { success: true, data: newCashier };
    } catch (error) {
      console.error("Error creating cashier:", error);
      throw new Error("Error creating cashier");
    }
  }

  static async getAllCashiers() {
    try {
      const cashiers = await Cashier.find();
      return { success: true, data: cashiers };
    } catch (error) {
      console.error("Error fetching cashiers:", error);
      throw new Error("Error fetching cashiers");
    }
  }
}
