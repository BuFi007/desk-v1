import { Badge } from "./badge";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A versatile badge component for status and labels.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: () => <Badge>Default</Badge>,
};

export const AllVariants: Story = {
  name: "Badge Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      <section>
        <h3 className="text-lg font-semibold mb-4">Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      {/* Common Use Cases */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Common Use Cases</h3>
        <div className="flex flex-wrap gap-4">
          <Badge>New</Badge>
          <Badge variant="secondary">In Progress</Badge>
          <Badge variant="destructive">Deprecated</Badge>
          <Badge variant="outline">Beta</Badge>
        </div>
      </section>

      {/* With Different Content */}
      <section>
        <h3 className="text-lg font-semibold mb-4">With Different Content</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge className="py-1">
            <span className="mr-1">●</span> Online
          </Badge>
          <Badge variant="secondary">
            Version 2.0.0
          </Badge>
          <Badge variant="outline" className="gap-2">
            <span className="h-2 w-2 bg-blue-500 rounded-full" />
            Running
          </Badge>
        </div>
      </section>
    </div>
  ),
};

export const Secondary: Story = {
  render: () => <Badge variant="secondary">Secondary</Badge>,
};

export const Destructive: Story = {
  render: () => <Badge variant="destructive">Destructive</Badge>,
};

export const Outline: Story = {
  render: () => <Badge variant="outline">Outline</Badge>,
};