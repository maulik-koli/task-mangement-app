import { TaskListItem } from "@/api/tasks/type";

export const STATUS_CONFIG: Record<TaskListItem["status"], { label: string; className: string }> = {
    PENDING: {
        label: "Pending",
        className: "bg-slate-100 text-slate-500 border-transparent font-medium dark:bg-slate-800 dark:text-slate-400",
    },
    IN_PROGRESS: {
        label: "In Progress",
        className: "bg-blue-100 text-blue-700 border-transparent font-medium dark:bg-blue-900/40 dark:text-blue-300",
    },
    COMPLETED: {
        label: "Completed",
        className: "bg-emerald-100 text-emerald-700 border-transparent font-medium dark:bg-emerald-900/40 dark:text-emerald-300",
    },
} as const;

export const PRIORITY_CONFIG: Record<TaskListItem["priority"], { label: string; className: string }> = {
    LOW: {
        label: "Low",
        className: "bg-slate-100 text-slate-500 border-transparent font-medium dark:bg-slate-800 dark:text-slate-400",
    },
    MEDIUM: {
        label: "Medium",
        className: "bg-amber-50 text-amber-700 border-amber-200/80 font-medium dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/40",
    },
    HIGH: {
        label: "High",
        className: "bg-rose-50 text-rose-700 border-rose-200/80 font-medium dark:bg-rose-950/20 dark:text-rose-300 dark:border-rose-900/40",
    },
} as const;

export const PRIORITY_ACCENT: Record<TaskListItem["priority"], string> = {
    LOW: "border-l-slate-300 dark:border-l-slate-600",
    MEDIUM: "border-l-amber-400 dark:border-l-amber-500",
    HIGH: "border-l-rose-500 dark:border-l-rose-500",
};

export const PRIORITY_CARD: Record<TaskListItem["priority"], string> = {
    LOW: "bg-white dark:bg-card",
    MEDIUM: "bg-amber-50/60 dark:bg-amber-950/10 border-amber-100 dark:border-amber-900/30",
    HIGH: "bg-rose-50/60 dark:bg-rose-950/10 border-rose-100 dark:border-rose-900/30",
};