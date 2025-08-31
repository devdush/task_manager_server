import mongoose from "mongoose";
import { POSCategory } from "../../models/Needlu/Categories.model";

export class CategoriesService {
  static async createCategory(categoryName: string, categoryImage: string) {
    try {
      const newCategory = await POSCategory.create({ categoryName, categoryImage });
      if (!newCategory) {
        return { success: false, message: "Failed to create category" };
      }
      return { success: true, data: newCategory };
    } catch (error) {
      console.error("Error creating category:", error);
      return { success: false, message: "Internal server error" };
    }
  }
  static async getAllCategories() {
    try {
      const categories = await POSCategory.find();
      return { success: true, data: categories };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { success: false, message: "Internal server error" };
    }
  }
}
