import z from 'zod'
import { TASK_STATUS_VALUES, TASK_PRIORITY_VALUES } from '@/constants/select-options';
import { TaskListItem } from '@/api/tasks/type';


export const createTaskSchema = z.object({
    title: z.string()
        .min(2, "Title must be at least 2 characters long")
        .max(100, "Title must be at most 100 characters long"),
    description: z.string()
        .min(2, "Description must be at least 2 characters long")
        .max(500, "Description must be at most 500 characters long")
        .optional(),
    status: z.enum(TASK_STATUS_VALUES, "Invalid task status"),
    priority: z.enum(TASK_PRIORITY_VALUES, "Invalid task priority"),
    dueDate: z.date().optional(),
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
    status: z.enum(TASK_STATUS_VALUES, "Invalid task status").optional(),
    priority: z.enum(TASK_PRIORITY_VALUES, "Invalid task priority").optional(),
    dueDate: z.date().optional(),

}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update"
});

export type CreateTaskFormType = z.infer<typeof createTaskSchema>;
export type UpdateTaskFormType = z.infer<typeof updateTaskSchema>;


export const deafaultTaskValue: CreateTaskFormType = {
    title: "",
    description: "",
    dueDate: new Date(),
    priority: "LOW",
    status: "PENDING"
}

export const convertTaskToForm = (task: TaskListItem): UpdateTaskFormType => {
    return {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: new Date(task.dueDate),
    }
}