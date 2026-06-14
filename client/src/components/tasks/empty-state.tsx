import { Button } from "@/components/ui/button";
import { ListTodo, Plus } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
      <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
        <ListTodo className="size-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-base font-medium">No tasks found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Create your first task to get started.
      </p>
      <Button className="mt-4 gap-1.5">
        <Plus className="size-4" />
        Create Task
      </Button>
    </div>
  );
}
