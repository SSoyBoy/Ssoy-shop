import commentModel from "../models/commentModel.js";
import productModel from "../models/productModel.js";
import fs from "fs";

// add product item

const addProduct = async (req, res) => {
  const image_filenames = req.files.map((file) => file.filename);
  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filenames,
    category: req.body.category,
    subCategory: req.body.subCategory,
    sizes: req.body.sizes,
    bestseller: req.body.bestseller,
    outOfStock: req.body.outOfStock,
  });
  try {
    await product.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: "Error" });
  }
};

// all products list
const listProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;

  // Tính toán skip và limit
  const skip = (page - 1) * limit;

  try {
    let products;
    let totalProducts;

    if (limit === 0) {
      // Không giới hạn phân trang, lấy tất cả sản phẩm
      products = await productModel.find({});
      totalProducts = products.length;
    } else {
      // Tính toán skip và limit
      const skip = (page - 1) * limit;
      products = await productModel.find().skip(skip).limit(limit);
      totalProducts = await productModel.countDocuments();
    }

    const totalPages = limit === 0 ? 1 : Math.ceil(totalProducts / limit);

    res.json({
      success: true,
      data: { products, totalPages, currentPage: page },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove product item
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    product.image.forEach((img) => {
      fs.unlink(`uploads/${img}`, (err) => {
        if (err) {
          console.log("Error deleting image:", err);
        }
      });
    });
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// edit product item
const editProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      outOfStock,
    } = req.body;

    const product = await productModel.findById(id);
    if (req.files && req.files.length > 0) {
      const image_filenames = req.files.map((file) => file.filename);
      const images = req.body.image
        ? [
            ...product.image.filter((item) => req.body.image.includes(item)),
            ...image_filenames,
          ]
        : image_filenames;

      // for (let i = 0; i < product.image.length; i++) {
      //   if (req.body.image[i] !== product.image[i]) {
      //     for (let j in image_filenames) {
      //       req.body.image.splice(i, j, image_filenames[j]);
      //     }
      //   }
      // }

      product.image.forEach((img) => {
        if (!images.includes(img)) {
          fs.unlink(`uploads/${img}`, (err) => {
            if (err) {
              console.log("Error deleting old image:", err);
            }
          });
        }
      });

      await productModel.findByIdAndUpdate(id, {
        name,
        description,
        price,
        image: images,
        category,
        subCategory,
        sizes,
        date: Date.now(),
        bestseller,
        outOfStock,
      });
      res.json({ success: true, message: "Product Updated" });
    } else {
      await productModel.findByIdAndUpdate(id, {
        name,
        description,
        price,
        category,
        subCategory,
        sizes,
        date: Date.now(),
        bestseller,
        outOfStock,
      });
      res.json({
        success: true,
        message: "Product Updated",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addProduct, listProducts, removeProduct, editProduct };
