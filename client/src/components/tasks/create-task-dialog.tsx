"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

export default function CreateTaskDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-9 gap-1.5">
          <Plus className="size-4" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Add a new task to your board.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="task-title">
              Title
            </label>
            <input
              id="task-title"
              type="text"
              placeholder="Enter task title"
              className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="task-description">
              Description
            </label>
            <textarea
              id="task-description"
              placeholder="Enter task description"
              rows={3}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30 resize-none"
            />
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select defaultValue="pending">
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select defaultValue="medium">
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="task-due-date">
              Due Date
            </label>
            <input
              id="task-due-date"
              type="date"
              className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
