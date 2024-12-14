import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedSizeContainer } from "./animated-size-container";
import { Button } from "./button";
import { useState } from "react";

const meta: Meta<typeof AnimatedSizeContainer> = {
  title: "Components/AnimatedSizeContainer",
  component: AnimatedSizeContainer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A container that smoothly animates its size based on its content.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedSizeContainer>;

// Helper component to demonstrate expandable content
const ExpandableContent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <p className="p-4 bg-muted rounded-md">
        {isExpanded
          ? "This is a longer text that shows how the container animates to fit the content. It demonstrates the smooth transition when content size changes."
          : "Click the button below to see more content."}
      </p>
      <Button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Show Less" : "Show More"}
      </Button>
    </div>
  );
};

// Helper component for width animation
const WidthAnimation = () => {
  const [isWide, setIsWide] = useState(false);

  return (
    <div className="space-y-4">
      <div className={`bg-muted rounded-md p-4 ${isWide ? "w-[400px]" : "w-[200px]"}`}>
        <p>Resizable content</p>
      </div>
      <Button onClick={() => setIsWide(!isWide)}>
        {isWide ? "Shrink" : "Expand"}
      </Button>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <AnimatedSizeContainer height>
      <ExpandableContent />
    </AnimatedSizeContainer>
  ),
};

export const AllVariants: Story = {
  name: "AnimatedSizeContainer Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Height Animation */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Height Animation</h3>
        <div className="flex flex-col gap-4">
          <AnimatedSizeContainer height className="border-2 border-dashed border-muted rounded-md">
            <ExpandableContent />
          </AnimatedSizeContainer>
        </div>
      </section>

      {/* Width Animation */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Width Animation</h3>
        <div className="flex flex-col gap-4">
          <AnimatedSizeContainer width className="border-2 border-dashed border-muted rounded-md">
            <WidthAnimation />
          </AnimatedSizeContainer>
        </div>
      </section>

      {/* Both Width and Height */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Both Width and Height</h3>
        <AnimatedSizeContainer
          width
          height
          className="border-2 border-dashed border-muted rounded-md"
        >
          <ResizableContent />
        </AnimatedSizeContainer>
      </section>

      {/* Custom Transitions */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Custom Transitions</h3>
        <div className="flex flex-col gap-4">
          <AnimatedSizeContainer
            height
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="border-2 border-dashed border-muted rounded-md"
          >
            <ExpandableContent />
          </AnimatedSizeContainer>

          <AnimatedSizeContainer
            height
            transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            className="border-2 border-dashed border-muted rounded-md"
          >
            <ExpandableContent />
          </AnimatedSizeContainer>
        </div>
      </section>
    </div>
  ),
};

// Helper component for demonstrating both width and height animations
const ResizableContent = () => {
  const [size, setSize] = useState<"small" | "medium" | "large">("small");

  const sizes = {
    small: { width: "200px", height: "100px" },
    medium: { width: "300px", height: "150px" },
    large: { width: "400px", height: "200px" },
  };

  return (
    <div className="space-y-4">
      <div
        className="bg-muted rounded-md p-4 flex items-center justify-center"
        style={sizes[size]}
      >
        <p>Current size: {size}</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setSize("small")}
          disabled={size === "small"}
        >
          Small
        </Button>
        <Button
          variant="outline"
          onClick={() => setSize("medium")}
          disabled={size === "medium"}
        >
          Medium
        </Button>
        <Button
          variant="outline"
          onClick={() => setSize("large")}
          disabled={size === "large"}
        >
          Large
        </Button>
      </div>
    </div>
  );
};

// Individual stories for specific use cases
export const HeightOnly: Story = {
  render: () => (
    <AnimatedSizeContainer height className="border-2 border-dashed border-muted rounded-md">
      <ExpandableContent />
    </AnimatedSizeContainer>
  ),
};

export const WidthOnly: Story = {
  render: () => (
    <AnimatedSizeContainer width className="border-2 border-dashed border-muted rounded-md">
      <WidthAnimation />
    </AnimatedSizeContainer>
  ),
};

export const CustomSpringTransition: Story = {
  render: () => (
    <AnimatedSizeContainer
      height
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      className="border-2 border-dashed border-muted rounded-md"
    >
      <ExpandableContent />
    </AnimatedSizeContainer>
  ),
};