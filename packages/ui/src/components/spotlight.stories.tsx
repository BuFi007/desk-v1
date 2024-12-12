import type { Meta, StoryObj } from "@storybook/react";
import { Spotlight } from "./spotlight";
import { useState } from "react";
import { 
  Layers, 
  Wand2, 
  Palette, 
  Sparkles, 
  FocusIcon, 
  Lightbulb 
} from "lucide-react";

const meta: Meta<typeof Spotlight> = {
  title: "Components/Spotlight",
  component: Spotlight,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A dynamic SVG spotlight effect for highlighting and drawing attention.",
      },
    },
  },
  argTypes: {
    fill: {
      control: 'color',
      description: 'Color of the spotlight fill',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spotlight>;

export const Default: Story = {
  render: () => (
    <div className="relative w-full h-64 bg-white dark:bg-black">
      <Spotlight />
    </div>
  ),
};

export const AllVariants: Story = {
  name: "Spotlight Variations",
  render: () => {
    const [activeColor, setActiveColor] = useState('white');
    
    const colors = [
      { name: 'White', value: 'white' },
      { name: 'Blue', value: '#3b82f6' },
      { name: 'Purple', value: '#8b5cf6' },
      { name: 'Green', value: '#10b981' },
      { name: 'Red', value: '#ef4444' },
    ];

    return (
      <div className="flex flex-col gap-8 p-6 space-y-6">
        {/* Color Variations */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Color Variations</h3>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {colors.map((color) => (
              <div 
                key={color.name} 
                className="flex flex-col items-center space-y-2"
              >
                <div 
                  className="w-16 h-16 rounded-full cursor-pointer border-2 transition-all hover:scale-110"
                  style={{ 
                    backgroundColor: color.value,
                    borderColor: activeColor === color.value ? 'black' : 'transparent'
                  }}
                  onClick={() => setActiveColor(color.value)}
                />
                <span className="text-sm">{color.name}</span>
              </div>
            ))}
          </div>
          <div className="relative w-full h-64 mt-4 bg-white dark:bg-black overflow-hidden">
            <Spotlight fill={activeColor} />
          </div>
        </section>

        {/* Contextual Usage */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Contextual Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Design Highlight */}
            <div className="relative bg-white dark:bg-black p-6 rounded-lg border">
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="h-6 w-6 text-purple-500" />
                <h4 className="text-md font-semibold">Design Focus</h4>
              </div>
              <div className="relative h-48 rounded-md bg-gray-100 overflow-hidden">
                <Spotlight fill="#8b5cf6" className="opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-600">Design Element</span>
                </div>
              </div>
            </div>

            {/* Creative Inspiration */}
            <div className="relative bg-white dark:bg-black p-6 rounded-lg border">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                <h4 className="text-md font-semibold">Creative Spark</h4>
              </div>
              <div className="relative h-48 rounded-md bg-gray-100 overflow-hidden">
                <Spotlight fill="#fbbf24" className="opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-600">Inspiration Zone</span>
                </div>
              </div>
            </div>

            {/* Feature Highlight */}
            <div className="relative bg-white dark:bg-black p-6 rounded-lg border">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="h-6 w-6 text-blue-500" />
                <h4 className="text-md font-semibold">Feature Spotlight</h4>
              </div>
              <div className="relative h-48 rounded-md bg-gray-100 overflow-hidden">
                <Spotlight fill="#3b82f6" className="opacity-25" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-600">Key Feature</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Opacity and Intensity */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Opacity Variations</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative h-48 bg-white dark:bg-black rounded-lg overflow-hidden">
              <Spotlight fill="#10b981" className="opacity-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span>Low Intensity</span>
              </div>
            </div>
            <div className="relative h-48 bg-white dark:bg-black rounded-lg overflow-hidden">
              <Spotlight fill="#10b981" className="opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span>Medium Intensity</span>
              </div>
            </div>
            <div className="relative h-48 bg-white dark:bg-black rounded-lg overflow-hidden">
              <Spotlight fill="#10b981" className="opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span>High Intensity</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    fill: 'white',
    className: 'opacity-30',
  },
};

export const CustomColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <div className="relative w-64 h-48 bg-white dark:bg-black">
        <Spotlight fill="#ff6b6b" />
      </div>
      <div className="relative w-64 h-48 bg-white dark:bg-black">
        <Spotlight fill="#4ecdc4" />
      </div>
      <div className="relative w-64 h-48 bg-white dark:bg-black">
        <Spotlight fill="#a855f7" />
      </div>
    </div>
  ),
};