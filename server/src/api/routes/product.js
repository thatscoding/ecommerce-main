import express from "express";
import { userAuthentication } from "../middlewares/userAuthentication.js";
import HandleProduct from "../controllers/product.js";
import HandleUser from "../controllers/user.js";

const router = express.Router();

// public route
router.route("/byCategory/:category").get(HandleProduct.GetProductByCategory);

router.route("/").get(HandleProduct.AllProducts);
router.route("/:id").get(HandleProduct.GetProductbyId);

// protected route
router.route("/").post(userAuthentication, HandleProduct.AddProduct);
router.route("/:id").put(userAuthentication, HandleProduct.UpdateProduct);
router.route("/:id").delete(userAuthentication, HandleProduct.DeleteProduct);

export default router;
