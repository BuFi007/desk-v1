import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Button } from "./button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "./use-toast";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A radio group component for selecting a single option from a list.",
      },
    },
  },
};

export default meta;

// Basic usage
export const Default: StoryObj<typeof RadioGroup> = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <Label htmlFor="option-1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <Label htmlFor="option-2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="option-3" />
        <Label htmlFor="option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

// Form with validation example
const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

const NotificationPreferences = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[400px] space-y-6"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      All new messages
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mentions" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Direct messages and mentions
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">Nothing</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save preferences</Button>
      </form>
    </Form>
  );
};

// All variants story
export const AllVariants: StoryObj<typeof RadioGroup> = {
  render: () => (
    <div className="w-[400px] space-y-8">
      {/* Basic Usage */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Usage</h3>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="default" />
            <Label htmlFor="default">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="comfortable" />
            <Label htmlFor="comfortable">Comfortable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="compact" />
            <Label htmlFor="compact">Compact</Label>
          </div>
        </RadioGroup>
      </section>

      {/* With Descriptions */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">With Descriptions</h3>
        <RadioGroup defaultValue="card">
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="card" id="card" className="mt-1" />
            <div>
              <Label htmlFor="card">Card Payment</Label>
              <p className="text-sm text-muted-foreground">
                Pay with your credit or debit card.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
            <div>
              <Label htmlFor="paypal">PayPal</Label>
              <p className="text-sm text-muted-foreground">
                Pay with your PayPal account.
              </p>
            </div>
          </div>
        </RadioGroup>
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Disabled State</h3>
        <RadioGroup>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="option1" />
            <Label htmlFor="option1">Available</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="option2" disabled />
            <Label htmlFor="option2" className="text-muted-foreground">
              Unavailable
            </Label>
          </div>
        </RadioGroup>
      </section>

      {/* Form Integration */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Form Integration</h3>
        <NotificationPreferences />
      </section>
    </div>
  ),
};

// Small variant
export const SmallGroup: StoryObj<typeof RadioGroup> = {
  render: () => (
    <div className="w-[400px]">
      <RadioGroup defaultValue="option-1" className="flex space-x-4">
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="option-1" id="small-1" />
          <Label htmlFor="small-1" className="text-sm">
            Yes
          </Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="option-2" id="small-2" />
          <Label htmlFor="small-2" className="text-sm">
            No
          </Label>
        </div>
      </RadioGroup>
    </div>
  ),
};

// Card selection variant
export const CardSelection: StoryObj<typeof RadioGroup> = {
  render: () => (
    <RadioGroup defaultValue="card1" className="grid grid-cols-3 gap-4">
      {["Basic", "Pro", "Team"].map((plan, index) => (
        <div key={plan}>
          <RadioGroupItem
            value={`card${index + 1}`}
            id={`card${index + 1}`}
            className="peer sr-only"
          />
          <Label
            htmlFor={`card${index + 1}`}
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <span className="text-lg font-semibold">{plan}</span>
            <span className="text-sm text-muted-foreground">Plan</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
};
