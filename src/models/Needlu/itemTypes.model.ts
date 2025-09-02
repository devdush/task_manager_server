import { Schema, model, Document } from "mongoose";

interface IItemType extends Document {
  itemTypeName: string;
}

const ItemTypeSchema = new Schema<IItemType>({
  itemTypeName: { type: String, required: true },
});

export const ItemType = model<IItemType>("ItemType", ItemTypeSchema);
