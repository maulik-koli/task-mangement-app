import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { TaskListResponse, TaskListQuery, CreateTaskPayload, UpdateTaskPayload, TaskResponse } from "./type";


export const getTaskList = async (query: TaskListQuery): Promise<ApiResponse<TaskListResponse>> => {
    const res = await api.get("/tasks", { params: query })
    return res.data
}

export const getTask = async (taskId: string): Promise<ApiResponse<TaskResponse>> => {
    const res = await api.get(`/tasks/${taskId}`)
    return res.data
}

export const createTask = async (payload: CreateTaskPayload): Promise<ApiResponse<null>> => {
    const res = await api.post('/tasks', payload.data)
    return res.data
}

export const updateTask = async (payload: UpdateTaskPayload): Promise<ApiResponse<null>> => {
    const res = await api.patch(`/tasks/${payload.taskId}`, payload.data)
    return res.data
}

export const deleteTask = async (taskId: string): Promise<ApiResponse<null>> => {
    const res = await api.delete(`/tasks/${taskId}`)
    return res.data
}

