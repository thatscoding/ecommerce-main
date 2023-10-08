import express from "express";
import { userAuthentication } from "../middlewares/userAuthentication.js";
import HandleProductCategory from "../controllers/productCategory.js";

const router = express.Router();

// public route
router.route("/").get(HandleProductCategory.AllCategoryItem);

// protected route
router
  .route("/")
  .post(userAuthentication, HandleProductCategory.AddCategoryItem);
router
  .route("/")
  .put(userAuthentication, HandleProductCategory.UpdateCategoryItem);
router
  .route("/")
  .delete(userAuthentication, HandleProductCategory.DeleteCategoryItem);

export default router;
