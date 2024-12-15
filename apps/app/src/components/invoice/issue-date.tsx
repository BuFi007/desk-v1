"use client";

import type { InvoiceFormValues } from "@/actions/invoice/schema";
import { Calendar } from "@bu/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@bu/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { LabelInput } from "./label-input";
import { Button } from "@bu/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@bu/ui/cn";

export function IssueDate() {
  const { setValue, watch } = useFormContext<InvoiceFormValues>();
  const issueDate = watch("issue_date");
  const dateFormat = watch("template.date_format") || "PP"; // Fallback to default format
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setValue("issue_date", date, { shouldValidate: true, shouldDirty: true });
      setIsOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <LabelInput
          name="template.issue_date_label"
          onSave={(value) => {
            setValue("template.issue_date_label", value);
          }}
        />
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[180px] justify-start text-left font-normal",
              !issueDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {issueDate ? format(issueDate, dateFormat) : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={issueDate}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
