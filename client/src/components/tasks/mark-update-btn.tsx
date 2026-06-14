import React from 'react'
import { Button } from '../ui/button'
import { CheckCircle2 } from 'lucide-react'
import { useUpdateTask } from '@/api/tasks/hooks'

interface MarkUpdateButtonProps {
    taskId: string
}

const MarkUpdateButton: React.FC<MarkUpdateButtonProps> = ({ taskId }) => {
    const { mutate } = useUpdateTask()

    const onUpdateTask = () => {
        mutate({
            data: { status: 'COMPLETED' },
            taskId
        })
    }

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400"
            title="Mark complete"
            type='button'
            onClick={onUpdateTask}
        >
            <CheckCircle2 className="size-4" />
        </Button>
    )
}

export default MarkUpdateButton