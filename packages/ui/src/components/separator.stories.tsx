import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";
import { cn } from "../utils";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A visual divider that separates content with a line.",
      },
    },
  },
};

export default meta;

// Basic separator
export const Default: StoryObj<typeof Separator> = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>Above</div>
      <Separator />
      <div>Below</div>
    </div>
  ),
};

// All variants showcase
export const AllVariants: StoryObj<typeof Separator> = {
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Horizontal Separators */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Horizontal Separators</h3>
        <div className="space-y-4">
          {/* Default */}
          <div className="space-y-4">
            <div>Default Separator</div>
            <Separator />
            <div>Content Below</div>
          </div>

          {/* With Text */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-2 text-muted-foreground text-sm">
                or continue with
              </span>
            </div>
          </div>

          {/* Custom Styles */}
          <div className="space-y-4">
            <Separator className="bg-primary" />
            <Separator className="bg-destructive" />
            <Separator className="bg-blue-500 h-0.5" />
            <Separator className="border-t border-dashed border-primary bg-transparent" />
          </div>
        </div>
      </section>

      {/* Vertical Separators */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Vertical Separators</h3>
        <div className="flex h-6 items-center space-x-4">
          <span>Item 1</span>
          <Separator orientation="vertical" />
          <span>Item 2</span>
          <Separator orientation="vertical" />
          <span>Item 3</span>
        </div>
      </section>

      {/* In Lists */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">In Lists</h3>
        <div className="space-y-2">
          <div className="px-4">List Item 1</div>
          <Separator />
          <div className="px-4">List Item 2</div>
          <Separator />
          <div className="px-4">List Item 3</div>
        </div>
      </section>

      {/* In Cards */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">In Cards</h3>
        <div className="rounded-lg border p-4 space-y-4 w-[300px]">
          <div className="font-medium">Card Title</div>
          <Separator />
          <div className="text-sm text-muted-foreground">
            Card content goes here with a nice separator above.
          </div>
        </div>
      </section>

      {/* Menu Example */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Menu Example</h3>
        <div className="w-[200px] space-y-2">
          <div className="px-4 py-2 hover:bg-accent rounded-md cursor-pointer">
            Profile
          </div>
          <Separator />
          <div className="px-4 py-2 hover:bg-accent rounded-md cursor-pointer">
            Settings
          </div>
          <Separator />
          <div className="px-4 py-2 hover:bg-accent rounded-md cursor-pointer text-destructive">
            Logout
          </div>
        </div>
      </section>

      {/* Content Groups */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Content Groups</h3>
        <div className="space-y-4 w-[300px]">
          <div className="space-y-2">
            <h4 className="font-medium">Section 1</h4>
            <p className="text-sm text-muted-foreground">
              Content for section 1
            </p>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <h4 className="font-medium">Section 2</h4>
            <p className="text-sm text-muted-foreground">
              Content for section 2
            </p>
          </div>
        </div>
      </section>
    </div>
  ),
};

// Vertical use case
export const Vertical: StoryObj<typeof Separator> = {
  render: () => (
    <div className="flex h-10 items-center space-x-4">
      <div>First</div>
      <Separator orientation="vertical" />
      <div>Second</div>
      <Separator orientation="vertical" />
      <div>Third</div>
    </div>
  ),
};

// With text overlay
export const WithText: StoryObj<typeof Separator> = {
  render: () => (
    <div className="relative w-[300px]">
      <div className="absolute inset-0 flex items-center">
        <Separator />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
  ),
};
