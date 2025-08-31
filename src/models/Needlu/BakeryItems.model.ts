import { Schema, model, Document, Types } from "mongoose";

interface IBakeryItem extends Document {
  itemName: string;
  price: number;
  availableQuantity: number;
  categoryId: Types.ObjectId;
  productImage: string;
}

const BakeryItemSchema = new Schema<IBakeryItem>(
  {
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    availableQuantity: { type: Number, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "POSCategory",
      required: true,
    },
    productImage: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
BakeryItemSchema.virtual("categoryInfo", {
  ref: "POSCategory",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

export const BakeryItem = model<IBakeryItem>("BakeryItem", BakeryItemSchema);
