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
    const post = await PostService.getPostByID(req.params.id)

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
export const updatePost = async (req: Request, res: Response) => {
  try {

    const userId = req?.user?.id as unknown as string
    const postId = req.params.id
    const { title, content } = req.body

    const post = await PostService.getPostByID(postId)

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    const updatedPost = await PostService.updatePost(postId, { title, content })
    res.status(200).json(updatedPost)

  } catch (error) {
    logger.error({ error }, "error updating the post");
    res.status(500).json({ message: "failed to update the post" })

  }

}
