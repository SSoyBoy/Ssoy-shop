// login user
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import fs from "fs";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exists",
      });
    }
    const isMath = await bcrypt.compare(password, user.password);
    if (!isMath) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      message: "Login successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error,
    });
  }
};

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.lenght < 8) {
      return res.json({
        success: false,
        message:
          "Password less than 8 characters. Please enter a strong password",
      });
    }

    // hashing use password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({
      success: true,
      message: "Registration successful",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

const getUser = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    res.json({
      success: true,
      data: userData,
    });
  } catch (error) {
    res.json({ success: false, message: error });
    console.log(error);
  }
};
const getUsersComment = async (req, res) => {
  try {
    const userIds = req.body.userIds;
    const users = await userModel.find({ _id: { $in: userIds } });
    const userData = users.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    }));
    res.json({ success: true, data: userData });
  } catch (error) {
    res.json({ success: false, message: error });
    console.log(error);
  }
};

const editUser = async (req, res) => {
  try {
    const { name } = req.body;

    const userData = await userModel.findById(req.body.userId);

    if (req.files && req.files.length > 0) {
      const image_filenames = req.files[0].filename;

      fs.unlink(`uploads/${userData.image}`, (err) => {
        if (err) {
          console.log("Error deleting old image:", err);
        }
      });

      await userModel.findByIdAndUpdate(req.body.userId, {
        name,
        image: image_filenames,
      });
      res.json({ success: true, message: "User Updated" });
    } else {
      await userModel.findByIdAndUpdate(req.body.userId, {
        name,
      });
      res.json({
        success: true,
        message: "User Updated",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error });
    console.log(error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { userId, password, newPass } = req.body;
    // Kiểm tra user có tồn tại không
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "Không tìm thấy người dùng" });
    }

    // Kiểm tra mật khẩu cũ có khớp không
    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (!isPasswordMatch) {
      return res.json({ success: false, message: "Mật khẩu không chính xác" });
    }

    // Kiểm tra mật khẩu mới không trùng mật khẩu cũ
    const isNewPasswordMatch = await bcrypt.compare(newPass, userData.password);
    if (isNewPasswordMatch) {
      return res.json({
        success: false,
        message: "Mật khẩu mới không được giống mật khẩu hiện tại",
      });
    }

    // Băm và cập nhật mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass, salt);
    await userModel.findByIdAndUpdate(userId, { password: hashedPassword });

    res.json({ success: true, message: "Đổi mật khẩu thành công" });
  } catch (error) {
    res.json({ success: false, message: error });
    console.log(error);
  }
};

export {
  registerUser,
  loginUser,
  getUser,
  editUser,
  getUsersComment,
  changePassword,
};
