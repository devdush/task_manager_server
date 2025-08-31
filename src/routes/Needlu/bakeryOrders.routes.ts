import { Router } from "express";
import { BakeryOrdersController } from "../../controllers/Needlu/bakeryOrders.controller";
export const bakeryOrders = Router();

bakeryOrders.post("/", BakeryOrdersController.createOrder);
bakeryOrders.get("/", BakeryOrdersController.getAllOrders);
