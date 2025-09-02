import { Request, Response } from "express";
import { StuartOrderService } from "../../services/Needlu/stuartOrders.service";

export class StuartOrderController {
  static async createStuartOrder(req: Request, res: Response) {
    try {
      const { stuartId, tableId, items, totalAmount, status } = req.body;

      if (!stuartId || !tableId || !items || !totalAmount || !status) {
        res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      const result = await StuartOrderService.createStuartOrder(
        stuartId,
        tableId,
        items,
        totalAmount,
        status
      );

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error creating Stuart order:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async getAllStuartOrders(_req: Request, res: Response) {
    try {
      const result = await StuartOrderService.getAllStuartOrders();
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error("Error fetching Stuart orders:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async getStuartOrderById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await StuartOrderService.getStuartOrderById(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error fetching Stuart order:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async getStuartOrderByTableId(req: Request, res: Response) {
    try {
      const { tableId } = req.params;
      const result = await StuartOrderService.getStuartOrderByTableId(tableId);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error fetching Stuart orders by table ID:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async getPendingKOTsByItemType(req: Request, res: Response) {
    try {
      const { itemTypeId } = req.params;
      const result = await StuartOrderService.getPendingKOTsByItemType(itemTypeId);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error fetching pending KOTs by item type:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
