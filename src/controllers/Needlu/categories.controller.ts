import { Request, Response } from "express";
import { CategoriesService } from "../../services/Needlu/categories.service";
import expressFileUpload from "express-fileupload";
import { uploadToS3 } from "../../utils/upload";
export class CategoriesController {
  static async createCategory(req: Request, res: Response) {
    try {
      const { categoryName } = req.body;
      if (!req.files || !req.files.categoryImage) {
        res
          .status(400)
          .json({ success: false, message: "Category image is required" });
        return;
      }

      const file = req.files.categoryImage as expressFileUpload.UploadedFile;

      const s3Url = await uploadToS3(file.data, file.name, file.mimetype);

      const result = await CategoriesService.createCategory(
        categoryName,
        s3Url
      );
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error creating category:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async getAllCategories(req: Request, res: Response) {
    try {
      const result = await CategoriesService.getAllCategories();
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
