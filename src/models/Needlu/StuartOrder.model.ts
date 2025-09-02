import { Schema, model, Document, Types } from "mongoose";

export interface IStuartOrderItem {
  itemId: Types.ObjectId;
  quantity: number;
}

export interface IStuartOrder extends Document {
  stuartId: Types.ObjectId;
  tableId: Types.ObjectId;
  items: Array<{
    productId: Types.ObjectId;
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
}

const StuartOrderItemSchema = new Schema<IStuartOrderItem>({
  itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const StuartOrderSchema = new Schema<IStuartOrder>(
  {
    stuartId: { type: Schema.Types.ObjectId, ref: "Cashier", required: true },
    tableId: { type: Schema.Types.ObjectId, ref: "Table", required: true },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "BakeryItem",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    status: { type: String, required: true, enum: ["pending", "completed", "billed"] },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } } // ✅ Add this
);

StuartOrderSchema.virtual("productsInfo", {
  ref: "BakeryItem",
  localField: "items.productId",
  foreignField: "_id",
  justOne: false,
});
StuartOrderSchema.virtual("stuartInfo", {
  ref: "Cashier",
  localField: "stuartId",
  foreignField: "_id",
  justOne: true,
});
StuartOrderSchema.virtual("tableInfo", {
  ref: "Table",
  localField: "tableId",
  foreignField: "_id",
  justOne: true,
});
export const StuartOrder = model<IStuartOrder>(
  "StuartOrder",
  StuartOrderSchema
);
