import { model, Schema } from "mongoose";
import { Post } from "../validators/postValidator";


const postSchema = new Schema<Post>({
  title: {
    type: String,
    required: [true, "A post must have title"],
    trim: true,
  },
  markdownContent: {
    type: String,
    required: [true, "A post must have content"],
  },
  author: {
    type: String,
    default: "Admin", // Sets a default value if no author is provided.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const postModel = model<Post>("Post", postSchema);
