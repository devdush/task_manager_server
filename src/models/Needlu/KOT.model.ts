import { Schema, model, Document, Types } from "mongoose";

interface IKOT extends Document {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  tableId: Types.ObjectId;
  stuartOrderId: Types.ObjectId;
  status: string;
  totalAmount: number;
}

const KOTSchema = new Schema<IKOT>({
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
  tableId: {
    type: Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },
  stuartOrderId: {
    type: Schema.Types.ObjectId,
    ref: "StuartOrder",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    default: "pending",
  },
  totalAmount: { type: Number, required: true },
});
KOTSchema.virtual("productsInfo", {
  ref: "BakeryItem",
  localField: "items.productId",
  foreignField: "_id",
  justOne: false,
});
KOTSchema.virtual("tableInfo", {
  ref: "Table",
  localField: "tableId",
  foreignField: "_id",
  justOne: true,
});
KOTSchema.virtual("stuartOrderInfo", {
  ref: "StuartOrder",
  localField: "stuartOrderId",
  foreignField: "_id",
  justOne: true,
});

export const KOT = model<IKOT>("KOT", KOTSchema);
