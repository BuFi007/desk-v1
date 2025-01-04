import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Switch } from "./switch";
import { cn } from "../utils";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An accessible label component for form controls.",
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Label> = {
  render: () => <Label>Label</Label>,
};

export const AllVariants: StoryObj<typeof Label> = {
  render: () => (
    <div className="w-[400px] space-y-8">
      {/* Basic Labels */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Labels</h3>
        <div className="grid gap-4">
          <Label>Default Label</Label>
          <Label className="text-muted-foreground">Muted Label</Label>
          <Label className="text-xl">Large Label</Label>
          <Label className="font-bold">Bold Label</Label>
        </div>
      </section>

      {/* With Form Controls */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">With Form Controls</h3>
        <div className="grid gap-4">
          {/* With Input */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter your email" />
          </div>

          {/* Required Field */}
          <div className="grid gap-2">
            <Label
              htmlFor="required"
              className="after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Required Field
            </Label>
            <Input type="text" id="required" placeholder="Required field" />
          </div>

          {/* With Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm font-normal">
              Accept terms and conditions
            </Label>
          </div>

          {/* With Radio Group */}
          <div className="grid gap-2">
            <Label>Notifications</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="font-normal">
                  All notifications
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="important" id="important" />
                <Label htmlFor="important" className="font-normal">
                  Important only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none" className="font-normal">
                  None
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* With Switch */}
          <div className="flex items-center gap-2">
            <Switch id="airplane" />
            <Label htmlFor="airplane">Airplane Mode</Label>
          </div>
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">States</h3>
        <div className="grid gap-4">
          {/* Disabled State */}
          <div className="space-y-2 opacity-50">
            <Label className="cursor-not-allowed">Disabled Label</Label>
            <Input disabled placeholder="Disabled input" />
          </div>

          {/* Error State */}
          <div className="space-y-2">
            <Label htmlFor="error" className="text-destructive">
              Error Label
            </Label>
            <Input
              id="error"
              className="border-destructive"
              placeholder="Error input"
            />
          </div>

          {/* Success State */}
          <div className="space-y-2">
            <Label htmlFor="success" className="text-green-600">
              Success Label
            </Label>
            <Input
              id="success"
              className="border-green-600"
              placeholder="Success input"
            />
          </div>
        </div>
      </section>

      {/* Optional Indicators */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Optional Indicators</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label className="inline-flex items-center gap-2">
              Username
              <span className="text-xs text-muted-foreground">(required)</span>
            </Label>
            <Input placeholder="Enter username" />
          </div>
          <div className="space-y-2">
            <Label className="inline-flex items-center gap-2">
              Bio
              <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Input placeholder="Enter bio" />
          </div>
        </div>
      </section>
    </div>
  ),
};

// Label with description
export const WithDescription: StoryObj<typeof Label> = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="Enter username" />
      <p className="text-sm text-muted-foreground">
        This will be your public display name.
      </p>
    </div>
  ),
};

// Required field variations
export const RequiredFields: StoryObj<typeof Label> = {
  render: () => (
    <div className="space-y-4">
      {/* Asterisk style */}
      <div className="space-y-2">
        <Label
          htmlFor="field1"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Required Field (Asterisk)
        </Label>
        <Input id="field1" placeholder="Enter value" />
      </div>

      {/* Text style */}
      <div className="space-y-2">
        <Label htmlFor="field2" className="flex items-center gap-2">
          Required Field
          <span className="text-xs font-normal text-red-500">Required</span>
        </Label>
        <Input id="field2" placeholder="Enter value" />
      </div>
    </div>
  ),
};
