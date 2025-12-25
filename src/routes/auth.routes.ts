import { Router } from "express";
import { login, register, verify } from "../controllers/auth.controller";
import { validateBody } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../validation/auth.schema";


const router = Router();


router.post("/register",validateBody(registerSchema), register);
router.get("/verify/:token", verify);
router.post("/login",validateBody(loginSchema),login);



export default router;