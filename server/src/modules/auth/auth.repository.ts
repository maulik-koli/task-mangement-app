import { prisma } from "@/configs/prisma";
import { SignupPayload } from "./auth.schema";

class AuthRepository {
    public async create(payload: SignupPayload) {
        return await prisma.user.create({
            data: { ...payload }
        })
    }

    public async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email }
        })
    }
}

export const authRepository = new AuthRepository();