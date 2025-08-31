import { Schema, model, Document } from "mongoose";

interface IPOSCategory extends Document {
  categoryName: string;
  categoryImage: string;
}

const POSCategorySchema = new Schema<IPOSCategory>({
 categoryName: { type: String, required: true },
 categoryImage: { type: String, required: true },
});

export const POSCategory = model<IPOSCategory>("POSCategory", POSCategorySchema);
