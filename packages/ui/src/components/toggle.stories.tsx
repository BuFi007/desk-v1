import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./toggle";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignCenter, 
  AlignLeft, 
  AlignRight, 
  Heart, 
  Star, 
  Lock, 
  Unlock 
} from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible toggle component with multiple variants and interactions.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select', options: ['default', 'outline'] },
      description: 'Visual style of the toggle',
    },
    size: {
      control: { type: 'select', options: ['sm', 'default', 'lg'] },
      description: 'Size of the toggle',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the toggle',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => <Toggle><Bold className="h-4 w-4" /></Toggle>,
};

export const AllVariants: Story = {
  name: "Toggle Variations",
  render: () => {
    const [activeStyles, setActiveStyles] = useState({
      bold: false,
      italic: false,
      underline: false,
      favorite: false,
    });

    return (
      <div className="flex flex-col gap-8 p-6 space-y-6">
        {/* Variant Styles */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Toggle Variants</h3>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="space-x-2">
              <Toggle variant="default">
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle variant="outline">
                <Italic className="h-4 w-4" />
              </Toggle>
            </div>
          </div>
        </section>

        {/* Text Formatting Toggles */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Text Formatting</h3>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Toggle
              pressed={activeStyles.bold}
              onPressedChange={(pressed) => 
                setActiveStyles(prev => ({ ...prev, bold: pressed }))
              }
            >
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={activeStyles.italic}
              onPressedChange={(pressed) => 
                setActiveStyles(prev => ({ ...prev, italic: pressed }))
              }
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={activeStyles.underline}
              onPressedChange={(pressed) => 
                setActiveStyles(prev => ({ ...prev, underline: pressed }))
              }
            >
              <Underline className="h-4 w-4" />
            </Toggle>
          </div>
        </section>

        {/* Alignment Toggles */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Alignment Toggles</h3>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Toggle variant="outline">
              <AlignLeft className="h-4 w-4" />
            </Toggle>
            <Toggle variant="outline">
              <AlignCenter className="h-4 w-4" />
            </Toggle>
            <Toggle variant="outline">
              <AlignRight className="h-4 w-4" />
            </Toggle>
          </div>
        </section>

        {/* Interactive Toggles */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Interactive Toggles</h3>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Toggle
              pressed={activeStyles.favorite}
              onPressedChange={(pressed) => 
                setActiveStyles(prev => ({ ...prev, favorite: pressed }))
              }
            >
              <Heart className={`h-4 w-4 ${activeStyles.favorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Toggle>
            <Toggle disabled>
              <Star className="h-4 w-4" />
            </Toggle>
          </div>
        </section>

        {/* Size Variations */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Toggle Sizes</h3>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Toggle size="sm">
              <Lock className="h-3 w-3" />
            </Toggle>
            <Toggle>
              <Lock className="h-4 w-4" />
            </Toggle>
            <Toggle size="lg">
              <Lock className="h-5 w-5" />
            </Toggle>
          </div>
        </section>

        {/* Security Toggles */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Security Toggles</h3>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Toggle variant="outline">
              <Lock className="h-4 w-4" />
            </Toggle>
            <Toggle variant="outline" disabled>
              <Unlock className="h-4 w-4" />
            </Toggle>
          </div>
        </section>
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: <Bold className="h-4 w-4" />,
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Toggle size="sm">
        <Bold className="h-3 w-3" />
      </Toggle>
      <Toggle size="default">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="lg">
        <Bold className="h-5 w-5" />
      </Toggle>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Toggle disabled>
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" disabled>
        <Italic className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};