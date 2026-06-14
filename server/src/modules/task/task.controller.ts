import { Request, Response } from "express";
import { taskService } from "./task.service";
import { CreateTaskPayload, TaskListQuery, UpdateTaskPayload } from "./task.schema";
import { AppError, AppResponse } from "@/utils/response";

const getTaskId = (req: Request) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        throw new AppError(400, "BAD_REQUEST", "Invalid task id");
    }

    return id;
};


class TaskController {
    public async create(req: Request, res: Response) {
        const userId = req.user!.id;
        const payload = req.body as CreateTaskPayload;

        await taskService.createTask(userId, payload);

        AppResponse(res, 201, {
            code: "CREATED",
            message: "Task created successfully",
        });
    }

    public async list(req: Request, res: Response) {
        const userId = req.user!.id;
        const query = req.localsQuery as TaskListQuery;
        
        const data = await taskService.getTasks(userId, query);

        AppResponse(res, 200, {
            code: "OK",
            message: "Tasks fetched successfully",
            data,
        });
    }

    public async getById(req: Request, res: Response) {
        const userId = req.user!.id;

        const task = await taskService.getTaskById(userId, getTaskId(req));

        AppResponse(res, 200, {
            code: "OK",
            message: "Task fetched successfully",
            data: task,
        });
    }

    public async update(req: Request, res: Response) {
        const userId = req.user!.id;
        const payload = req.body as UpdateTaskPayload;

        await taskService.updateTask(userId, getTaskId(req), payload);

        AppResponse(res, 200, {
            code: "OK",
            message: "Task updated successfully",
        });
    }

    public async delete(req: Request, res: Response) {
        const userId = req.user!.id;
        
        await taskService.deleteTask(userId, getTaskId(req));

        AppResponse(res, 200, {
            code: "OK",
            message: "Task deleted successfully",
        });
    }
}

export const taskController = new TaskController();