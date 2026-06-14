import React, { useState } from "react";
import { TaskListItem } from "@/api/tasks/type";
import { cn, formatDate } from "@/lib/utils";
import { PRIORITY_ACCENT, PRIORITY_CARD, PRIORITY_CONFIG, STATUS_CONFIG } from "@/constants/task-data-config";
import { convertTaskToForm } from "@/schemas/task-schema";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Pencil } from "lucide-react";
import MarkUpdateButton from "./mark-update-btn";
import DeleteTaskButton from "./delete-task-btn";
import CustomDialog from "../composites/custom-dialog";
import UpdateTaskForm from "./update-task-form";


interface TaskCardProps {
  task: TaskListItem;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [openForm, setOpenForm] = useState(false)

  const statusConfig = STATUS_CONFIG[task.status];
  const priorityConfig = PRIORITY_CONFIG[task.priority];
  const accentClass = PRIORITY_ACCENT[task.priority];
  const cardClass = PRIORITY_CARD[task.priority];


  return (
    <div
      className={cn(
        "group flex flex-col gap-3 rounded-xl p-4",
        cardClass,
        "border-l-[3px] border border-slate-200 dark:border-border",
        "shadow-sm hover:shadow-md",
        "transition-all duration-200 hover:-translate-y-0.5",
        accentClass
      )}
    >
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-150">
          {task.title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {task.description || <span className="italic opacity-60">No description provided</span>}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="secondary" className={cn("text-xs rounded-md px-2 py-0.5", statusConfig.className)}>
          {statusConfig.label}
        </Badge>
        <Badge variant="secondary" className={cn("text-xs rounded-md px-2 py-0.5", priorityConfig.className)}>
          {priorityConfig.label}
        </Badge>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-border/40">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="size-3.5 shrink-0" />
          <span>{formatDate(task.dueDate)}</span>
        </div>

        <div className="flex items-center gap-0.5">
          <MarkUpdateButton taskId={task.id} />
          <CustomDialog
            open={openForm}
            onOpenChange={(op) => setOpenForm(op)}
            triggerNode={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:bg-primary/10 hover:text-primary"
                title="Edit"
                type="button"
              >
                <Pencil className="size-4" />
              </Button>
            }
            title="Update Task"
            description="Fill in the details below to update the task."
          >
            <UpdateTaskForm
              taskData={convertTaskToForm(task)}
              taskId={task.id}
              onClose={() => setOpenForm(false)}
            />
          </CustomDialog>
          <DeleteTaskButton taskId={task.id} />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;