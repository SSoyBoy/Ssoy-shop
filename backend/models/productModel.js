import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  date: { type: Date, default: Date.now() },
  bestseller: { type: Boolean, default: false },
  outOfStock: { type: Boolean, default: false },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
