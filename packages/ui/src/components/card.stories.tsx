import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import {
  Settings,
  MoreHorizontal,
  ExternalLink,
  Heart,
  Share2,
} from "lucide-react";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile card component that can be used to display content in a contained way.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const AllVariants: Story = {
  name: "Card Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Simple Card */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Simple Card</h3>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Your last deployment was 3 days ago. Check your metrics below.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">View Dashboard</Button>
          </CardFooter>
        </Card>
      </section>

      {/* Feature Card */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Feature Card</h3>
        <Card className="w-[350px]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <CardTitle>Settings</CardTitle>
            </div>
            <CardDescription>Manage your account preferences.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Notifications</span>
                <span className="text-xs text-muted-foreground">
                  Receive updates about your account
                </span>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Privacy</span>
                <span className="text-xs text-muted-foreground">
                  Manage your privacy settings
                </span>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              View all settings
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Minimal Card */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Minimal Card</h3>
        <Card className="w-[350px]">
          <CardContent className="pt-6">
            <p className="text-center">
              Sometimes you just need a simple card.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
        <CardDescription>A basic card example</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is a simple card with basic content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>With Footer</CardTitle>
        <CardDescription>A card with a footer</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has a footer with actions.</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card className="w-[350px] hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>This card has hover effects</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hover over this card to see the shadow effect.</p>
      </CardContent>
    </Card>
  ),
};
