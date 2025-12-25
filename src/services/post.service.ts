import { Post } from "../models/post.model";

export const createPost = async (postData: any, userId: string) => {
    const { title, content } = postData;

    const post = await Post.create({
        title,
        content,
        user: userId,
    });

    return post;
};

export const getAllPosts = async (userId: string) => {
    const posts = await Post.find({ user: userId })
    return posts;
}
export const getPostByID = async (postId:string) => {
    const post=await Post.findById(postId)
    return post;
}