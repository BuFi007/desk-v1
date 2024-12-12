import type { Meta, StoryObj } from "@storybook/react";
import { ShinyBadge } from "./shiny-badge";

const meta: Meta<typeof ShinyBadge> = {
  title: "Components/ShinyBadge",
  component: ShinyBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An animated badge component with shiny hover effects.",
      },
    },
  },
  argTypes: {
    text: {
      control: "text",
      description: "The text content of the badge",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;

// Basic usage
export const Default: StoryObj<typeof ShinyBadge> = {
  args: {
    text: "Hover me",
  },
};

// All variants showcase
export const AllVariants: StoryObj<typeof ShinyBadge> = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-6">
      {/* Basic Examples */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-center mb-4">Basic Examples</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <ShinyBadge text="New Feature" />
          <ShinyBadge text="Premium" />
          <ShinyBadge text="Try Now" />
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-center mb-4">Sizes</h3>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <ShinyBadge text="Small" className="scale-75" />
          <ShinyBadge text="Default" />
          <ShinyBadge text="Large" className="scale-125" />
        </div>
      </section>

      {/* Custom Colors */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-center mb-4">Custom Colors</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <ShinyBadge 
            text="Success"
            className="[&>span>span]:bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(74,222,128,0.6)_0%,rgba(74,222,128,0)_75%)] [&>span:last-child]:bg-gradient-to-r [&>span:last-child]:from-green-400/0 [&>span:last-child]:via-green-400/90 [&>span:last-child]:to-green-400/0"
          />
          <ShinyBadge 
            text="Warning"
            className="[&>span>span]:bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(234,179,8,0.6)_0%,rgba(234,179,8,0)_75%)] [&>span:last-child]:bg-gradient-to-r [&>span:last-child]:from-yellow-400/0 [&>span:last-child]:via-yellow-400/90 [&>span:last-child]:to-yellow-400/0"
          />
          <ShinyBadge 
            text="Error"
            className="[&>span>span]:bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(239,68,68,0.6)_0%,rgba(239,68,68,0)_75%)] [&>span:last-child]:bg-gradient-to-r [&>span:last-child]:from-red-400/0 [&>span:last-child]:via-red-400/90 [&>span:last-child]:to-red-400/0"
          />
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-center mb-4">With Custom Content</h3>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <ShinyBadge
            text={
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Online
              </span>
            }
          />
          <ShinyBadge
            text={
              <span className="flex items-center gap-2">
                ⭐ Premium
              </span>
            }
          />
          <ShinyBadge
            text={
              <span className="flex items-center gap-2">
                🚀 Boost
              </span>
            }
          />
        </div>
      </section>

      {/* Interactive Examples */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-center mb-4">Interactive Examples</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex flex-col items-center gap-2">
            <ShinyBadge text="Hover me slowly" />
            <span className="text-sm text-muted-foreground">See the shine effect</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShinyBadge 
              text="Click me"
              className="active:scale-95 transition-transform"
            />
            <span className="text-sm text-muted-foreground">With click effect</span>
          </div>
        </div>
      </section>

      {/* Group Example */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-center mb-4">Group Example</h3>
        <div className="inline-flex flex-col items-center gap-2 border rounded-lg p-4">
          <ShinyBadge text="Pro Features" />
          <div className="text-sm text-muted-foreground space-y-2">
            <p>✓ Custom Themes</p>
            <p>✓ Priority Support</p>
            <p>✓ Advanced Analytics</p>
          </div>
        </div>
      </section>
    </div>
  ),
};

// Playground
export const Playground: StoryObj<typeof ShinyBadge> = {
  args: {
    text: "Customize me",
    className: "scale-100",
  },
};

// Long text example
export const LongText: StoryObj<typeof ShinyBadge> = {
  args: {
    text: "This is a very long badge text that should wrap nicely",
    className: "max-w-xs",
  },
};
