import { Router } from "express";
import { createPost, getAllPosts, getpost, updatePost } from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateBody, validateParams } from "../middleware/validate.middleware";
import { createPostSchema, idParamSchema, patchPostSchema } from "../validation/post.schema";

const router = Router();


router.post("/", authMiddleware, validateBody(createPostSchema), createPost);

// READ
router.get("/:id", authMiddleware, validateParams(idParamSchema), getpost);

router.get("/", authMiddleware, getAllPosts);

// UPDATE
router.put(
    "/:id",
    authMiddleware,
    validateParams(idParamSchema),
    validateBody(createPostSchema),
    updatePost
);

router.patch(
    "/:id",
    authMiddleware,
    validateParams(idParamSchema),
    validateBody(patchPostSchema),
    updatePost
);

// DELETE
router.delete(
    "/:id",
    authMiddleware,

);

export default router;
