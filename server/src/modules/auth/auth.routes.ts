import express from "express";
import { authController } from "./auth.controller";
import { loginSchema, signupSchema } from "./auth.schema";

import { validateBody } from "@/middlewares/validate.middlewate";
import { asyncWrapper } from "@/utils/asyncWrapper";

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
    // will add procted route
    asyncWrapper(authController.logout)
)

authRouter.post(
    '/refresh',
    asyncWrapper(authController.refresh)
)

export default authRouter
