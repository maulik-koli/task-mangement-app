import React from "react";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { TaskListQuery } from "@/api/tasks/type";
import { Input } from "../ui/input";


interface TaskSearchProps {
  filters: TaskListQuery;
  applyFilter: (key: keyof TaskListQuery | 'sort', value: string | number) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({ filters, applyFilter }) => {
  const [localSearch, setLocalSearch] = useState(filters.search || "");
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    if (debouncedSearch !== (filters.search || "")) {
      applyFilter('search', debouncedSearch);
    }
  }, [debouncedSearch, applyFilter, filters.search]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search tasks..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-4 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
      />
    </div>
  );
}

export default TaskSearch;