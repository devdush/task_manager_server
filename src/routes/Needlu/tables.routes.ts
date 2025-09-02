import { Router } from "express";

import { TableController } from "../../controllers/Needlu/tables.controller";

export const tablesRoutes = Router();

tablesRoutes.post("/", TableController.createTable);
tablesRoutes.get("/", TableController.getAllTables);
tablesRoutes.get("/:id", TableController.getTableById);
tablesRoutes.put("/:id", TableController.updateTableStatus);
tablesRoutes.delete("/:id", TableController.deleteTable);