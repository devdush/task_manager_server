import { Request, Response } from "express";
import { CashierService } from "../../services/Needlu/cashiers.service";
export class CashierController {
  static async createCashier(req: Request, res: Response) {
    const { name, username, password, role } = req.body;
    const result = await CashierService.createCashier(name, username, password, role);
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result);
    }
  }
  static async getAllCashiers(req: Request, res: Response) {
    const result = await CashierService.getAllCashiers();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json(result);
    }
  }
}
