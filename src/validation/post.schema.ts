import z from "zod";

export const idParamSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id"),
});

export const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(5),
});


export const patchPostSchema = z.object({
    title: z.string().min(3).optional(),
    content: z.string().min(5).optional(),
});