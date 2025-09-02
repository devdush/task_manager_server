import mongoose from "mongoose";
import { StuartOrder } from "../../models/Needlu/StuartOrder.model";

export class StuartOrderService {
  static async createStuartOrder(
    stuartId: string,
    tableId: string,
    items: { productId: string; quantity: number }[],
    totalAmount: number,
    status: string
  ) {
    try {
      const newOrder = await StuartOrder.create({
        stuartId,
        tableId,
        items,
        totalAmount,
        status,
      });
      if (!newOrder) {
        return { success: false, message: "Failed to create order" };
      }
      return { success: true, data: newOrder };
    } catch (error) {
      console.error("Error creating Stuart order:", error);
      return { success: false, message: "Internal server error" };
    }
  }

  static async getAllStuartOrders() {
    try {
      const orders = await StuartOrder.find()
        .populate("stuartInfo")
        .populate("tableInfo")
        .populate("productsInfo")
        .sort({ createdAt: -1 });
      return { success: true, data: orders };
    } catch (error) {
      console.error("Error fetching Stuart orders:", error);
      return { success: false, message: "Internal server error" };
    }
  }

  static async getStuartOrderById(id: string) {
    try {
      const order = await StuartOrder.findById(id)
        .populate("stuartInfo")
        .populate("tableInfo")
        .populate("productsInfo");
      if (!order) {
        return { success: false, message: "Order not found" };
      }
      return { success: true, data: order };
    } catch (error) {
      console.error("Error fetching Stuart order:", error);
      return { success: false, message: "Internal server error" };
    }
  }
  static async getStuartOrderByTableId(tableId: string) {
    try {
      const orders = await StuartOrder.findOne({ tableId })
        .populate("stuartInfo")
        .populate("tableInfo")
        .populate("productsInfo");

      return { success: true, data: orders };
    } catch (error) {
      console.error("Error fetching Stuart orders by table ID:", error);
      return { success: false, message: "Internal server error" };
    }
  }

  static async getPendingKOTsByItemType(itemTypeId: string) {
    try {
      // Validate itemTypeId
      if (!mongoose.Types.ObjectId.isValid(itemTypeId)) {
        throw new Error("Invalid itemTypeId");
      }

      // Step 1: Find all StuartOrders where status = "pending"
      const pendingKOTs = await StuartOrder.find({
        status: "pending",
      })
        .populate({
          path: "items.productId",
          model: "BakeryItem",
          select: "itemName price itemTypeId", // We only need necessary fields
        })
        .populate("tableInfo", "tableName") // Optional: Populate table info
        .populate("stuartInfo", "name") // Optional: Populate cashier info
        .lean();

      // Step 2: Filter KOTs based on BakeryItem.itemTypeId
      const filteredKOTs = pendingKOTs.filter((kot) =>
        kot.items.some(
          (item: any) =>
            item.productId &&
            item.productId.itemTypeId.toString() === itemTypeId
        )
      );

      return { success: true, data: filteredKOTs };
    } catch (error: any) {
      console.error("Error fetching pending KOTs:", error);
      throw new Error(error.message || "Something went wrong");
    }
  }
}
