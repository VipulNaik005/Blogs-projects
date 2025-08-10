import { Router } from "express";
import { createPost, deletePostById, getAllPost, getPostById, updatePostById } from "../controllers/postController";

const postRouter = Router()

postRouter.route("/").get(getAllPost).post(createPost)
postRouter.route("/:id").get(getPostById).patch(updatePostById).delete(deletePostById)

export default postRouter