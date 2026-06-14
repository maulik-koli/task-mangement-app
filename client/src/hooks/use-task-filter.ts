import { useState, useCallback } from "react";
import { TaskListQuery } from "@/api/tasks/type";

export const useTaskFilter = () => {
    const [filters, setFilters] = useState<TaskListQuery>({
        page: 1,
        limit: 10,
    });

    const applyFilter = useCallback((key: keyof TaskListQuery | 'sort', value: string | number) => {
        setFilters((prev) => {
            const newFilters = { ...prev };

            if (key === 'sort') {
                if (!value || value === 'ALL') {
                    delete newFilters.sortBy;
                    delete newFilters.sortOrder;
                } else {
                    const strVal = String(value);
                    const sortOrder = strVal.endsWith('_ASC') ? 'asc' : 'desc';
                    let sortBy = strVal.replace('_ASC', '').replace('_DESC', '');
                    
                    if (sortBy === 'CREATED_DATE') {
                        sortBy = 'CREATED_AT';
                    }
                    
                    newFilters.sortBy = sortBy;
                    newFilters.sortOrder = sortOrder;
                }
                newFilters.page = 1;
                return newFilters;
            }

            if (value === "ALL" || value === "") {
                delete newFilters[key as keyof TaskListQuery];
            } else {
                // @ts-ignore
                newFilters[key] = value;
            }

            if (key !== 'page') {
                newFilters.page = 1;
            }

            return newFilters;
        });
    }, []);

    return {
        filters,
        applyFilter
    };
};
