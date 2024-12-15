"use client";

import { Editor } from "@/components/invoice/editor";
import { Controller, useFormContext } from "react-hook-form";
import { LabelInput } from "./label-input";

export function FromDetails() {
  const { control, watch } = useFormContext();
  const id = watch("id");

  return (
    <div>
      <LabelInput name="from_details_label" className="mb-2 block" />

      <Controller
        name="from_details"
        control={control}
        render={({ field }) => (
          <Editor
            // NOTE: This is a workaround to get the new content to render
            key={id}
            initialContent={field.value}
            onChange={field.onChange}
            className="min-h-[90px] [&>div]:min-h-[90px]"
          />
        )}
      />
    </div>
  );
}
