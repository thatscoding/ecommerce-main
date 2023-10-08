import express from "express";
import { userAuthentication } from "../middlewares/userAuthentication.js";
import HandleProduct from "../controllers/product.js";
import HandleUser from "../controllers/user.js";

const router = express.Router();

// public route
router.route("/all").get(HandleProduct.AllProducts);
router.route("/:id").get(HandleProduct.GetProductById);
router.route("/:category").get(HandleProduct.GetProductByCategory);

// protected route
router.route("/").post(userAuthentication, HandleProduct.AddProduct);
router.route("/").put(userAuthentication, HandleProduct.UpdateProduct);
router.route("/").delete(userAuthentication, HandleProduct.DeleteProduct);

export default router;
