import { beforeEach, describe, expect, it, vi } from "vitest";
import { TaskPriority, TaskStatus } from "generated/prisma/enums";

vi.mock("./task.repository", () => ({
    taskRepository: {
        create: vi.fn(),
        findMany: vi.fn(),
        count: vi.fn(),
        findById: vi.fn(),
        updateById: vi.fn(),
        deleteById: vi.fn(),
    },
}));

import { taskService } from "./task.service";
import { taskRepository } from "./task.repository";

const mockedTaskRepository = vi.mocked(taskRepository);

describe("taskService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("gets tasks with filters, sorting, and pagination", async () => {
        const tasks = [
            {
                id: "task-1",
                title: "Write tests",
                description: "Cover service behavior",
                status: TaskStatus.PENDING,
                priority: TaskPriority.HIGH,
                dueDate: null,
            },
        ];

        mockedTaskRepository.findMany.mockResolvedValue(tasks);
        mockedTaskRepository.count.mockResolvedValue(12);

        const result = await taskService.getTasks("user-1", {
            page: 2,
            limit: 5,
            search: "tests",
            status: TaskStatus.PENDING,
            priority: TaskPriority.HIGH,
            sortBy: "DUE_DATE",
            sortOrder: "asc",
        });

        expect(mockedTaskRepository.findMany).toHaveBeenCalledWith({
            where: {
                userId: "user-1",
                status: TaskStatus.PENDING,
                priority: TaskPriority.HIGH,
                title: {
                    contains: "tests",
                    mode: "insensitive",
                },
            },
            orderBy: {
                dueDate: "asc",
            },
            skip: 5,
            take: 5,
        });
        expect(mockedTaskRepository.count).toHaveBeenCalledWith({
            userId: "user-1",
            status: TaskStatus.PENDING,
            priority: TaskPriority.HIGH,
            title: {
                contains: "tests",
                mode: "insensitive",
            },
        });
        expect(result).toEqual({
            tasks,
            pagination: {
                page: 2,
                limit: 5,
                totalPages: 3,
                totalItems: 12,
                isPrevPage: true,
                isNextPage: true,
            },
        });
    });
});
