import { Request, Response } from "express";
import * as PostService from "../services/post.service";
import logger from "../utils/logger";

export const createPost = async (req: any, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "title and content are required" });
    }
    const post = await PostService.createPost({ title, content }, req.user.id);

    res.status(201).json(post);
  } catch (error) {
    logger.error({error},"Error creating post:");
    res.status(500).json({ message: "Failed to create post" });
  }
};
