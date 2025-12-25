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
