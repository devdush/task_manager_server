import { ItemType } from "../../models/Needlu/itemTypes.model";

export class ItemTypeService {
  static async createItemType(itemTypeName: string) {
    try {
      const newItemType = await ItemType.create({ itemTypeName });
      if (!newItemType) {
        return { success: false, message: "Failed to create item type" };
      }
      return { success: true, data: newItemType };
    } catch (error) {
      console.error("Error creating item type:", error);
      return { success: false, message: "Internal server error" };
    }
  }

  static async getAllItemTypes() {
    try {
      const itemTypes = await ItemType.find().sort({ createdAt: -1 });
      return { success: true, data: itemTypes };
    } catch (error) {
      console.error("Error fetching item types:", error);
      return { success: false, message: "Internal server error" };
    }
  }

  static async getItemTypeById(id: string) {
    try {
      const itemType = await ItemType.findById(id);
      if (!itemType) {
        return { success: false, message: "Item type not found" };
      }
      return { success: true, data: itemType };
    } catch (error) {
      console.error("Error fetching item type:", error);
      return { success: false, message: "Internal server error" };
    }
  }
}
