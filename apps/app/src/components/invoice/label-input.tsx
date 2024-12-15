"use client";

import { cn } from "@bu/ui/cn";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  required?: boolean;
  className?: string;
  onSave?: (value: string) => void;
  defaultValue?: string;
};

export function LabelInput({
  name,
  className,
  onSave,
  defaultValue = "Label",
}: Props) {
  const { setValue, watch } = useFormContext();
  const value = watch(name) || defaultValue;

  return (
    <span
      className={cn(
        "text-[11px] text-[#878787] min-w-10 font-mono outline-none inline-block p-1",
        "hover:bg-gray-50 focus:bg-gray-50",
        className
      )}
      id={name}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        const newValue = e.currentTarget.textContent || defaultValue;
        setValue(name, newValue, { shouldValidate: true });

        if (newValue !== value) {
          onSave?.(newValue);
        }
      }}
    >
      {value}
    </span>
  );
}
