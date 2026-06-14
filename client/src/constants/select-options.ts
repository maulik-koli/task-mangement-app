import { TaskStatus, TaskPriority } from "@/api/tasks/type"

type OptionsType = { label: string, value: string }[]

export const TASK_STATUS_VALUES: TaskStatus[] = ["PENDING", "IN_PROGRESS", "COMPLETED"] as const
export const TASK_STATUS_OPTOIN: OptionsType = [
    { label: "All Status", value: "ALL" },
    { label: "Pending", value: "PENDING" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Completed", value: "COMPLETED" }
]

export const TASK_PRIORITY_VALUES: TaskPriority[] = ['LOW', 'HIGH', "MEDIUM"] as const
export const TASK_PRIORITY_OPTION: OptionsType = [
    { label: "All Priority", value: "ALL" },
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" }
]

export const TASK_SORT_OPTION: OptionsType = [
    { label: "Due Date: Earliest first", value: "DUE_DATE_ASC" },
    { label: "Due Date: Latest first", value: "DUE_DATE_DESC" },
    { label: "Priority: Low to High", value: "PRIORITY_ASC" },
    { label: "Priority: High to Low", value: "PRIORITY_DESC" },
    { label: "Date Added: Oldest first", value: "CREATED_DATE_ASC" },
    { label: "Date Added: Newest first", value: "CREATED_DATE_DESC" }
]

export const FORM_TASK_STATUS_OPTIONS: OptionsType = TASK_STATUS_OPTOIN.filter(opt => opt.value !== "ALL")
export const FORM_TASK_PRIORITY_OPTIONS: OptionsType = TASK_PRIORITY_OPTION.filter(opt => opt.value !== "ALL")