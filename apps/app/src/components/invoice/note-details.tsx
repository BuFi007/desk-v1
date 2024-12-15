"use client";

import { Editor } from "@/components/invoice/editor";
import { useAction } from "next-safe-action/hooks";
import { Controller, useFormContext } from "react-hook-form";
import { LabelInput } from "./label-input";

export function NoteDetails() {
  const { control, watch, setValue } = useFormContext();
  const id = watch("id");

  return (
    <div>
      <LabelInput
        name="note_label"
        onSave={(value) => {
          setValue("note_label", value);
        }}
        className="mb-2 block"
      />

      <Controller
        control={control}
        name="note_details"
        render={({ field }) => {
          return (
            <Editor
              // NOTE: This is a workaround to get the new content to render
              key={id}
              initialContent={field.value}
              onChange={field.onChange}
              className="min-h-[78px]"
            />
          );
        }}
      />
    </div>
  );
}
