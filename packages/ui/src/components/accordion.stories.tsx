import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Button } from "./button";
import { Badge } from "./badge";
import { Calendar, Settings, User, Bell, Shield } from "lucide-react";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An accordion component for organizing content in collapsible sections.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-[500px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const AllVariants: Story = {
  name: "Accordion Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Basic Example */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Basic Example</h3>
        <Accordion type="single" collapsible className="w-full max-w-[500px]">
          <AccordionItem value="item-1">
            <AccordionTrigger>Account Settings</AccordionTrigger>
            <AccordionContent>
              Manage your account preferences and settings.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Privacy</AccordionTrigger>
            <AccordionContent>
              Control your privacy and security settings.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Notifications</AccordionTrigger>
            <AccordionContent>
              Customize your notification preferences.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Rich Content */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Rich Content</h3>
        <Accordion type="single" collapsible className="w-full max-w-[500px]">
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex gap-2">
              <Calendar className="h-4 w-4" />
              <span>Upcoming Events</span>
              <Badge variant="secondary" className="ml-auto mr-4">New</Badge>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>Team Meeting</div>
                  <Badge>Today</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>Project Review</div>
                  <Badge variant="outline">Tomorrow</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View All Events
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="flex gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile Settings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Notification Preferences</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Privacy Controls</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Multiple Sections */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Multiple Sections</h3>
        <Accordion type="multiple" className="w-full max-w-[500px]">
          <AccordionItem value="item-1">
            <AccordionTrigger>Multiple sections can be open</AccordionTrigger>
            <AccordionContent>
              Yes. Just set the type prop to "multiple".
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can it be nested?</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="nested-1">
                  <AccordionTrigger>Nested Accordion</AccordionTrigger>
                  <AccordionContent>
                    This is a nested accordion item.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  ),
};