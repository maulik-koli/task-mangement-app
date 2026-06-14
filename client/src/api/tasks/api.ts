import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { TaskListResponse, TaskListQuery } from "./type";

export const getTaskList = async (query: TaskListQuery): Promise<ApiResponse<TaskListResponse>> => {
    const res = await api.get("/tasks", { params: query })
    return res.data
}