import TaskCard from "./task-card";
import { TaskListItem } from "@/api/tasks/type";

interface TaskListProps {
  tasks: TaskListItem[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">
          Showing {tasks.length} tasks
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
