import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A checkbox component that can be used to toggle between checked and unchecked states.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Helper component for controlled checkbox
const ControlledCheckbox = () => {
  const [checked, setChecked] = useState<CheckedState>(false);
  
  const handleCheckedChange = (state: CheckedState) => {
    setChecked(state);
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="controlled" 
        checked={checked} 
        onCheckedChange={handleCheckedChange}
      />
      <Label htmlFor="controlled">
        {checked ? "Checked" : "Unchecked"}
      </Label>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="default" />
      <Label htmlFor="default">Accept terms and conditions</Label>
    </div>
  ),
};

export const AllVariants: Story = {
  name: "Checkbox Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Basic States */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Basic States</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="basic" />
            <Label htmlFor="basic">Basic Checkbox</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="checked" defaultChecked />
            <Label htmlFor="checked">Checked by Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled" className="text-muted-foreground">
              Disabled
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-checked" disabled defaultChecked />
            <Label htmlFor="disabled-checked" className="text-muted-foreground">
              Disabled Checked
            </Label>
          </div>
        </div>
      </section>

      {/* Controlled Example */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Controlled Checkbox</h3>
        <ControlledCheckbox />
      </section>

      {/* Checkbox Group */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Checkbox Group</h3>
        <div className="flex flex-col gap-3">
          <Label className="text-sm font-medium">Select your interests:</Label>
          <div className="grid gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="music" />
              <Label htmlFor="music">Music</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="art" />
              <Label htmlFor="art">Art</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sports" />
              <Label htmlFor="sports">Sports</Label>
            </div>
          </div>
        </div>
      </section>

      {/* With Description */}
      <section>
        <h3 className="text-lg font-semibold mb-4">With Description</h3>
        <div className="flex items-start space-x-2">
          <Checkbox id="terms" className="mt-1" />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="terms" className="font-medium">
              Accept terms and conditions
            </Label>
            <p className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy by checking this box.
            </p>
          </div>
        </div>
      </section>

      {/* In a Form */}
      <section>
        <h3 className="text-lg font-semibold mb-4">In a Form</h3>
        <form className="space-y-4">
          <div className="grid gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="marketing" />
              <Label htmlFor="marketing">Receive marketing emails</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="newsletter" />
              <Label htmlFor="newsletter">Subscribe to newsletter</Label>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save preferences
          </button>
        </form>
      </section>
    </div>
  ),
};

// Individual variant stories remain the same
export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Checked Checkbox</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled" disabled />
      <Label htmlFor="disabled" className="text-muted-foreground">
        Disabled Checkbox
      </Label>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex items-start space-x-2">
      <Checkbox id="terms" className="mt-1" />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor="terms">Terms of Service</Label>
        <p className="text-sm text-muted-foreground">
          I agree to the terms of service and privacy policy.
        </p>
      </div>
    </div>
  ),
};

export const InFormGroup: Story = {
  render: () => (
    <form className="space-y-4">
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">Notification Preferences</legend>
        <div className="flex items-center space-x-2">
          <Checkbox id="email" />
          <Label htmlFor="email">Email notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="sms" />
          <Label htmlFor="sms">SMS notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="push" />
          <Label htmlFor="push">Push notifications</Label>
        </div>
      </fieldset>
    </form>
  ),
};