import { Editor } from "@/components/invoice/editor";
import { useAction } from "next-safe-action/hooks";
import { Controller, useFormContext } from "react-hook-form";
import { LabelInput } from "./label-input";

export function PaymentDetails() {
  const { control, watch } = useFormContext();
  const id = watch("id");

  function setValue(arg0: string, value: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <LabelInput
        name="template.payment_label"
        onSave={(value) => {
          setValue("template.payment_label", value);
        }}
        className="mb-2 block"
      />

      <Controller
        control={control}
        name="payment_details"
        render={({ field }) => (
          <Editor
            // NOTE: This is a workaround to get the new content to render
            key={id}
            initialContent={field.value}
            onChange={field.onChange}
            onBlur={(content) => {
              setValue(
                "payment_details",
                content ? JSON.stringify(content) : ""
              );
            }}
            className="min-h-[78px]"
          />
        )}
      />
    </div>
  );
}
