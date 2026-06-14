import { beforeEach, describe, expect, it, vi } from "vitest";
import { AppError } from "@/utils/response";

vi.mock("@/configs/env", () => ({
    env: {
        JWT_ACCESS_SECRET: "access-secret-with-enough-length",
        JWT_REFRESH_SECRET: "refresh-secret-long-enough",
    },
}));

vi.mock("@/lib/passsword", () => ({
    comparePassword: vi.fn(),
    generatePasswordHash: vi.fn(),
}));

vi.mock("@/lib/jwt", () => ({
    generateJwtToken: vi.fn(),
    verifyJwtToken: vi.fn(),
}));

vi.mock("./auth.repository", () => ({
    authRepository: {
        create: vi.fn(),
        findByEmail: vi.fn(),
        findById: vi.fn(),
    },
}));

import { authService } from "./auth.service";
import { authRepository } from "./auth.repository";
import { comparePassword, generatePasswordHash } from "@/lib/passsword";
import { generateJwtToken } from "@/lib/jwt";

const mockedAuthRepository = vi.mocked(authRepository);
const mockedComparePassword = vi.mocked(comparePassword);
const mockedGeneratePasswordHash = vi.mocked(generatePasswordHash);
const mockedGenerateJwtToken = vi.mocked(generateJwtToken);

describe("authService", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockedGenerateJwtToken
            .mockReturnValueOnce("access-token")
            .mockReturnValueOnce("refresh-token");
    });

    it("hashes the password before registering a user", async () => {
        mockedGeneratePasswordHash.mockResolvedValue("hashed-password");
        mockedAuthRepository.create.mockResolvedValue({
            id: "user-1",
            email: "test@example.com",
            name: "Test User",
            password: "hashed-password",
        });

        const result = await authService.registerUser({
            name: "Test User",
            email: "test@example.com",
            password: "StrongPass1!",
            confirmPassword: "StrongPass1!",
        });

        expect(mockedGeneratePasswordHash).toHaveBeenCalledWith("StrongPass1!");
        expect(mockedAuthRepository.create).toHaveBeenCalledWith({
            name: "Test User",
            email: "test@example.com",
            password: "hashed-password",
            confirmPassword: "StrongPass1!",
        });
        expect(result).toEqual({
            accessToken: "access-token",
            refreshToken: "refresh-token",
        });
    });

    it("rejects login when the password does not match the stored hash", async () => {
        mockedAuthRepository.findByEmail.mockResolvedValue({
            id: "user-1",
            email: "test@example.com",
            name: "Test User",
            password: "stored-hash",
        });
        mockedComparePassword.mockResolvedValue(false);

        await expect(
            authService.loginUser({
                email: "test@example.com",
                password: "WrongPass1!",
            }),
        ).rejects.toMatchObject({
            statusCode: 401,
            code: "UNAUTHORIZED",
            message: "Invalid credentials details",
        } satisfies Partial<AppError>);

        expect(mockedComparePassword).toHaveBeenCalledWith("WrongPass1!", "stored-hash");
        expect(mockedGenerateJwtToken).not.toHaveBeenCalled();
    });
});
