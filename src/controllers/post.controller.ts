import { Request, Response } from "express";
import * as PostService from "../services/post.service";

export const createPost = async (req: any, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "title and content are required" });
    }

    // console.log("Authenticated User ID:", req.user.id);
    // console.log("Post Title:", title);
    // console.log("Post Content:", content);

    const post = await PostService.createPost({ title, content }, req.user.id);

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
};
