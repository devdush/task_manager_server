import { Router } from "express";
import { CategoriesController } from "../../controllers/Needlu/categories.controller";

export const categoriesRoutes = Router();

categoriesRoutes.post("/", CategoriesController.createCategory);
categoriesRoutes.get("/", CategoriesController.getAllCategories);
