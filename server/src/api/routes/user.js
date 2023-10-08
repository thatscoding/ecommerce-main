import express from "express";
import HandleUser from "../controllers/user.js";
import { userAuthentication } from "../middlewares/userAuthentication.js";

const router = express.Router();

// public route
router.route("/").get(HandleUser.AllUsers);
router.route("/register").post(HandleUser.RegisterUser);
router.route("/login").post(HandleUser.LoginUser);

// protected route
router.route("/profile").get(userAuthentication, HandleUser.UserProfile);
router.route("/logout").get(userAuthentication, HandleUser.UserLogout);

export default router;
