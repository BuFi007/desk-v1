import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";
import { Loader2, RefreshCw, RotateCcw, Download, Upload } from "lucide-react";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile loading spinner with configurable size and usage contexts.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "number", min: 8, max: 64, step: 4 },
      description: "Size of the spinner in pixels",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  render: () => <Spinner />,
};

export const AllVariants: Story = {
  name: "Spinner Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6 space-y-6">
      {/* Size Variations */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Size Variations</h3>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <div className="flex flex-col items-center">
            <Spinner size={16} />
            <span className="text-sm mt-2">Small (16px)</span>
          </div>
          <div className="flex flex-col items-center">
            <Spinner size={32} />
            <span className="text-sm mt-2">Medium (32px)</span>
          </div>
          <div className="flex flex-col items-center">
            <Spinner size={48} />
            <span className="text-sm mt-2">Large (48px)</span>
          </div>
        </div>
      </section>

      {/* Contextual Usage */}
      <section>
        <h3 className="text-lg font-semibold mb-4">
          Contextual Loading States
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Download Context */}
          <div className="flex flex-col items-center space-y-2 p-4 bg-background border rounded-lg">
            <Download className="h-6 w-6 text-muted-foreground" />
            <span>Downloading</span>
            <Spinner size={32} />
          </div>

          {/* Upload Context */}
          <div className="flex flex-col items-center space-y-2 p-4 bg-background border rounded-lg">
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span>Uploading</span>
            <Spinner size={32} />
          </div>

          {/* Refresh Context */}
          <div className="flex flex-col items-center space-y-2 p-4 bg-background border rounded-lg">
            <RefreshCw className="h-6 w-6 text-muted-foreground" />
            <span>Refreshing</span>
            <Spinner size={32} />
          </div>
        </div>
      </section>

      {/* Inline and Text Contexts */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Inline and Text Contexts</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span>Loading data</span>
            <Spinner size={16} />
          </div>
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 text-muted-foreground" />
            <span>Processing request</span>
            <Spinner size={16} />
          </div>
          <div className="flex items-center space-x-2">
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
            <span>Synchronizing</span>
            <Spinner size={16} />
          </div>
        </div>
      </section>

      {/* Layout Integration */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Layout Integration</h3>
        <div className="flex flex-col items-center justify-center p-6 bg-background border rounded-lg space-y-4">
          <div className="w-full max-w-md bg-muted p-4 rounded-md flex justify-between items-center">
            <span>Data Sync in Progress</span>
            <Spinner size={24} />
          </div>
          <div className="w-full max-w-md bg-muted p-4 rounded-md flex items-center justify-center">
            <Spinner size={32} />
          </div>
        </div>
      </section>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    size: 32,
  },
};

export const CustomSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Spinner size={16} />
      <Spinner size={24} />
      <Spinner size={32} />
      <Spinner size={48} />
      <Spinner size={64} />
    </div>
  ),
};
