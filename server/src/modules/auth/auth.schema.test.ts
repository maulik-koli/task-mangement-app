import { describe, expect, it } from "vitest";
import { signupSchema } from "./auth.schema";

const validSignupPayload = {
    name: "Test User",
    email: "test@example.com",
    password: "StrongPass1!",
    confirmPassword: "StrongPass1!",
};

describe("signupSchema password validation", () => {
    it("accepts a password that matches every password rule", () => {
        const result = signupSchema.safeParse(validSignupPayload);

        expect(result.success).toBe(true);
    });

    it.each([
        ["Short1!", "Password must be at least 8 characters"],
        ["strongpass1!", "Password must contain at least one uppercase letter"],
        ["StrongPass!", "Password must contain at least one number"],
        ["StrongPass1", "Password must contain at least one special character"],
    ])("rejects %s with the right validation message", (password, message) => {
        const result = signupSchema.safeParse({
            ...validSignupPayload,
            password,
            confirmPassword: password,
        });

        expect(result.success).toBe(false);
        if (result.success) {
            throw new Error("Expected password validation to fail");
        }
        expect(result.error.issues.map((issue) => issue.message)).toContain(message);
    });

    it("rejects when confirmPassword does not match password", () => {
        const result = signupSchema.safeParse({
            ...validSignupPayload,
            confirmPassword: "DifferentPass1!",
        });

        expect(result.success).toBe(false);
        if (result.success) {
            throw new Error("Expected confirmPassword validation to fail");
        }
        expect(result.error.issues).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    path: ["confirmPassword"],
                    message: "Confirm password and password must be same",
                }),
            ]),
        );
    });
});
