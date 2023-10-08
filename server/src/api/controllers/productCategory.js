import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { ProductCategory } from "../modals/productCategory.js";

class HandleProductCategory {
  static AddCategoryItem = catchAsyncError(async (req, res, next) => {
    const categoryToAdd = req.body.category;
    console.log(categoryToAdd);
    const id = "6522e9d93f7bc296436979f8";
    const categoryList = await ProductCategory.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $push: { categories: categoryToAdd },
      }
    );

    res.json({
      success: true,
      message: "successfully created.",
    });
  });

  static AllCategoryItem = catchAsyncError(async (req, res, next) => {
    const categorylist = await ProductCategory.find({});
    res.json({ success: true, categorylist });
  });

  static UpdateCategoryItem = catchAsyncError(async (req, res, next) => {
    const doc = await ProductCategory.updateOne(
      { categories: req.body.updateItem }, // Find documents where myArray contains "banana"
      { $set: { "categories.$": req.body.Item } } // Update the matching element to "grape"
    );
    res.json({
      success: true,
      message: "product updated successfully",
    });
  });

  static DeleteCategoryItem = catchAsyncError(async (req, res, next) => {
    const doc = await ProductCategory.updateOne(
      {},
      { $pull: { categories: req.body.category } }
    );
    res.json({
      success: true,
      message: "product deleted successfully",
    });
  });
}

export default HandleProductCategory;
