import z from 'zod';
import { TaskStatus, TaskPriority } from 'generated/prisma/enums';

const TASK_STATUS = [TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED] as const;
const TASK_PRIORITY = [TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH] as const;

const TASK_SORT_FIELDS = ['CREATED_AT', 'DUE_DATE', 'PRIORITY'] as const;
const SORT_ORDERS = ['asc', 'desc'] as const;

export const createTaskSchema = z.object({
    title: z.string()
        .min(2, "Title must be at least 2 characters long")
        .max(100, "Title must be at most 100 characters long"),
    description: z.string()
        .min(2, "Description must be at least 2 characters long")
        .max(500, "Description must be at most 500 characters long")
        .optional(),
    status: z.enum(TASK_STATUS, "Invalid task status"),
    priority: z.enum(TASK_PRIORITY, "Invalid task priority"),
    dueDate: z.coerce.date().optional(),
});

export const updateTaskSchema = z.object({
   title: z.string()
        .min(2, "Title must be at least 2 characters long")
        .max(100, "Title must be at most 100 characters long")
        .optional(),
    description: z.string()
        .min(2, "Description must be at least 2 characters long")
        .max(500, "Description must be at most 500 characters long")
        .optional(),
    status: z.enum(TASK_STATUS, "Invalid task status").optional(),
    priority: z.enum(TASK_PRIORITY, "Invalid task priority").optional(),
    dueDate: z.coerce.date().optional(),

}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update"
});

export const taskListQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number()
        .int()
        .positive()
        .max(50, `Limit cannot exceed 50`)
        .default(10),
    search: z.string().trim().min(1).max(100).optional(),
    status: z.enum(TASK_STATUS, "Invalid task status").optional(),
    priority: z.enum(TASK_PRIORITY, "Invalid task priority").optional(),
    sortBy: z.enum(TASK_SORT_FIELDS, "Invalid sort field").default('CREATED_AT'),
    sortOrder: z.enum(SORT_ORDERS, "Invalid sort order").default('desc'),
});

export type CreateTaskPayload = z.infer<typeof createTaskSchema>;
export type UpdateTaskPayload = z.infer<typeof updateTaskSchema>;
export type TaskListQuery = z.infer<typeof taskListQuerySchema>;
