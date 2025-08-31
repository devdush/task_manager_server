import { Router } from "express";
import { ProductsController } from "../../controllers/Needlu/products.controller";

export const productsRoutes = Router();

productsRoutes.post("/", ProductsController.createProduct);
productsRoutes.get("/", ProductsController.getAllProducts);
productsRoutes.get("/category/:categoryId", ProductsController.getProductsByCategory);
productsRoutes.post("/add-image", ProductsController.addImageToAll);
