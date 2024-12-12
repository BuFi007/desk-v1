import type { Meta, StoryObj } from "@storybook/react";
import { 
  ToastProvider, 
  ToastViewport, 
  Toast, 
  ToastTitle, 
  ToastDescription, 
  ToastClose, 
  ToastAction 
} from "./toast";
import { 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  XCircle, 
  Send, 
  Save 
} from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible toast notification component with multiple variants and interactions.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select', options: ['default', 'destructive'] },
      description: 'Visual style of the toast',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Toast>
        <div className="flex items-center space-x-4">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <div>
            <ToastTitle>Notification Title</ToastTitle>
            <ToastDescription>This is a default toast message.</ToastDescription>
          </div>
          <ToastClose />
        </div>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const AllVariants: Story = {
  name: "Toast Variations",
  render: () => {
    const [toastType, setToastType] = useState<'success' | 'warning' | 'error' | 'info'>('success');

    const renderToast = () => {
      switch (toastType) {
        case 'success':
          return (
            <Toast variant="default">
              <div className="flex items-center space-x-4">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <ToastTitle>Success</ToastTitle>
                  <ToastDescription>Your action was completed successfully.</ToastDescription>
                </div>
                <ToastClose />
              </div>
            </Toast>
          );
        case 'warning':
          return (
            <Toast variant="destructive">
              <div className="flex items-center space-x-4">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <ToastTitle>Warning</ToastTitle>
                  <ToastDescription>Proceed with caution. Potential risks detected.</ToastDescription>
                </div>
                <ToastClose />
              </div>
            </Toast>
          );
        case 'error':
          return (
            <Toast variant="destructive">
              <div className="flex items-center space-x-4">
                <XCircle className="h-5 w-5 text-red-500" />
                <div>
                  <ToastTitle>Error</ToastTitle>
                  <ToastDescription>An error occurred. Please try again.</ToastDescription>
                </div>
                <ToastClose />
              </div>
            </Toast>
          );
        case 'info':
          return (
            <Toast variant="default">
              <div className="flex items-center space-x-4">
                <Info className="h-5 w-5 text-blue-500" />
                <div>
                  <ToastTitle>Information</ToastTitle>
                  <ToastDescription>Here's some important information for you.</ToastDescription>
                </div>
                <ToastClose />
              </div>
            </Toast>
          );
      }
    };

    return (
      <div className="flex flex-col gap-8 p-6 space-y-6">
        {/* Toast Types */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Toast Types</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => setToastType('success')}
            >
              Success Toast
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setToastType('warning')}
            >
              Warning Toast
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setToastType('error')}
            >
              Error Toast
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setToastType('info')}
            >
              Info Toast
            </Button>
          </div>

          <ToastProvider>
            {renderToast()}
            <ToastViewport />
          </ToastProvider>
        </section>

        {/* Advanced Toast Scenarios */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Advanced Toast Scenarios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Toast with Action */}
            <ToastProvider>
              <Toast>
                <div className="flex items-center space-x-4">
                  <Send className="h-5 w-5 text-indigo-500" />
                  <div>
                    <ToastTitle>Message Sent</ToastTitle>
                    <ToastDescription>Your message has been sent successfully.</ToastDescription>
                  </div>
                  <ToastAction altText="Undo">
                    Undo
                  </ToastAction>
                  <ToastClose />
                </div>
              </Toast>
              <ToastViewport />
            </ToastProvider>

            {/* Destructive Toast with Action */}
            <ToastProvider>
              <Toast variant="destructive">
                <div className="flex items-center space-x-4">
                  <Save className="h-5 w-5 text-red-500" />
                  <div>
                    <ToastTitle>Unsaved Changes</ToastTitle>
                    <ToastDescription>You have unsaved changes.</ToastDescription>
                  </div>
                  <ToastAction altText="Save">
                    Save
                  </ToastAction>
                  <ToastClose />
                </div>
              </Toast>
              <ToastViewport />
            </ToastProvider>
          </div>
        </section>
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <ToastProvider>
      <Toast {...args}>
        <div className="flex items-center space-x-4">
          <Info className="h-5 w-5" />
          <div>
            <ToastTitle>Customizable Toast</ToastTitle>
            <ToastDescription>Modify me in the controls panel</ToastDescription>
          </div>
          <ToastClose />
        </div>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const LongContentToast: Story = {
  render: () => (
    <ToastProvider>
      <Toast>
        <div className="flex items-center space-x-4">
          <Info className="h-5 w-5" />
          <div>
            <ToastTitle>Long Content Toast Notification</ToastTitle>
            <ToastDescription>
              This is a very long toast message that demonstrates how the component 
              handles multiple lines of text. It will wrap and ensure readability 
              across different screen sizes.
            </ToastDescription>
          </div>
          <ToastClose />
        </div>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};