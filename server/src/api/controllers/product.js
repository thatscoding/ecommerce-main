import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Products } from "../modals/product.js";

class HandleProduct {
  static AddProduct = catchAsyncError(async (req, res, next) => {
    const product = await Products.create(req.body);
    await product.save();
    res.json({ success: true, message: "successfully Added." });
  });

  static GetProductbyId = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    if (id) {
      const product = await Products.findOne({ _id: id });
      res.json({ success: true, product });
    }
  });

  static GetProductByCategory = catchAsyncError(async (req, res, next) => {
    const { category } = req.body;
    console.log(category);
    const products = await Products.find({ category: category });
    res.json({ success: true, products });
  });

  static AllProducts = catchAsyncError(async (req, res, next) => {
    const products = await Products.find({});
    res.json({ success: true, products });
  });

  static UpdateProduct = catchAsyncError(async (req, res, next) => {
    console.log(req.params.id);
    console.log(req.body);
    const product = await Products.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json({
      success: true,
      message: "product updated successfully",
      product,
    });
  });

  static DeleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Products.deleteOne({ _id: req.params.id });
    res.json({
      success: true,
      message: "product deleted successfully",
      product,
    });
  });
}

export default HandleProduct;
