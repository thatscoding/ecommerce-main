import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: [true, "Product name is required"] },
    price: {
      type: String,
      required: [true, "product price is required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    stocks: {
      type: Number,
      required: [true, "Product stocks is required"],
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Products = mongoose.model("Products", ProductSchema);
