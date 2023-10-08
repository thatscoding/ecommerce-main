import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema(
  {
    categories: [String],
  },
  { timestamps: true }
);

export const ProductCategory = mongoose.model(
  "ProductCategory",
  ProductCategorySchema
);
