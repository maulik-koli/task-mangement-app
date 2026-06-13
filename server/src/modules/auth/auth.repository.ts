import { prisma } from "@/configs/prisma";
import { SignupPayload } from "./auth.schema";

class AuthRepository {
    public async create(payload: SignupPayload) {
        return await prisma.user.create({
            data: {
                email: payload.email,
                password: payload.password,
                name: payload.name,
            }
        })
    }

    public async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email }
        })
    }

    public async findById(id: string) {
        return await prisma.user.findUnique({
            where: { id }
        })
    }
}

export const authRepository = new AuthRepository();