import express from "express";
import authMiddleWare from "../middleware/auth.js";
import { addComment, getComments } from "../controllers/commentController.js";

const commentRoute = express.Router();

commentRoute.post("/:productId/addcomment", authMiddleWare, addComment);
commentRoute.get("/:productId/getcomments", getComments);

export default commentRoute;
