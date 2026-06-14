import { PaginationType } from "@/api/tasks/type";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TaskPaginationProps {
  pagination: PaginationType
}

export default function TaskPagination({ pagination }: TaskPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      <Button variant="outline" size="sm" disabled>
        <ChevronLeft className="size-4" />
        Previous
      </Button>
      <Button variant="outline" size="sm" className="bg-primary/10 text-primary border-primary/20">
        1
      </Button>
      <Button variant="outline" size="sm">
        2
      </Button>
      <Button variant="outline" size="sm">
        3
      </Button>
      <Button variant="outline" size="sm">
        Next
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
