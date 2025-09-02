import { Router } from "express";
import { KOTController } from "../../controllers/Needlu/kot.controller";

export const kotRoutes = Router();

kotRoutes.post("/", KOTController.createKOT);
kotRoutes.get("/", KOTController.getAllKOTs);
kotRoutes.get("/:id", KOTController.getKOTById);
kotRoutes.put("/:id", KOTController.updateKOT);
