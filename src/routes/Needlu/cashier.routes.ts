import { Router } from "express";
import { CashierController } from "../../controllers/Needlu/cashiers.controller";
export const cashiersRoutes = Router();

cashiersRoutes.post("/", CashierController.createCashier);
cashiersRoutes.get("/", CashierController.getAllCashiers);
