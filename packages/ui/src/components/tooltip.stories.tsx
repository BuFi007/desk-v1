import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";
import {
  Info,
  HelpCircle,
  MousePointer,
  Save,
  Delete,
  Edit,
  Copy,
  Share2,
} from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible tooltip component for providing additional information on hover.",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Manually control tooltip visibility",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>This is a simple tooltip</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const AllVariants: Story = {
  name: "Tooltip Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6 space-y-6">
      {/* Positioning */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Tooltip Positioning</h3>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Top</Button>
              </TooltipTrigger>
              <TooltipContent side="top">Tooltip on top</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Right</Button>
              </TooltipTrigger>
              <TooltipContent side="right">Tooltip on right</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Left</Button>
              </TooltipTrigger>
              <TooltipContent side="left">Tooltip on left</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>

      {/* Contextual Usage */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Contextual Tooltips</h3>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <Info className="mr-2 h-4 w-4" />
                  Information
                </Button>
              </TooltipTrigger>
              <TooltipContent>Click for more details</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </Button>
              </TooltipTrigger>
              <TooltipContent>Need assistance? Click here</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <MousePointer className="mr-2 h-4 w-4" />
                  Interactions
                </Button>
              </TooltipTrigger>
              <TooltipContent>Learn about user interactions</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>

      {/* Action Tooltips */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Action Tooltips</h3>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save current changes</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="destructive">
                  <Delete className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Permanently delete item
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Modify current item</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>

      {/* Complex Tooltips */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Long Content Tooltips</h3>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-[200px]">
                  <h4 className="font-bold mb-1">Copy to Clipboard</h4>
                  <p className="text-xs">
                    Click to copy the current link. This will save the URL to
                    your clipboard.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-[250px]">
                  <h4 className="font-bold mb-1">Share Options</h4>
                  <p className="text-xs">
                    Quickly share this content across multiple platforms with a
                    single click.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    open: false,
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Playground Tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>Customize me in the controls panel</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const LongContentTooltip: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Long Content</Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px]">
          <div>
            <h4 className="font-bold mb-2">Detailed Tooltip Information</h4>
            <p className="text-xs">
              This is a comprehensive tooltip that demonstrates how longer
              content can be displayed while maintaining readability and visual
              appeal across different screen sizes.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
