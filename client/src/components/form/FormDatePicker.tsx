import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller, useFormContext } from "react-hook-form";
import Label from "../ui/label";
import HelperText from "../ui/helperText";

type DatePickerProps = {
  name: string;
  label?: string;
  placeholder?: string;
};

export function FormDatePicker({ name, label, placeholder }: DatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <Label
            htmlFor={name}
            label={label}
            error={Boolean(fieldState?.error?.message)}
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full h-12 justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-6 w-4" />
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>{placeholder || "Pick a date"}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <HelperText
            error={Boolean(fieldState.error)}
            text={fieldState.error?.message}
          />
        </div>
      )}
    />
  );
}
