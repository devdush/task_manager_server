import { Schema, model, Document, Types } from "mongoose";

interface IBakeryOrder extends Document {
  cashierId: Types.ObjectId;
  items: Array<{
    productId: Types.ObjectId;
    quantity: number;
  }>;
  totalAmount: number;
  paymentMethod: string;
  orderDate: Date;
}

const BakeryOrderSchema = new Schema<IBakeryOrder>(
  {
    cashierId: { type: Schema.Types.ObjectId, ref: "Cashier", required: true },
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
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual to get product details for all items
BakeryOrderSchema.virtual("productsInfo", {
  ref: "BakeryItem",
  localField: "items.productId",
  foreignField: "_id",
  justOne: false,
});

// Virtual to get cashier details
BakeryOrderSchema.virtual("cashierInfo", {
  ref: "Cashier",
  localField: "cashierId",
  foreignField: "_id",
  justOne: true,
});

// Optional: indexes for faster queries
BakeryOrderSchema.index({ cashierId: 1 });
BakeryOrderSchema.index({ orderDate: -1 });

export const BakeryOrder = model<IBakeryOrder>(
  "BakeryOrder",
  BakeryOrderSchema
);
