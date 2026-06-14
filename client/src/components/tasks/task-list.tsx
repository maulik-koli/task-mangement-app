import TaskCard from "./task-card";
import { TaskListItem } from "@/api/tasks/type";


interface TaskListProps {
  tasks: TaskListItem[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{tasks.length}</span> {tasks.length === 1 ? "task" : "tasks"}
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;