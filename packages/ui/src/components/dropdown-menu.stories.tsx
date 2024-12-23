import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./dropdown-menu";
import { Button } from "./button";
import { useState } from "react";
import { isMac } from "../hooks/use-is-mac";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A dropdown menu component with support for submenus, checkboxes, radio groups, and keyboard shortcuts.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

// Basic dropdown menu component
const BasicDropdownMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button>Open Menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>
        New Tab
        <DropdownMenuShortcut>
          <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>
          <span className="text-xs">T</span>
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        New Window
        <DropdownMenuShortcut>
          <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>
          <span className="text-xs">N</span>
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        Settings
        <DropdownMenuShortcut>
          <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>
          <span className="text-xs">,</span>
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const Default: Story = {
  render: () => <BasicDropdownMenu />,
};

// Helper component for complex example
const ComplexDropdownMenu = () => {
  const [showStatus, setShowStatus] = useState(true);
  const [position, setPosition] = useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Complex Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Save As...</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuItem>Print</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatus}
          onCheckedChange={setShowStatus}
        >
          Show Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuLabel>Position</DropdownMenuLabel>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const AllVariants: Story = {
  name: "Dropdown Menu Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Basic Usage */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Basic Usage</h3>
        <BasicDropdownMenu />
      </section>

      {/* Complex Menu */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Complex Menu</h3>
        <ComplexDropdownMenu />
      </section>

      {/* Checkbox Items */}
      <section>
        <h3 className="text-lg font-semibold mb-4">With Checkboxes</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>View Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked>
              Show Toolbar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Show Statusbar</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem disabled>
              Show Panels
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Radio Groups */}
      <section>
        <h3 className="text-lg font-semibold mb-4">With Radio Groups</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Select Size</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup defaultValue="medium">
              <DropdownMenuRadioItem value="small">Small</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="medium">
                Medium
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="large">Large</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* With Submenu */}
      <section>
        <h3 className="text-lg font-semibold mb-4">With Submenu</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Main Action</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>More Actions</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Action 1</DropdownMenuItem>
                <DropdownMenuItem>Sub Action 2</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Even More</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Deep Action</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </div>
  ),
};
