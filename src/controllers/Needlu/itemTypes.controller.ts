import { Request, Response } from "express";
import { ItemTypeService } from "../../services/Needlu/itemTypes.service";

export class ItemTypeController {
  static async createItemType(req: Request, res: Response) {
    try {
      const { itemTypeName } = req.body;
      if (!itemTypeName) {
        res
          .status(400)
          .json({ success: false, message: "itemTypeName is required" });
      }

      const result = await ItemTypeService.createItemType(itemTypeName);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error creating item type:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async getAllItemTypes(_req: Request, res: Response) {
    try {
      const result = await ItemTypeService.getAllItemTypes();
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error("Error fetching item types:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async getItemTypeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ItemTypeService.getItemTypeById(id);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error fetching item type:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
