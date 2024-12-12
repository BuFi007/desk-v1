import type { Meta, StoryObj } from "@storybook/react";
import { Input, InputMoney } from "./input";
import { Label } from "./label";
import { cn } from "../utils";
import { Icons } from "./icons";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An input component for collecting user data with various states and styles.",
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Input> = {
  render: () => <Input placeholder="Enter text..." />,
};

// Showcase different input types and states
export const InputVariants: StoryObj<typeof Input> = {
  render: () => (
    <div className="w-[400px] space-y-8">
      {/* Basic Inputs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Inputs</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Default</Label>
            <Input placeholder="Enter text..." />
          </div>
          
          <div className="space-y-2">
            <Label>Disabled</Label>
            <Input disabled placeholder="Disabled input" />
          </div>

          <div className="space-y-2">
            <Label>With value</Label>
            <Input value="Input with value" readOnly />
          </div>
        </div>
      </div>

      {/* Input Types */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Input Types</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="example@email.com" />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" placeholder="Enter password" />
          </div>

          <div className="space-y-2">
            <Label>Number</Label>
            <Input type="number" placeholder="Enter number" />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="date" />
          </div>

          <div className="space-y-2">
            <Label>File</Label>
            <Input type="file" />
          </div>
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Icons</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Left Icon</Label>
            <div className="relative">
              <Icons.Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-8" placeholder="Search..." />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Right Icon</Label>
            <div className="relative">
              <Input className="pr-8" type="email" placeholder="Email" />
              <Icons.Email className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Both Icons</Label>
            <div className="relative">
              <Icons.Person className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="px-8" placeholder="Username" />
              <Icons.Check className="absolute right-2.5 top-2.5 h-4 w-4 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Small</Label>
            <Input className="h-8 text-sm" placeholder="Small input" />
          </div>

          <div className="space-y-2">
            <Label>Default</Label>
            <Input placeholder="Default input" />
          </div>

          <div className="space-y-2">
            <Label>Large</Label>
            <Input className="h-10 text-base" placeholder="Large input" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Money Input Examples
export const MoneyInput: StoryObj<typeof InputMoney> = {
  render: () => (
    <div className="w-[400px] space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Money Input</h3>
        <div className="grid gap-8">
          {/* Basic Money Input */}
          <div className="space-y-2">
            <Label className="text-lg">Basic</Label>
            <div className="relative">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-6xl text-muted-foreground">
                $
              </span>
              <InputMoney
                placeholder="0.00"
                className="pl-8 text-center"
                defaultValue="1,234.56"
              />
            </div>
          </div>

          {/* Large Amount */}
          <div className="space-y-2">
            <Label className="text-lg">Large Amount</Label>
            <div className="relative">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-6xl text-muted-foreground">
                $
              </span>
              <InputMoney
                placeholder="0.00"
                className="pl-8 text-center"
                defaultValue="1,234,567.89"
              />
            </div>
          </div>

          {/* With Description */}
          <div className="space-y-2">
            <Label className="text-lg">With Description</Label>
            <div className="relative">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-6xl text-muted-foreground">
                $
              </span>
              <InputMoney
                placeholder="0.00"
                className="pl-8 text-center"
                defaultValue="99.99"
              />
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Enter amount in USD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Input with Form Context
export const FormInput: StoryObj<typeof Input> = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          className={cn(
            // Show success styles
            "focus:ring-green-500 focus:border-green-500",
          )}
        />
        <p className="text-sm text-green-500">Email is valid</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          className={cn(
            // Show error styles
            "border-red-500 focus:ring-red-500",
          )}
        />
        <p className="text-sm text-red-500">Password is required</p>
      </div>
    </div>
  ),
};