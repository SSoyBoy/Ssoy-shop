import addressModel from "../models/addressModel.js";

const addNewAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const {
      firstName,
      lastName,
      email,
      street,
      province,
      district,
      ward,
      zipcode,
      phone,
    } = req.body.address;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Error" });
    }

    const newAddress = new addressModel({
      userId,
      firstName,
      lastName,
      email,
      province,
      district,
      ward,
      street,
      zipcode,
      phoneNumber: phone,
    });

    const savedAddress = await newAddress.save();

    res.status(201).json({
      success: true,
      message: "Thêm địa chỉ thành công",
      address: savedAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.body;
    const {
      firstName,
      lastName,
      email,
      street,
      province,
      district,
      ward,
      zipcode,
      phone,
    } = req.body.address;

    if (!userId || !addressId) {
      return res.status(400).json({ success: false, message: "Error" });
    }

    const updatedAddress = await addressModel.findOneAndUpdate(
      { _id: addressId, userId },
      {
        firstName,
        lastName,
        email,
        street,
        province,
        district,
        ward,
        zipcode,
        phoneNumber: phone,
      },
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Địa chỉ không tồn tại hoặc không thuộc về người dùng",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật địa chỉ thành công",
      updatedAddress,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
};

const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng đăng nhập" });
    }

    const addresses = await addressModel.find({ userId }).exec();

    return res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách địa chỉ:", error);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
};

const removeAddress = async (req, res) => {
  try {
    const { addressId } = req.body;

    if (!addressId) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu ID địa chỉ" });
    }

    const address = await addressModel.findById(addressId);
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Địa chỉ không tồn tại" });
    }

    await addressModel.findByIdAndDelete(addressId);
    res.status(200).json({ success: true, message: "Xoá địa chỉ thành công" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
};

export { addNewAddress, getAddress, removeAddress, editAddress };
