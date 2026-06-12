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
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(30, "Name must not be more than 30 characters")
        .optional(),
    email: z.email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: passwordSchema
}).superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
        ctx.addIssue({
            path: ["confirmPassword"],
            code: "custom",
            message: "Confirm password and password must be same",
        });
    }
});

export type LoginFormType = z.infer<typeof loginSchema>;
export type SignupFormType = z.infer<typeof signupSchema>;


export const defaultLoginValue: LoginFormType = {
    email: '',
    password: ''
}

export const defaultSignupValue: SignupFormType = {
    email: '',
    password: '',
    confirmPassword: ''
}