export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED"
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH"

export type PaginationType = {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
    isPrevPage: boolean;
    isNextPage: boolean;
}

export type TaskListQuery = {
    page?: number,
    limit?: number,
    search?: string,
    status?: string,
    priority?: string,
    sortBy?: string,
    sortOrder?: string,
}

export type TaskListItem = {
    id: string
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    dueDate: string
}

export type TaskListResponse = {
    tasks: TaskListItem[],
    pagination: PaginationType,
}