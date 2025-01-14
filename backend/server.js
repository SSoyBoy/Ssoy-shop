import express from "express";
import core from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import commentRoute from "./routes/commentRoute.js";
import addressRoute from "./routes/addressRoute.js";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(core());

// db connection
connectDB();

// api endpoints
app.use("/api/product", productRouter);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRouter);
app.use("/api/comment", commentRoute);
app.use("/api/address", addressRoute);

app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
