'use client'
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { useCreateTask } from "@/api/tasks/hooks"
import { CreateTaskFormType, createTaskSchema, deafaultTaskValue } from "@/schemas/task-schema"
import { FORM_TASK_PRIORITY_OPTIONS, FORM_TASK_STATUS_OPTIONS } from "@/constants/select-options"

import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import SelectField from "@/components/composites/select-field"
import DatePickerField from "@/components/composites/date-picker-field"


interface CreateTaskFormProps {
  onClose: () => void
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onClose }) => {
  const form = useForm<CreateTaskFormType>({
    defaultValues: deafaultTaskValue,
    resolver: zodResolver(createTaskSchema)
  })
  const { control, handleSubmit } = form

  const { mutate, isPending } = useCreateTask()
  const toast = useToast()

  const submit = (data: CreateTaskFormType) => {
    mutate({ data }, {
      onSuccess: () => {
        toast.success("Task created successfully")
        onClose()
      },
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
          <Button type="submit">Create Task</Button>
        </div>
      </FieldGroup>
    </form>
  )
}

export default CreateTaskForm
