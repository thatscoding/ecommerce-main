import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { ProductCategory } from "../modals/productCategory.js";

class HandleProductCategory {
  static AddCategoryItem = catchAsyncError(async (req, res, next) => {
    const doc = await ProductCategory.update(
      {},
      { $push: { productCategory: req.body.category } }
    );
    await doc.save();
    res.json({ success: true, message: "successfully Added.", doc });
  });

  static AllCategoryItem = catchAsyncError(async (req, res, next) => {
    const categorylist = await ProductCategory.find({});
    res.json({ success: true, categorylist });
  });

  static UpdateCategoryItem = catchAsyncError(async (req, res, next) => {
    const doc = await ProductCategory.update(
      { productCategory: req.body.updateItem }, // Find documents where myArray contains "banana"
      { $set: { "productCategory.$": req.body.Item } } // Update the matching element to "grape"
    );
    res.json({
      success: true,
      message: "product updated successfully",
      doc,
    });
  });

  static DeleteCategoryItem = catchAsyncError(async (req, res, next) => {
    const doc = await ProductCategory.update(
      {},
      { $pull: { productCategory: req.body.item } }
    );
    res.json({
      success: true,
      message: "product deleted successfully",
      doc,
    });
  });
}

export default HandleProductCategory;
