import express from "express";
import {
  changePassword,
  editUser,
  getUser,
  getUsersComment,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import authMiddleWare from "../middleware/auth.js";
import multer from "multer";

const userRoute = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).any("image", 1);

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/get", authMiddleWare, getUser);
userRoute.put("/edituser", upload, authMiddleWare, editUser);
userRoute.post("/userscomment", getUsersComment);
userRoute.post("/changepassword", authMiddleWare, changePassword);

export default userRoute;
