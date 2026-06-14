import React from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useDeleteTask } from '@/api/tasks/hooks'


interface DeleteTaskButtonProps {
    taskId: string
}

const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({ taskId }) => {
    const { mutate } = useDeleteTask()
    
    const onDelteTask = () => {
        mutate(taskId)
    }

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            title="Delete"
            type='button'
            onClick={onDelteTask}
        >
            <Trash2 className="size-4" />
        </Button>
    )
}

export default DeleteTaskButton