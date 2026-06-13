import express from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { validateBody, validateQuery } from "@/middlewares/validate.middlewate";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { taskController } from "./task.controller";
import { createTaskSchema, taskListQuerySchema, updateTaskSchema } from "./task.schema";

const taskRouter = express.Router();

taskRouter.use(authMiddleware);

taskRouter.post(
    "/",
    validateBody(createTaskSchema),
    asyncWrapper(taskController.create)
);

taskRouter.get(
    "/",
    validateQuery(taskListQuerySchema),
    asyncWrapper(taskController.list)
);

taskRouter.get(
    "/:id",
    asyncWrapper(taskController.getById)
);

taskRouter.patch(
    "/:id",
    validateBody(updateTaskSchema),
    asyncWrapper(taskController.update)
);

taskRouter.delete(
    "/:id",
    asyncWrapper(taskController.delete)
);

export default taskRouter;
