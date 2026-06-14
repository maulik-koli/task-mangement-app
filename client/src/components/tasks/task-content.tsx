'use client'
import React from 'react'
import { useGetTaskList } from '@/api/tasks/hooks'
import { useTaskFilter } from '@/hooks/use-task-filter'

import TaskSearch from './task-search'
import TaskFilters from './task-filters'
import TaskList from './task-list'
import TaskPagination from './task-pagination'
import ErrorBlock from '../common/error-block'
import { TaskCardSkeleton } from './loading-skeleton'


const TaskContent: React.FC = () => {
    const { filters, applyFilter } = useTaskFilter();
    const { data, isLoading, error } = useGetTaskList(filters);

    const getContent = () => {
        if (isLoading) return <TaskLoading />
        if (error || !data || !data.data) {
            return (
                <ErrorBlock 
                    type="error" 
                    title="Failed to load tasks" 
                    description="Something went wrong while retrieving your tasks. Please try again."
                />
            )
        }
        if (data.data?.tasks.length === 0) {
            return (
                <ErrorBlock 
                    type="no-data" 
                    title="No tasks found" 
                    description="You don't have any tasks yet. Create one to get started!"
                />
            )
        }

        return (
            <>
                <TaskList tasks={data.data.tasks} />
                <TaskPagination 
                    pagination={data.data.pagination} 
                    filters={filters} 
                    applyFilter={applyFilter} 
                />
            </>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <TaskSearch filters={filters} applyFilter={applyFilter} />
            <TaskFilters filters={filters} applyFilter={applyFilter} />
            {getContent()}
        </div>
    )
}

export default TaskContent



interface TaskLoadingProps {
    count?: number
}
const TaskLoading: React.FC<TaskLoadingProps> = function({ count = 6 }) {
    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {Array.from({ length: count }).map((_, i) => (
                <TaskCardSkeleton key={i} />
            ))}
        </div>
    )
}