import { BakeryOrdersService } from "../../services/Needlu/bakeryOrders.service";
import { Request, Response } from "express";
export class BakeryOrdersController {
  static async createOrder(req: Request, res: Response) {
    const { cashierId, items, totalAmount, paymentMethod } = req.body;
    console.log("Creating bakery order:", { cashierId, items, totalAmount, paymentMethod });
    const result = await BakeryOrdersService.createOrder(
      cashierId,
      items,
      totalAmount,
      paymentMethod
    );
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result);
    }
  }
  static async getAllOrders(req: Request, res: Response) {
    const result = await BakeryOrdersService.getAllOrders();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json(result);
    }
  }
}
