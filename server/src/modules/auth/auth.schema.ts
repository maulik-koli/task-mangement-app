import z from 'zod';

const passwordSchema = z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: passwordSchema,
});

export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.email("Invalid email address"),
    password: passwordSchema,
});

export type LoginPayload = z.infer<typeof loginSchema>;
export type SignupPayload = z.infer<typeof signupSchema>;