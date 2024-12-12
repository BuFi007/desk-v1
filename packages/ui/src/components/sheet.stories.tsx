import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";
import { ScrollArea } from "./scroll-area";
import { ChevronRight } from "lucide-react";

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A sheet component for displaying content in a sliding panel.",
      },
    },
  },
};

export default meta;

// Basic sheet example
export const Default: StoryObj<typeof Sheet> = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a basic sheet dialog for displaying content.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

// All position variants
export const AllVariants: StoryObj<typeof Sheet> = {
  render: () => (
    <div className="flex items-center gap-4">
      {["top", "right", "bottom", "left"].map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">Open {side}</Button>
          </SheetTrigger>
          <SheetContent side={side as any}>
            <SheetHeader>
              <SheetTitle>Sheet from {side}</SheetTitle>
              <SheetDescription>
                This sheet slides in from the {side}.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};

// Profile edit example
export const ProfileEdit: StoryObj<typeof Sheet> = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value="John Doe"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value="@johndoe"
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// Cart example
export const ShoppingCart: StoryObj<typeof Sheet> = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Cart</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>You have 3 items in your cart</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[70vh] my-4 pr-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-4">
              <div className="h-16 w-16 rounded-md bg-muted" />
              <div className="flex-1 space-y-1">
                <h4 className="font-medium">Product {i + 1}</h4>
                <p className="text-sm text-muted-foreground">
                  Product description
                </p>
                <div className="text-sm font-medium">$99.99</div>
              </div>
              <Button variant="ghost" size="icon">
                ×
              </Button>
            </div>
          ))}
        </ScrollArea>
        <SheetFooter className="border-t pt-4">
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span className="font-medium">$299.97</span>
            </div>
            <Button className="w-full">Checkout</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// Settings panel
export const SettingsPanel: StoryObj<typeof Sheet> = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Settings</Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Configure your preferences</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="space-y-4">
            {[
              "Account",
              "Notifications",
              "Appearance",
              "Security",
              "Help",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between py-2 cursor-pointer hover:bg-accent rounded-md px-2"
              >
                <span>{item}</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            ))}
          </div>
        </div>
        <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <Button variant="outline" className="w-full">
            Log out
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// Mobile menu
export const MobileMenu: StoryObj<typeof Sheet> = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Menu</Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80vw] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="grid gap-2 py-6">
          {[
            "Home",
            "About",
            "Products",
            "Contact",
            "Blog",
            "Careers",
          ].map((item) => (
            <div
              key={item}
              className="px-4 py-2 hover:bg-accent rounded-md cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
        <SheetFooter className="grid gap-2">
          <Button variant="outline">Sign In</Button>
          <Button>Create Account</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};