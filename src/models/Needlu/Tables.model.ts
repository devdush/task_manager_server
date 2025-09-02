import { Schema, model, Document } from "mongoose";

interface ITable extends Document {
  status: string;
  occupiedAt: Date;
}

const TableSchema = new Schema<ITable>({
  status: { type: String, required: true },
  occupiedAt: { type: Date },
});

export const Table = model<ITable>("Table", TableSchema);
