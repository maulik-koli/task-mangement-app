import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MutationOptions, QueryOptions, ApiResponse, ApiError } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/api-registry";

import { createTask, deleteTask, getTask, getTaskList, updateTask } from "./api";
import { CreateTaskPayload, TaskListItem, TaskListQuery, TaskListResponse, TaskResponse, UpdateTaskPayload } from "./type";


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

export const useCreateTask = (
    options?: MutationOptions<null, CreateTaskPayload>
) => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<null>, ApiError, CreateTaskPayload, { previousQueries: any, tempTaskId: string }>({
        mutationKey: [MUTATION_REGISTRY.createTask],
        mutationFn: (payload) => createTask(payload),
        ...options,
        onMutate: async (payload) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_REGISTRY.getTaskList] });
            const previousQueries = queryClient.getQueriesData<ApiResponse<TaskListResponse>>({ queryKey: [QUERY_REGISTRY.getTaskList] });

            const tempTaskId = `temp-${Date.now()}`;
            const { data } = payload;
            
            const tempTask: TaskListItem = {
                id: tempTaskId,
                title: data.title,
                description: data.description || '',
                status: data.status,
                priority: data.priority,
                dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : new Date().toISOString(),
            };

            previousQueries.forEach(([queryKey, oldData]) => {
                if (!oldData || !oldData.data) return;
                
                const params = queryKey[1] as TaskListQuery | undefined;
                
                let matchesStatus = true;
                if (params?.status && params.status !== 'ALL' && params.status !== tempTask.status) {
                    matchesStatus = false;
                }
                
                let matchesPriority = true;
                if (params?.priority && params.priority !== 'ALL' && params.priority !== tempTask.priority) {
                    matchesPriority = false;
                }
                
                if (matchesStatus && matchesPriority) {
                    queryClient.setQueryData(queryKey, {
                        ...oldData,
                        data: {
                            ...oldData.data,
                            tasks: [tempTask, ...oldData.data.tasks]
                        }
                    });
                }
            });

            return { previousQueries, tempTaskId };
        },
        onError: (err, variables, context: any) => {
            if (context?.previousQueries) {
                context.previousQueries.forEach(([queryKey, data]: any) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getTaskList] });
        },
        onSuccess: (...args) => {
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

    return useMutation<ApiResponse<null>, ApiError, UpdateTaskPayload, { previousQueries: any }>({
        mutationKey: [MUTATION_REGISTRY.updateTask],
        mutationFn: (payload) => updateTask(payload),
        ...options,
        onMutate: async (payload) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_REGISTRY.getTaskList] });
            const previousQueries = queryClient.getQueriesData<ApiResponse<TaskListResponse>>({ queryKey: [QUERY_REGISTRY.getTaskList] });

            const { taskId, data } = payload;

            previousQueries.forEach(([queryKey, oldData]) => {
                if (!oldData || !oldData.data) return;
                
                const params = queryKey[1] as TaskListQuery | undefined;
                let newTasks = [...oldData.data.tasks];
                const taskIndex = newTasks.findIndex(t => t.id === taskId);
                
                if (taskIndex !== -1) {
                    const updatedTask: TaskListItem = { 
                        ...newTasks[taskIndex], 
                        ...data,
                        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : newTasks[taskIndex].dueDate,
                        status: data.status || newTasks[taskIndex].status,
                        priority: data.priority || newTasks[taskIndex].priority
                    };
                    
                    let matchesStatus = true;
                    if (params?.status && params.status !== 'ALL' && params.status !== updatedTask.status) {
                        matchesStatus = false;
                    }
                    
                    let matchesPriority = true;
                    if (params?.priority && params.priority !== 'ALL' && params.priority !== updatedTask.priority) {
                        matchesPriority = false;
                    }
                    
                    if (!matchesStatus || !matchesPriority) {
                        newTasks.splice(taskIndex, 1);
                    } else {
                        newTasks[taskIndex] = updatedTask;
                    }
                    
                    queryClient.setQueryData(queryKey, {
                        ...oldData,
                        data: {
                            ...oldData.data,
                            tasks: newTasks
                        }
                    });
                }
            });

            return { previousQueries };
        },
        onError: (err, variables, context: any) => {
            if (context?.previousQueries) {
                context.previousQueries.forEach(([queryKey, data]: any) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getTaskList] });
        },
        onSuccess: (...args) => {
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

    return useMutation<ApiResponse<null>, ApiError, string, { previousQueries: any }>({
        mutationKey: [MUTATION_REGISTRY.deleteTask],
        mutationFn: (payload) => deleteTask(payload),
        ...options,
        onMutate: async (taskId) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_REGISTRY.getTaskList] });
            const previousQueries = queryClient.getQueriesData<ApiResponse<TaskListResponse>>({ queryKey: [QUERY_REGISTRY.getTaskList] });

            previousQueries.forEach(([queryKey, oldData]) => {
                if (!oldData || !oldData.data) return;
                
                queryClient.setQueryData(queryKey, {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        tasks: oldData.data.tasks.filter((t: TaskListItem) => t.id !== taskId)
                    }
                });
            });

            return { previousQueries };
        },
        onError: (err, variables, context: any) => {
            if (context?.previousQueries) {
                context.previousQueries.forEach(([queryKey, data]: any) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getTaskList] });
        },
        onSuccess: (...args) => {
            if (options?.onSuccess) {
                options.onSuccess(...args);
            }
        },
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