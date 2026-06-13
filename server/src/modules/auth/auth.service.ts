import { randomUUID } from "crypto";
import { authRepository } from "./auth.repository";
import { LoginPayload, SignupPayload } from "./auth.schema";

import { env } from "@/configs/env";
import { generateJwtToken, verifyJwtToken } from "@/lib/jwt";
import { AUTH_CONFIG } from "@/constants/auth.config";
import { comparePassword, generatePasswordHash } from "@/lib/passsword";
import { AppError } from "@/utils/response";


class AuthService {
    public async registerUser(payload: SignupPayload) {
        const hashPasswrod = await generatePasswordHash(payload.password);

        const newUser = await authRepository.create({
            ...payload,
            password: hashPasswrod
        });

        return this.generateTokens(newUser.id);
    }

    public async loginUser(payload: LoginPayload) {
        const user = await authRepository.findByEmail(payload.email);

        if (!user) {
            throw new AppError(401, "UNAUTHORIZED", "Invalid credentials details");
        }

        const isValidPasswrod = await comparePassword(payload.password, user.password)

        if (!isValidPasswrod) {
            throw new AppError(401, "UNAUTHORIZED", "Invalid credentials details");
        }

        return this.generateTokens(user.id);
    }

    public async refreshAccessToken(refreshToken: string | null | undefined) {
        if (!refreshToken) {
            throw new AppError(401, "UNAUTHORIZED", "Refresh token is required");
        }

        const decodedToken = verifyJwtToken(refreshToken, env.JWT_REFRESH_SECRET);

        if (!decodedToken?.sub) {
            throw new AppError(401, "UNAUTHORIZED", "Invalid or expired token");
        }

        const accessToken = generateJwtToken({
            sub: decodedToken.sub,
        }, env.JWT_ACCESS_SECRET, AUTH_CONFIG.jwtExpiry.accessToken);

        return { accessToken };
    }

    public async getUser(userId: string) {
        const user = await authRepository.findById(userId);

        if (!user) {
            throw new AppError(404, "RESOURCE_NOT_FOUND", "User not found");
        }

        return user;
    }


    private generateTokens(userId: string) {
        const accessToken = generateJwtToken({
            sub: userId,
        }, env.JWT_ACCESS_SECRET, AUTH_CONFIG.jwtExpiry.accessToken);
        
        const refreshToken = generateJwtToken({
            sub: userId,
            jti: randomUUID(),
        }, env.JWT_REFRESH_SECRET, AUTH_CONFIG.jwtExpiry.refreshToken);
        
        return { accessToken, refreshToken };
    }
}

export const authService = new AuthService();
