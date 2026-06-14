import React from 'react'
import { Button } from '../ui/button'
import { CheckCircle2, RotateCcw } from 'lucide-react'
import { useUpdateTask } from '@/api/tasks/hooks'
import { TaskStatus } from '@/api/tasks/type'

interface MarkUpdateButtonProps {
    taskId: string
    status: TaskStatus
}

const MarkUpdateButton: React.FC<MarkUpdateButtonProps> = ({ taskId, status }) => {
    const { mutate } = useUpdateTask()

    const isCompleted = status === 'COMPLETED'

    const onUpdateTask = () => {
        mutate({
            data: { status: isCompleted ? 'PENDING' : 'COMPLETED' },
            taskId
        })
    }

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            className={
                isCompleted 
                ? "text-muted-foreground hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-950/30 dark:hover:text-amber-400" 
                : "text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400"
            }
            title={isCompleted ? "Mark pending" : "Mark complete"}
            type='button'
            onClick={onUpdateTask}
        >
            {isCompleted ? <RotateCcw className="size-4" /> : <CheckCircle2 className="size-4" />}
        </Button>
    )
}

export default MarkUpdateButton