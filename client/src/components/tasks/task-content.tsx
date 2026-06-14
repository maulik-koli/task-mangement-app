'use client'
import React from 'react'
import { useGetTaskList } from '@/api/tasks/hooks'

import TaskSearch from './task-search'
import TaskFilters from './task-filters'
import TaskList from './task-list'
import TaskPagination from './task-pagination'
import TaskLoading from './task-loading'
import ErrorBlock from '../common/error-block'


const TaskContent: React.FC = () => {
    const { data, isLoading, error } = useGetTaskList({ page: 1, limit: 10 });

    const getContent = () => {
        if (isLoading) {
            return <TaskLoading count={6} />
        }

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
                <TaskPagination pagination={data.data.pagination} />
            </>
        )
    }

    return (
        <>
            <TaskSearch />
            <TaskFilters />
            {getContent()}
        </>
    )
}

export default TaskContent