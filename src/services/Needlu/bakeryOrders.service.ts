import { BakeryOrder } from "../../models/Needlu/BakeryOrders.model";

export class BakeryOrdersService {
  static async createOrder(
    cashierId: string,
    items: { productId: string; quantity: number }[],
    totalAmount: number,
    paymentMethod: string
  ) {
    try {
      const order = await BakeryOrder.create({
        cashierId: cashierId,
        items,
        totalAmount,
        paymentMethod,
      });

      return { success: true, data: order };
    } catch (error) {
      console.error("Error creating bakery order:", error);
      return { success: false, error: "Failed to create bakery order" };
    }
  }
  static async getAllOrders() {
    try {
      const orders = await BakeryOrder.find()
        .populate("cashierInfo")
        .populate("items.productId");
      return { success: true, data: orders };
    } catch (error) {
      console.error("Error fetching bakery orders:", error);
      return { success: false, error: "Failed to fetch bakery orders" };
    }
  }
}
