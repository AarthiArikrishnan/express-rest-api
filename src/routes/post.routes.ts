import { Router } from "express";
import { createPost, getAllPosts, getpost } from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { createPostSchema } from "../validation/post.schema";

const router = Router();


router.post("/", authMiddleware, validateBody(createPostSchema), createPost);

// READ
router.get("/:postId", authMiddleware, getpost );

router.get("/", authMiddleware, getAllPosts);

// UPDATE
router.put(
    "/:postId",
    authMiddleware,

);

router.patch(
    "/:postId",
    authMiddleware,
);

// DELETE
router.delete(
    "/:postId",
    authMiddleware,

);

export default router;
