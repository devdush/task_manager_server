import { Request, Response } from "express";
import { TableService } from "../../services/Needlu/tables.service";


export class TableController {
  static async createTable(req: Request, res: Response) {
    try {
      const { status } = req.body;
      if (!status) {
         res.status(400).json({ success: false, message: "Status is required" });
      }

      const result = await TableService.createTable(status);
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error creating table:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async getAllTables(_req: Request, res: Response) {
    try {
      const result = await TableService.getAllTables();
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async getTableById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await TableService.getTableById(id);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error fetching table:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async updateTableStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, occupiedAt } = req.body;

      if (!status) {
         res.status(400).json({ success: false, message: "Status is required" });
      }

      const result = await TableService.updateTableStatus(id, status, occupiedAt);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error updating table:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async deleteTable(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await TableService.deleteTable(id);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error deleting table:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}
