import { Router } from "express";
import { login, register, verify } from "../controllers/auth.controller";
import { validateBody } from "../middleware/validate.middleware";
import { registerSchema } from "../validation/auth.schema";


const router = Router();


router.post("/register",validateBody(registerSchema), register);
router.get("/verify/:token", verify);
router.post("/login",login)



export default router;