import { Schema, model, Document, Types } from "mongoose";
interface ICashier extends Document {
  name: string;
  username: string;
  password: string;
  role: "cashier" | "admin" | "stuart";
}

const CashierSchema = new Schema<ICashier>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["cashier", "admin", "stuart"] },
  },
  {
    timestamps: true,
  }
);

export const Cashier = model<ICashier>("Cashier", CashierSchema);
