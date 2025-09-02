import { Schema, model, Document, Types } from "mongoose";

interface IBakeryItem extends Document {
  itemName: string;
  price: number;
  availableQuantity: number;
  categoryId: Types.ObjectId;
  productImage: string;
  itemTypeId: Types.ObjectId;
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
    itemTypeId: {
      type: Schema.Types.ObjectId,
      ref: "ItemType",
      required: true,
    },
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

BakeryItemSchema.virtual("itemTypeInfo", {
  ref: "ItemType",
  localField: "itemTypeId",
  foreignField: "_id",
  justOne: true,
});

export const BakeryItem = model<IBakeryItem>("BakeryItem", BakeryItemSchema);
