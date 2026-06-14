import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateTask } from '@/api/tasks/hooks'
import { useToast } from '@/hooks/use-toast'
import { UpdateTaskFormType, updateTaskSchema } from '@/schemas/task-schema'
import { TaskListItem } from '@/api/tasks/type'
import { FORM_TASK_PRIORITY_OPTIONS, FORM_TASK_STATUS_OPTIONS } from '@/constants/select-options'

import SelectField from '../composites/select-field'
import DatePickerField from '../composites/date-picker-field'
import { FieldGroup } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'


interface UpdateTaskFormProps {
    taskData: UpdateTaskFormType
    onClose: () => void
    taskId: string
}

const UpdateTaskForm: React.FC<UpdateTaskFormProps> = ({ onClose, taskData, taskId }) => {
    const form = useForm<UpdateTaskFormType>({
        defaultValues: taskData,
        resolver: zodResolver(updateTaskSchema)
    })
    const { control, handleSubmit } = form
    
    const { mutate, isPending } = useUpdateTask()
    const toast = useToast()
    
    const submit = (data: UpdateTaskFormType) => {
        mutate({ data, taskId }, {
            onSuccess: () => {
                toast.success("Task created successfully")
                onClose()
            }
        })
    }
    
    toast.isLoading(isPending, "Creating task...")

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <FieldGroup>
                <Controller
                    name="title"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            id="title"
                            type="text"
                            placeholder="Task Title"
                            label="Title"
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Textarea
                            id="description"
                            placeholder="Task Description"
                            label="Description"
                            value={field.value || ""}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                        <SelectField
                            label="Status"
                            value={field.value}
                            onChange={field.onChange}
                            options={FORM_TASK_STATUS_OPTIONS}
                            placeholder="Select Status"
                        />
                        )}
                    />
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <SelectField
                                label="Priority"
                                value={field.value}
                                onChange={field.onChange}
                                options={FORM_TASK_PRIORITY_OPTIONS}
                                placeholder="Select Priority"
                            />
                        )}
                    />
                </div>

                <Controller
                name="dueDate"
                control={control}
                render={({ field, fieldState }) => (
                        <DatePickerField
                            label="Due Date"
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />

                <div className="pt-2 flex justify-end gap-2">
                    <Button type="submit">Update Task</Button>
                </div>
            </FieldGroup>
        </form>
    )
}

export default UpdateTaskForm