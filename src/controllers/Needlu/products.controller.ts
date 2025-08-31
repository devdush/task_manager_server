import { BakeryItemService } from "../../services/Needlu/products.service";
import { Request, Response } from "express";
import expressFileUpload from "express-fileupload";
import { uploadToS3 } from "../../utils/upload";
export class ProductsController {
  static async createProduct(req: Request, res: Response) {
    try {
      const { itemName, price, categoryId, availableQuantity } = req.body;

      if (!req.files || !req.files.productImage) {
        res
          .status(400)
          .json({ success: false, message: "Product image is required" });
        return;
      }

      const file = req.files.productImage as expressFileUpload.UploadedFile;

      const s3Url = await uploadToS3(file.data, file.name, file.mimetype);

      const result = await BakeryItemService.createBakeryItem(
        itemName,
        price,
        categoryId,
        availableQuantity,
        s3Url
      );
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async getAllProducts(req: Request, res: Response) {
    try {
      const result = await BakeryItemService.getAllProducts();
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async getProductsByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const result = await BakeryItemService.getProductsByCategory(categoryId);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error fetching products by category:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
   static async addImageToAll(req: Request, res: Response) {
    try {
      const { defaultImageUrl } = req.body;
      console.log("Adding default image to all products:", defaultImageUrl);
      const result = await BakeryItemService.addProductImageToAll(defaultImageUrl);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}
