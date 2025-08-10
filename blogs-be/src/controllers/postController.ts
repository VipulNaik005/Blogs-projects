import { Request, Response } from "express";
import { postModel } from "../models/postModel";
import { postSchemaZ, postUpdateSchema } from "../validators/postValidator";

export const createPost = async (req: Request, res: Response): Promise<any> => {
  const parsed = postSchemaZ.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  try {
    const post = postModel.create(parsed.data);
    return res.status(201).json(post);
  } catch (err) {
    return res.status(500).json({ error: "Failed to save post." });
  }
};

export const getAllPost = async (req:Request,res:Response)=>{
    try{
        const posts = await postModel.find({}).sort({ createdAt: -1 })
        return res.status(201).json(posts);
    } catch (error){
        return res.status(500).json({ error: "Failed to get all posts." });
    }
}

export const getPostById = async (req:Request,res:Response) => {
    try{
        const post = await postModel.findById(req.params.id)  //.limit(1)
        if(post){
            return res.status(201).json(post);
        }else{
            return res.status(404).json({ message: 'Post not found' })
        }
    } catch (error){
        return res.status(500).json({ error: "Failed to get all posts." });
    }
}

export const updatePostById = async (req:Request,res:Response) =>{
    try{
        const parsed = postUpdateSchema.safeParse(req.body)
        if(!parsed.success){
            return res.status(400).json({ error: parsed.error.flatten() });
        }
        const post = await postModel.findByIdAndUpdate(req.params.id,parsed.data,{runValidators:true,new:true})  //.limit(1)
        if(!post){
            return res.status(404).json({ message: 'Post not found' })
        }
        return res.status(200).json(post)
    } catch (error){
        return res.status(500).json({ error: "Failed to get all posts." });
    }
}

export const deletePostById = async (req:Request,res:Response)=>{
    try {
        const deletedPost = await postModel.findByIdAndDelete(req.params.id)
        if (deletedPost) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({"Error":error})
    }
}