import { NextFunction, Request, Response } from "express";
import { authService } from "@/modules/auth/auth.service";
import { env } from "@/configs/env";

import { verifyJwtToken } from "@/lib/jwt";
import { AUTH_CONFIG } from "@/constants/auth.config";
import { AppError } from "@/utils/response";


export const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    const accessToken = req.cookies[AUTH_CONFIG.cookieName.accessToken];

    if (!accessToken) {
        throw new AppError(401, "UNAUTHORIZED", "Token is required");
    }

    const decodedToken = verifyJwtToken(accessToken, env.JWT_ACCESS_SECRET);

    if (!decodedToken?.sub || typeof decodedToken.sub !== "string") {
        throw new AppError(401, "UNAUTHORIZED", "Invalid or expired token");
    }

    const user = await authService.getUser(decodedToken.sub)

    req.user = user;
    next();
};
