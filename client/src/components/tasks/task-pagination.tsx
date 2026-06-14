import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationType, TaskListQuery } from "@/api/tasks/type";
import { Button } from "@/components/ui/button";


interface TaskPaginationProps {
  pagination: PaginationType;
  filters: TaskListQuery;
  applyFilter: (key: keyof TaskListQuery | 'sort', value: string | number) => void;
}

const TaskPagination: React.FC<TaskPaginationProps> = ({ pagination, filters, applyFilter }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <Button 
        variant="outline" 
        size="sm" 
        disabled={!pagination.isPrevPage}
        onClick={() => applyFilter('page', (filters.page || 1) - 1)}
      >
        <ChevronLeft className="size-4" />
        Previous
      </Button>
      
      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
        <Button 
          key={p}
          variant="outline" 
          size="sm" 
          className={filters.page === p ? "bg-primary/10 text-primary border-primary/20" : ""}
          onClick={() => applyFilter('page', p)}
        >
          {p}
        </Button>
      ))}

      <Button 
        variant="outline" 
        size="sm" 
        disabled={!pagination.isNextPage}
        onClick={() => applyFilter('page', (filters.page || 1) + 1)}
      >
        Next
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

export default TaskPagination