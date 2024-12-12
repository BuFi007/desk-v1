import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";
import { User, Layout, ChevronRight, Star, Clipboard, Calendar } from "lucide-react";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible skeleton loader component for showing content placeholders.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => (
    <div className="w-64 h-32">
      <Skeleton />
    </div>
  ),
};

export const AllVariants: Story = {
  name: "Skeleton Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6 space-y-6">
      {/* Basic Shapes and Sizes */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Basic Shapes and Sizes</h3>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <div className="space-y-2 text-center">
            <div className="w-24 h-24"><Skeleton /></div>
            <span className="text-sm">Square</span>
          </div>
          <div className="space-y-2 text-center">
            <div className="w-24 h-12"><Skeleton /></div>
            <span className="text-sm">Rectangle</span>
          </div>
          <div className="space-y-2 text-center">
            <div className="w-24 h-24 rounded-full"><Skeleton className="rounded-full" /></div>
            <span className="text-sm">Circle</span>
          </div>
        </div>
      </section>

      {/* Component Loading States */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Component Loading States</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* User Profile Skeleton */}
          <div className="flex items-center space-x-4 p-4 bg-background border rounded-lg">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>

          {/* Card Skeleton */}
          <div className="p-4 bg-background border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="h-32 w-full" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>

          {/* List Item Skeleton */}
          <div className="p-4 bg-background border rounded-lg space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complex Layout Simulation */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Complex Layout Simulation</h3>
        <div className="bg-background border rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-1/4" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((card) => (
              <div key={card} className="space-y-3">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contextual Loading Examples */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Contextual Loading Examples</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center space-y-2">
            <User className="h-6 w-6 text-muted-foreground" />
            <Skeleton className="h-32 w-32" />
            <span className="text-sm">Profile</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Layout className="h-6 w-6 text-muted-foreground" />
            <Skeleton className="h-32 w-32" />
            <span className="text-sm">Dashboard</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Clipboard className="h-6 w-6 text-muted-foreground" />
            <Skeleton className="h-32 w-32" />
            <span className="text-sm">Reports</span>
          </div>
        </div>
      </section>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    className: "w-64 h-32",
  },
};

export const CustomSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Skeleton className="w-16 h-16" />
      <Skeleton className="w-32 h-8" />
      <Skeleton className="w-64 h-24" />
      <Skeleton className="w-full h-12" />
    </div>
  ),
};

export const RoundedVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Skeleton className="w-32 h-32 rounded-none" />
      <Skeleton className="w-32 h-32 rounded-md" />
      <Skeleton className="w-32 h-32 rounded-lg" />
      <Skeleton className="w-32 h-32 rounded-full" />
    </div>
  ),
};