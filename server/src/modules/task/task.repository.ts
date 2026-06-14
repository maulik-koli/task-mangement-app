import { prisma } from "@/configs/prisma";
import { Prisma } from "generated/prisma/client";
import { CreateTaskPayload, UpdateTaskPayload } from "./task.schema";

class TaskRepository {
    public async create(userId: string, payload: CreateTaskPayload) {
        return await prisma.task.create({
            data: {
                ...payload,
                userId,
            },
        });
    }

    public async findMany(params: {
        where: Prisma.TaskWhereInput;
        orderBy: Prisma.TaskOrderByWithRelationInput;
        skip: number;
        take: number;
    }) {
        return await prisma.task.findMany({
            where: params.where,
            orderBy: params.orderBy,
            skip: params.skip,
            take: params.take,
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                dueDate: true,
            }
        });
    }

    public async count(where: Prisma.TaskWhereInput) {
        return await prisma.task.count({ where });
    }

    public async findById(userId: string, id: string) {
        return await prisma.task.findFirst({
            where: {
                id,
                userId,
            },
        });
    }

    public async updateById(id: string, payload: UpdateTaskPayload) {
        return await prisma.task.update({
            where: { id },
            data: payload,
        });
    }

    public async deleteById(id: string) {
        return await prisma.task.delete({
            where: { id },
        });
    }
}

export const taskRepository = new TaskRepository();
