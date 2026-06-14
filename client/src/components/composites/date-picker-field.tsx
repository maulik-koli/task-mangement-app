import React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export interface DatePickerFieldProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  label?: string
  placeholder?: string
  error?: string
  className?: string
  disabled?: boolean
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  value,
  onChange,
  label,
  placeholder = "Pick a date",
  error,
  className,
  disabled = false,
}) => {
  return (
    <Field className={cn("flex flex-col gap-1.5", className)}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal h-9",
              !value && "text-muted-foreground",
              error && "border-destructive focus-visible:ring-destructive/20"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 size-4" />
            {value ? format(value, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
          />
        </PopoverContent>
      </Popover>
      {error && <FieldError>{error}</FieldError>}
    </Field>
  )
}

export default DatePickerField
