import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle2, Pencil, Trash2 } from "lucide-react";
import { TaskListItem } from "@/api/tasks/type";

interface TaskCardProps {
  task: TaskListItem;
}

const STATUS_CONFIG: Record<TaskListItem["status"], { label: string; className: string; }> = {
  PENDING: {
    label: "Pending",
    className: "bg-muted text-muted-foreground hover:bg-muted",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className:
      "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 dark:text-blue-400",
  },
  COMPLETED: {
    label: "Completed",
    className:
      "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-400",
  },
} as const;

const PRIORITY_CONFIG: Record<TaskListItem["priority"], { label: string; className: string; }> = {
  LOW: {
    label: "Low",
    className: "bg-muted text-muted-foreground hover:bg-muted",
  },
  MEDIUM: {
    label: "Medium",
    className:
      "bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 dark:text-amber-400",
  },
  HIGH: {
    label: "High",
    className:
      "bg-red-500/10 text-red-700 hover:bg-red-500/20 dark:text-red-400",
  },
} as const;

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TaskCard({ task }: TaskCardProps) {
  const statusConfig = STATUS_CONFIG[task.status];
  const priorityConfig = PRIORITY_CONFIG[task.priority];

  return (
    <Card className="transition-colors hover:bg-muted/30">
      <CardContent className="space-y-3">
        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium leading-snug">{task.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="secondary" className={statusConfig.className}>
            {statusConfig.label}
          </Badge>
          <Badge variant="secondary" className={priorityConfig.className}>
            {priorityConfig.label}
          </Badge>
        </div>

        {/* Footer: Due Date & Actions */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="size-3.5" />
            <span>{formatDate(task.dueDate)}</span>
          </div>

          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground hover:text-emerald-600"
              title="Mark complete"
            >
              <CheckCircle2 className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground hover:text-foreground"
              title="Edit"
            >
              <Pencil className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground hover:text-destructive"
              title="Delete"
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
