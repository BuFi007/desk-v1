import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Mail, Plus, Settings, User } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A versatile button component with multiple style variants.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Individual stories for each variant
export const Default: Story = {
  render: () => <Button>Default</Button>,
};

export const AllVariants: Story = {
  name: "All Button Variants",
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Basic Variants */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Basic Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Custom Theme Variants */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Custom Theme Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="brutalism">Brutalism</Button>
          <Button variant="neutral">Neutral</Button>
          <Button variant="reverse">Reverse</Button>
          <Button variant="fito">Fito</Button>
          <Button variant="paez">Paez</Button>
          <Button variant="charly">Charly</Button>
        </div>
      </section>

      {/* Size Variations with Icons */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Size Variations</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="default">
            <Mail className="mr-2 h-4 w-4" />
            Default
          </Button>
          <Button size="xs">
            <Plus className="mr-2 h-3 w-3" />
            XSmall
          </Button>
          <Button size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Small
          </Button>
          <Button size="noPadding">noPadding</Button>
          <Button size="lg">
            <Mail className="mr-2 h-5 w-5" />
            Large
          </Button>
          <Button size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Icon Button Variations */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Icon Button Variations</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="icon" variant="default">
            <Mail className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary">
            <Settings className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline">
            <User className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* State Variations */}
      <section>
        <h3 className="text-lg font-semibold mb-4">States</h3>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled</Button>
          <Button disabled>
            <Mail className="mr-2 h-4 w-4" />
            Disabled with Icon
          </Button>
        </div>
      </section>
    </div>
  ),
};

// Individual stories for each variant for isolated testing
export const Secondary: Story = {
  render: () => <Button variant="secondary">Secondary</Button>,
};

export const Destructive: Story = {
  render: () => <Button variant="destructive">Destructive</Button>,
};

export const Outline: Story = {
  render: () => <Button variant="outline">Outline</Button>,
};

export const Ghost: Story = {
  render: () => <Button variant="ghost">Ghost</Button>,
};

export const Link: Story = {
  render: () => <Button variant="link">Link</Button>,
};

export const Brutalism: Story = {
  render: () => <Button variant="brutalism">Brutalism</Button>,
};

export const Fito: Story = {
  render: () => <Button variant="fito">Fito</Button>,
};

export const Paez: Story = {
  render: () => <Button variant="paez">Paez</Button>,
};

export const Charly: Story = {
  render: () => <Button variant="charly">Charly</Button>,
};