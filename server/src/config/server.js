import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db.js";
import UserRouter from "../api/routes/user.js";
import handleErrorMiddleware from "../api/middlewares/error.js";

dotenv.config();
const server = express();

// handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

// middlewares
server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//  db config
connectDB();

// routes
server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce API Service 💐");
});

server.use("/v1/users", UserRouter);

server.use(handleErrorMiddleware);

export default server;
