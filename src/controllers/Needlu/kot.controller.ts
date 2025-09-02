import { Request, Response } from "express";
import { KOTService } from "../../services/Needlu/kot.service";

export class KOTController {
  static async createKOT(req: Request, res: Response) {
    try {
      const { items, tableId, stuartOrderId, totalAmount } = req.body;

      if (!items || !tableId || !stuartOrderId || !totalAmount) {
         res.status(400).json({ success: false, message: "All fields are required" });
      }

      const result = await KOTService.createKOT(items, tableId, stuartOrderId, totalAmount);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error creating KOT:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async getAllKOTs(_req: Request, res: Response) {
    try {
      const result = await KOTService.getAllKOTs();
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error("Error fetching KOTs:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async getKOTById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await KOTService.getKOTById(id);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error fetching KOT:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async updateKOT(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { items, status, totalAmount } = req.body;

      const result = await KOTService.updateKOT(id, { items, status, totalAmount });

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error updating KOT:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}
