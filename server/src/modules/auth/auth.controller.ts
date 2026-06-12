import { Request, Response } from "express";
import { LoginPayload, SignupPayload } from "./auth.schema";
import { authService } from "./auth.service";

import { AppResponse } from "@/utils/response";
import { applyAccessTokenCookie, applyAuthCookies, clearAuthCookies } from "@/utils/cookies.helper";
import { AUTH_CONFIG } from "@/constants/auth.config";

class AuthController {
    public async signup(req: Request, res: Response) {
        const payload = req.body as SignupPayload;
        
        const { accessToken, refreshToken } = await authService.registerUser(payload)

        // set cookies
        applyAuthCookies(res, { accessToken, refreshToken });

        AppResponse(res, 200, {
            code: "OK",
            message: "Signup successful",
        });
    }

    public async login(req: Request, res: Response) {
        const payload = req.body as LoginPayload;

        const { accessToken, refreshToken } = await authService.loginUser(payload)

        // set cookies
        applyAuthCookies(res, { accessToken, refreshToken });

        AppResponse(res, 200, {
            code: "OK",
            message: "Login successful",
        });
    }

    public async logout(_req: Request, res: Response) {
        clearAuthCookies(res);

        AppResponse(res, 200, {
            code: "OK",
            message: "Logout successful",
        });
    }

    public async refresh(req: Request, res: Response) {
        const refreshToken = req.cookies[AUTH_CONFIG.cookieName.refreshToken];

        const { accessToken } = await authService.refreshAccessToken(refreshToken);

        applyAccessTokenCookie(res, accessToken);

        AppResponse(res, 200, {
            code: "OK",
            message: "Refresh successful"
        });
    }
}

export const authController = new AuthController();
