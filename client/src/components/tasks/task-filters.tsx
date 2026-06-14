"use client";
import React, { useState } from "react";
import { TaskListQuery } from "@/api/tasks/type";
import { TASK_STATUS_OPTOIN, TASK_PRIORITY_OPTION, TASK_SORT_OPTION } from "@/constants/select-options";

import CustomDialog from "../composites/custom-dialog";
import CreateTaskForm from "./create-task-form";
import SelectField from "../composites/select-field";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


interface TaskFiltersProps {
  filters: TaskListQuery;
  applyFilter: (key: keyof TaskListQuery | 'sort', value: string | number) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, applyFilter }) => {
  const [openForm, setOpenForm] = useState(false)

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <SelectField
          label="Task Status"
          value={filters.status || TASK_STATUS_OPTOIN[0].value}
          onChange={(val) => applyFilter('status', val)}
          options={TASK_STATUS_OPTOIN}
          selectTriggerClass="min-w-35"
        />

        <SelectField
          label="Priority"
          value={filters.priority || TASK_PRIORITY_OPTION[0].value}
          onChange={(val) => applyFilter('priority', val)}
          options={TASK_PRIORITY_OPTION}
          selectTriggerClass="min-w-35"
        />

        <SelectField
          label="Sort by"
          value={filters.sortBy ? `${filters.sortBy === 'CREATED_AT' ? 'CREATED_DATE' : filters.sortBy}_${filters.sortOrder?.toUpperCase()}` : TASK_SORT_OPTION[0].value}
          onChange={(val) => applyFilter('sort', val)}
          options={TASK_SORT_OPTION}
          selectTriggerClass="min-w-60"
        />
      </div>

      <CustomDialog
        open={openForm}
        onOpenChange={(op) => setOpenForm(op)}
        triggerNode={
          <Button>
            <Plus className="mr-2 size-4" /> Create Task
          </Button>
        }
        title="Create New Task"
        description="Fill in the details below to create a new task."
      >
        <CreateTaskForm onClose={() => setOpenForm(false)} />
      </CustomDialog>
    </div>
  );
}

export default TaskFilters