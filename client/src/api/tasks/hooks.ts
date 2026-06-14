import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MutationOptions, QueryOptions } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/api-registry";

import { createTask, deleteTask, getTask, getTaskList, updateTask } from "./api";
import { CreateTaskPayload, TaskListQuery, TaskListResponse, TaskResponse, UpdateTaskPayload } from "./type";


export const useGetTaskList = (
    params: TaskListQuery,
    options?: QueryOptions<TaskListResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getTaskList, params],
        queryFn: () => getTaskList(params),
        retry: false,
        ...options,
    });
};

// ---------- This api is not used right now ----------
export const useGetTask = (
    taskId: string,
    options?: QueryOptions<TaskResponse>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getTask, taskId],
        queryFn: () => getTask(taskId),
        retry: false,
        ...options,
    });
};

export const useCreateTask = (
    options?: MutationOptions<null, CreateTaskPayload>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createTask],
        mutationFn: (payload) => createTask(payload),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getTaskList] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    });
};

export const useUpdateTask = (
    options?: MutationOptions<null, UpdateTaskPayload>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateTask],
        mutationFn: (payload) => updateTask(payload),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getTaskList] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    });
};

export const useDeleteTask = (
    options?: MutationOptions<null, string>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.deleteTask],
        mutationFn: (payload) => deleteTask(payload),
        ...options,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getTaskList] });
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
    });
};