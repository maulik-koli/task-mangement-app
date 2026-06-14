import express from "express";
import { authController } from "./auth.controller";
import { loginSchema, signupSchema } from "./auth.schema";

import { validateBody } from "@/middlewares/validate.middlewate";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { authMiddleware } from "@/middlewares/auth.middleware";

const authRouter = express.Router();

authRouter.post(
    '/signup',
    validateBody(signupSchema),
    asyncWrapper(authController.signup)
)

authRouter.post(
    '/login',
    validateBody(loginSchema),
    asyncWrapper(authController.login)
)

authRouter.post(
    '/logout',
    authMiddleware,
    asyncWrapper(authController.logout)
)

authRouter.post(
    '/refresh',
    asyncWrapper(authController.refresh)
)

authRouter.get(
    '/profile',
    authMiddleware,
    asyncWrapper(authController.getProfile)
)

export default authRouter
