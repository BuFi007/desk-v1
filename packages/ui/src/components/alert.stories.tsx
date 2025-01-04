import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Terminal, AlertCircle, Info, CheckCircle2 } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An alert component for displaying important messages.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Default Alert</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const AllVariants: Story = {
  name: "Alert Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6 max-w-2xl">
      {/* Variants */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Variants</h3>
        <div className="flex flex-col gap-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>
              This is a default alert with an informational message.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Alert</AlertTitle>
            <AlertDescription>
              Something went wrong! Please try again later.
            </AlertDescription>
          </Alert>
          {/* // create a success variant */}
          <Alert variant="default">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success Alert</AlertTitle>
            <AlertDescription>
              Your changes have been saved successfully.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Content Variations */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Content Variations</h3>
        <div className="flex flex-col gap-4">
          <Alert>
            <AlertTitle>Title Only Alert</AlertTitle>
          </Alert>

          <Alert>
            <AlertDescription>
              Description only alert without a title or icon.
            </AlertDescription>
          </Alert>

          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>With Custom Content</AlertTitle>
            <AlertDescription>
              <div className="mt-2">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  npm install @/components
                </code>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </section>
    </div>
  ),
};
