import { Router } from "express";
import { StuartOrderController } from "../../controllers/Needlu/stuartOrders.controller";

export const stuartOrdersRoutes = Router();

stuartOrdersRoutes.post("/", StuartOrderController.createStuartOrder);
stuartOrdersRoutes.get("/", StuartOrderController.getAllStuartOrders);
stuartOrdersRoutes.get("/:id", StuartOrderController.getStuartOrderById);
stuartOrdersRoutes.get("/table/:tableId", StuartOrderController.getStuartOrderByTableId);
stuartOrdersRoutes.get("/pending-kots/:itemTypeId", StuartOrderController.getPendingKOTsByItemType);