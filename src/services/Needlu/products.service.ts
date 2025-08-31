import { BakeryItem } from "../../models/Needlu/BakeryItems.model";
import { Product } from "../../models/Needlu/Products.model";

export class BakeryItemService {
  static async createBakeryItem(
    itemName: string,
    price: number,
    categoryId: string,
    availableQuantity: number,
    productImage: string
  ) {
    try {
      console.log(itemName, price, categoryId, availableQuantity, productImage);
      const newProduct = await BakeryItem.create({
        itemName,
        price,
        categoryId,
        availableQuantity,
        productImage
      });
      console.log("New product created:", newProduct);
      if (!newProduct) {
        return { success: false, message: "Failed to create product" };
      }
      return { success: true, data: newProduct };
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Error creating product");
    }
  }
  static async getAllProducts() {
    try {
      const products = await BakeryItem.find().populate("categoryInfo");
      return { success: true, data: products };
    } catch (error) {
      throw new Error("Error fetching products");
    }
  }
  static async getProductsByCategory(categoryId: string) {
    try {
      const products = await BakeryItem.find({ categoryId }).populate(
        "categoryInfo"
      );
      return { success: true, data: products };
    } catch (error) {
      throw new Error("Error fetching products by category");
    }
  }
  static async addProductImageToAll(defaultImageUrl: string) {
    try {
      const result = await BakeryItem.updateMany(
        { productImage: { $exists: false } }, // only update docs without image
        { $set: { productImage: defaultImageUrl } }
      );

      return {
        success: true,
        message: "Product images added successfully",
        data: result,
      };
    } catch (error) {
      console.error("Error updating product images:", error);
      throw new Error("Error updating product images");
    }
  }
}
