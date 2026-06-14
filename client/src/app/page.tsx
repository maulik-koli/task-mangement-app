import type { Metadata } from "next";
import DashboardHeader from "@/components/tasks/dashboard-header";
import TaskContent from "@/components/tasks/task-content";

export const metadata: Metadata = {
  title: "Task Management",
  description: "Manage and organize your tasks efficiently with task management app. A clean, modern dashboard.",
};


const TaskDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Manage and organize your tasks efficiently
            </p>
          </div>
          <TaskContent />
        </div>
      </div>
    </div>
  )
}

export default TaskDashboardPage;