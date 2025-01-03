import express from "express";
import {
  addProduct,
  editProduct,
  listProducts,
  removeProduct,
} from "../controllers/productController.js";
import multer from "multer";

const productRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).array("image[]", 4);

productRouter.post("/add", upload, addProduct);
productRouter.get("/list", listProducts);
productRouter.post("/remove", removeProduct);
productRouter.put("/edit", upload, editProduct);

export default productRouter;
