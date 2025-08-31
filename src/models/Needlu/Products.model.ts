import { Schema, model, Document, Types } from "mongoose";

interface IProduct extends Document {
  productName: string;
  price: number;
  availableQuantity: number;
  categoryId: Types.ObjectId;
  productImage: string;
}

const ProductSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  availableQuantity: { type: Number, required: true },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "POSCategory",
    required: true,
  },
   productImage: { type: String, required: true }, 
});
ProductSchema.virtual("categoryInfo", {
  ref: "POSCategory",
  localField: "categoryId",
  foreignField: "_id",
  justOne: false,
});

export const Product = model<IProduct>("Product", ProductSchema);
