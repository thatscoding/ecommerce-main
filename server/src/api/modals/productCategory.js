import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema(
  {
    productCategory: [
      {
        type: String,
        required: [true, "Product name is required"],
      },
    ],
  },
  { timestamps: true }
);

export const ProductCategory = mongoose.model(
  "ProductCategory",
  ProductCategorySchema
);
