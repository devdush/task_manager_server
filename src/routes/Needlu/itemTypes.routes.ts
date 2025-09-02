import { Router } from "express";
import { ItemTypeController } from "../../controllers/Needlu/itemTypes.controller";

export const itemTypesRouter = Router();

itemTypesRouter.post("/", ItemTypeController.createItemType);
itemTypesRouter.get("/", ItemTypeController.getAllItemTypes);
itemTypesRouter.get("/:id", ItemTypeController.getItemTypeById);


