import commentModel from "../models/commentModel.js";
import productModel from "../models/productModel.js";

// Thêm bình luận cho sản phẩm
const addComment = async (req, res) => {
  try {
    const { userId, comment } = req.body;
    const { productId } = req.params;

    const newComment = new commentModel({
      productId,
      userId,
      comment,
    });

    const savedComment = await newComment.save();

    // Cập nhật sản phẩm với bình luận mới
    await productModel.findByIdAndUpdate(productId, {
      $push: { comments: savedComment._id },
    });
    res.status(201).json({ success: true, comment: savedComment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
};

// Lấy danh sách bình luận cho sản phẩm
const getComments = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Tính toán skip và limit
  const skip = (page - 1) * limit;

  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId).populate("comments");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Sản phẩm không tồn tại" });
    }

    const paginatedComments = await commentModel
      .find({ _id: { $in: product.comments } }) // Lấy tất cả comment dựa trên ID trong product
      .skip(skip)
      .limit(limit);

    // Tổng số comments để tính tổng số trang
    const totalComments = product.comments.length;
    const totalPages = Math.ceil(totalComments / limit);

    res.json({
      success: true,
      comments: paginatedComments,
      totalComments,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
};

export { addComment, getComments };
