import express from "express";
import {
  addNewAddress,
  editAddress,
  getAddress,
  removeAddress,
} from "../controllers/addressController.js";
import authMiddleWare from "../middleware/auth.js";

const addressRoute = express.Router();

addressRoute.post("/add", authMiddleWare, addNewAddress);
addressRoute.post("/getalladdress", authMiddleWare, getAddress);
addressRoute.post("/editaddress", authMiddleWare, editAddress);
addressRoute.post("/removeaddress", removeAddress);

export default addressRoute;
