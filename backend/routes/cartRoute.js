import express from "express";
import {
  addToCart,
  getCart,
  updateFromCart,
} from "../controllers/cartController.js";
import authMiddleWare from "../middleware/auth.js";

const cartRoute = express.Router();

cartRoute.post("/add", authMiddleWare, addToCart);
cartRoute.post("/update", authMiddleWare, updateFromCart);
cartRoute.post("/get", authMiddleWare, getCart);

export default cartRoute;
