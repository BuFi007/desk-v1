import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";
import { Icons } from "./icons";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A popover component for displaying floating content.",
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Popover> = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const AllVariants: StoryObj<typeof Popover> = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-6">
      {/* Basic Popover */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Popover</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button>Click me</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <h4 className="font-medium">Basic Popover</h4>
              <p className="text-sm text-muted-foreground">
                This is a basic popover with simple content.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </section>

      {/* Form in Popover */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Form in Popover</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Update dimensions</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    defaultValue="100%"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    defaultValue="25px"
                    className="col-span-2 h-8"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">With Icons</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Icons.Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <Icons.Person className="h-4 w-4" />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">Profile</h4>
                  <p className="text-sm text-muted-foreground">
                    Manage your profile settings.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icons.Notifications className="h-4 w-4" />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Manage your notification preferences.
                  </p>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </section>

      {/* Calendar Picker */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Calendar Picker</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Icons.Calendar className="mr-2 h-4 w-4" />
              Pick a date
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4">
              <div className="space-y-2">
                <h4 className="font-medium">Select Date</h4>
                <p className="text-sm text-muted-foreground">
                  Click to choose a date
                </p>
              </div>
              {/* Calendar would go here */}
            </div>
          </PopoverContent>
        </Popover>
      </section>

      {/* Different Positions */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Positions</h3>
        <div className="flex gap-4">
          {["top", "right", "bottom", "left"].map((position) => (
            <Popover key={position}>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {position.charAt(0).toUpperCase() + position.slice(1)}
                </Button>
              </PopoverTrigger>
              <PopoverContent side={position as any}>
                <p className="text-sm">
                  This popover is positioned to the {position}.
                </p>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </section>
    </div>
  ),
};

// Card-like Popover
export const CardPopover: StoryObj<typeof Popover> = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">View Details</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Project Details</h4>
            <p className="text-sm text-muted-foreground">
              View your project information and settings.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Icons.Settings className="h-4 w-4" />
              <span className="text-sm">Project Settings</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.Person className="h-4 w-4" />
              <span className="text-sm">Collaborators</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.FileDocument className="h-4 w-4" />
              <span className="text-sm">Documents</span>
            </div>
          </div>
          <hr className="border-t" />
          <Button size="sm">View All</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};