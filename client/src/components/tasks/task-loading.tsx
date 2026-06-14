import React from 'react'
import { TaskCardSkeleton } from './loading-skeleton'

interface TaskLoadingProps {
    count?: number
}

const TaskLoading: React.FC<TaskLoadingProps> = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {Array.from({ length: count }).map((_, i) => (
                <TaskCardSkeleton key={i} />
            ))}
        </div>
    )
}

export default TaskLoading
