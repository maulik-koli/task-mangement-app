import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ quiet: true });

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']),
    PORT: z.coerce.number().default(4000),

    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

    JWT_REFRESH_SECRET: z.string().min(16, "JWT_REFRESH_SECRET is required"),
    JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET is required"),

    DOMAIN: z.string().min(1, "DOMAIN is required"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error('Invalid environment variables:', parsedEnv.error);
    process.exit(1);
}

export const env = parsedEnv.data;