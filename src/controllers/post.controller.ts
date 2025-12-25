import { Request, Response } from "express";
import * as PostService from "../services/post.service";
import logger from "../utils/logger";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const post = await PostService.createPost({ title, content }, req.user.id);
    res.status(201).json(post);
  } catch (error) {
    logger.error({ error }, "Error creating post:");
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostService.getAllPosts(req.user.id)
    res.status(200).json(posts)
  } catch (error) {
    logger.error({ error }, "Error getting posts:");
    res.status(500).json({ message: "Failed to get posts" });
  }
}
export const getpost = async (req: Request, res: Response) => {
  try {
    const post = await PostService.getPostByID(req.params.postId)

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    const userId = req?.user?.id as unknown as string

    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" })
    }
    
    res.status(200).json(post)

  } catch (error) {
    logger.error({ error }, "error getting the post");
    res.status(500).json({ message: "Failed to post" });
  }
}
