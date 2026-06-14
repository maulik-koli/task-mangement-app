import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/api-registry";

import { getTaskList } from "./api";
import { TaskListQuery, TaskListResponse } from "./type";


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