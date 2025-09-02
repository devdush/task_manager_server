import { KOT } from "../../models/Needlu/KOT.model";


export class KOTService {
  static async createKOT(
    items: { productId: string; quantity: number }[],
    tableId: string,
    stuartOrderId: string,
    totalAmount: number
  ) {
    try {
      const newKOT = await KOT.create({ items, tableId, stuartOrderId, totalAmount });
      if (!newKOT) {
        return { success: false, message: "Failed to create KOT" };
      }
      return { success: true, data: newKOT };
    } catch (error) {
      console.error("Error creating KOT:", error);
      return { success: false, message: "Internal server error" };
    }
  }

  static async getAllKOTs() {
    try {
      const kots = await KOT.find()
        .populate("tableId")
        .populate("stuartOrderId")
        .populate("items.productId")
        .sort({ createdAt: -1 });
      return { success: true, data: kots };
    } catch (error) {
      console.error("Error fetching KOTs:", error);
      return { success: false, message: "Internal server error" };
    }
  }

  static async getKOTById(id: string) {
    try {
      const kot = await KOT.findById(id)
        .populate("tableId")
        .populate("stuartOrderId")
        .populate("items.productId");
      if (!kot) {
        return { success: false, message: "KOT not found" };
      }
      return { success: true, data: kot };
    } catch (error) {
      console.error("Error fetching KOT:", error);
      return { success: false, message: "Internal server error" };
    }
  }

  static async updateKOT(
    id: string,
    updateData: {
      items?: { productId: string; quantity: number }[];
      status?: "pending" | "in_progress" | "completed";
      totalAmount?: number;
    }
  ) {
    try {
      const updatedKOT = await KOT.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedKOT) {
        return { success: false, message: "KOT not found or failed to update" };
      }
      return { success: true, data: updatedKOT };
    } catch (error) {
      console.error("Error updating KOT:", error);
      return { success: false, message: "Internal server error" };
    }
  }
}
