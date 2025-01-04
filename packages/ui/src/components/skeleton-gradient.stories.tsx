import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonGradient } from "./skeleton-gradient";
import { Loader2, Server, Database, BarChart } from "lucide-react";

const meta: Meta<typeof SkeletonGradient> = {
  title: "Components/SkeletonGradient",
  component: SkeletonGradient,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An animated gradient skeleton loader with customizable appearance.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SkeletonGradient>;

export const Default: Story = {
  render: () => (
    <div className="w-64 h-64">
      <SkeletonGradient />
    </div>
  ),
};

export const AllVariants: Story = {
  name: "Skeleton Gradient Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Standard Sizes */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Different Sizes</h3>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <div className="w-32 h-32">
            <SkeletonGradient />
          </div>
          <div className="w-48 h-48">
            <SkeletonGradient />
          </div>
          <div className="w-64 h-64">
            <SkeletonGradient />
          </div>
        </div>
      </section>

      {/* Context Examples */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Loading Context</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="w-full h-48 flex flex-col items-center justify-center">
            <div className="mb-2">
              <Loader2 className="h-6 w-6 text-gray-500" />
            </div>
            <span className="text-sm text-gray-600">User Data</span>
            <div className="w-40 h-32">
              <SkeletonGradient />
            </div>
          </div>

          <div className="w-full h-48 flex flex-col items-center justify-center">
            <div className="mb-2">
              <Server className="h-6 w-6 text-gray-500" />
            </div>
            <span className="text-sm text-gray-600">Server Status</span>
            <div className="w-40 h-32">
              <SkeletonGradient />
            </div>
          </div>

          <div className="w-full h-48 flex flex-col items-center justify-center">
            <div className="mb-2">
              <Database className="h-6 w-6 text-gray-500" />
            </div>
            <span className="text-sm text-gray-600">Database Load</span>
            <div className="w-40 h-32">
              <SkeletonGradient />
            </div>
          </div>

          <div className="w-full h-48 flex flex-col items-center justify-center">
            <div className="mb-2">
              <BarChart className="h-6 w-6 text-gray-500" />
            </div>
            <span className="text-sm text-gray-600">Analytics</span>
            <div className="w-40 h-32">
              <SkeletonGradient />
            </div>
          </div>
        </div>
      </section>

      {/* Custom Gradient Variations */}
      <section>
        <h3 className="text-lg font-semibold mb-4">
          Custom Gradient Possibilities
        </h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="w-48 h-48">
            <SkeletonGradient className="bg-gradient-to-br from-green-300 via-yellow-300 to-pink-300" />
          </div>
          <div className="w-48 h-48">
            <SkeletonGradient className="bg-gradient-to-br from-purple-300 via-red-300 to-orange-300" />
          </div>
          <div className="w-48 h-48">
            <SkeletonGradient className="bg-gradient-to-br from-indigo-300 via-cyan-300 to-emerald-300" />
          </div>
        </div>
      </section>

      {/* Responsive Example */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Responsive Loading</h3>
        <div className="w-full min-h-[300px] border rounded-lg p-4 flex items-center justify-center">
          <div className="w-full h-full">
            <SkeletonGradient />
          </div>
        </div>
      </section>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    className: "w-64 h-64",
  },
};
