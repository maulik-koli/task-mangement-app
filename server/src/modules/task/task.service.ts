import { Prisma } from "generated/prisma/client";
import { AppError } from "@/utils/response";
import { CreateTaskPayload, TaskListQuery, UpdateTaskPayload } from "./task.schema";
import { taskRepository } from "./task.repository";
import { getPaginationData } from "@/utils/getPaginatoinData";

const TASK_SORT_FIELD_MAP = {
    CREATED_AT: "createdAt",
    DUE_DATE: "dueDate",
    PRIORITY: "priority",
} as const;

class TaskService {
    public async createTask(userId: string, payload: CreateTaskPayload) {
        return await taskRepository.create(userId, payload);
    }

    public async getTasks(userId: string, query: TaskListQuery) {
        const page = query.page;
        const limit = query.limit;
        const skip = (page - 1) * limit;

        const where = this.buildTaskWhere(userId, query);
        const orderBy = this.buildTaskOrderBy(query);

        const [tasks, total] = await Promise.all([
            taskRepository.findMany({ where, orderBy, skip, take: limit }),
            taskRepository.count(where),
        ]);

        return {
            tasks,
            pagination: getPaginationData(page, limit, total),
        };
    }

    public async getTaskById(userId: string, id: string) {
        const task = await taskRepository.findById(userId, id);

        if (!task) {
            throw new AppError(404, "RESOURCE_NOT_FOUND", "Task not found");
        }

        const { userId: userIdFromTask , ...restTask } = task;
        return restTask;
    }

    public async updateTask(userId: string, id: string, payload: UpdateTaskPayload) {
        await this.getTaskById(userId, id);
        return await taskRepository.updateById(id, payload);
    }

    public async deleteTask(userId: string, id: string) {
        await this.getTaskById(userId, id);
        await taskRepository.deleteById(id);
    }

    private buildTaskWhere(userId: string, query: TaskListQuery): Prisma.TaskWhereInput {
        const where: Prisma.TaskWhereInput = {
            userId,
        };

        if (query.status) {
            where.status = query.status;
        }

        if (query.priority) {
            where.priority = query.priority;
        }

        if (query.search) {
            where.title = {
                contains: query.search,
                mode: "insensitive",
            };
        }

        return where;
    }

    private buildTaskOrderBy(query: TaskListQuery): Prisma.TaskOrderByWithRelationInput {
        const sortField = TASK_SORT_FIELD_MAP[query.sortBy];

        return {
            [sortField]: query.sortOrder,
        };
    }
}

export const taskService = new TaskService();
