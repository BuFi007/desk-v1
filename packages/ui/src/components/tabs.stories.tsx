import type { Meta, StoryObj } from "@storybook/react";
import {
  Tabs,
  TabsList,
  TabsListAlt,
  TabsTrigger,
  TabsContent,
  TabsTriggerAlt,
  TabsTriggerRight,
} from "./tabs";
import {
  User,
  Settings,
  Bell,
  CreditCard,
  Workflow,
  Shield,
  Lock,
  Palette,
} from "lucide-react";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible tab component with multiple styling and layout options.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Manage your account settings</TabsContent>
      <TabsContent value="password">Change your password</TabsContent>
      <TabsContent value="team">Manage your team members</TabsContent>
    </Tabs>
  ),
};

export const AllVariants: Story = {
  name: "Tabs Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6 space-y-6">
      {/* Default Tabs */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Default Tabs</h3>
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-4">
            <div className="flex items-center space-x-4">
              <User className="h-6 w-6" />
              <h4 className="text-md font-semibold">User Profile</h4>
            </div>
            <p>Manage your personal information and preferences.</p>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <div className="flex items-center space-x-4">
              <Settings className="h-6 w-6" />
              <h4 className="text-md font-semibold">Application Settings</h4>
            </div>
            <p>Customize your application experience.</p>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6" />
              <h4 className="text-md font-semibold">
                Notification Preferences
              </h4>
            </div>
            <p>Manage how and when you receive notifications.</p>
          </TabsContent>
        </Tabs>
      </section>

      {/* Alternative Tabs Style */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Alternative Tabs Style</h3>
        <Tabs defaultValue="billing">
          <TabsListAlt>
            <TabsTriggerAlt value="billing">
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
            </TabsTriggerAlt>
            <TabsTriggerAlt value="security">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTriggerAlt>
            <TabsTriggerAlt value="integrations">
              <Workflow className="h-4 w-4" />
              <span>Integrations</span>
            </TabsTriggerAlt>
          </TabsListAlt>
          <TabsContent value="billing">
            Manage your billing information and payment methods.
          </TabsContent>
          <TabsContent value="security">
            Configure your account security settings.
          </TabsContent>
          <TabsContent value="integrations">
            Connect and manage third-party integrations.
          </TabsContent>
        </Tabs>
      </section>

      {/* Right Trigger Tabs */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Advanced Trigger Tabs</h3>
        <Tabs defaultValue="appearance">
          <TabsList className="grid grid-cols-3">
            <TabsTriggerRight value="appearance" position="left">
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTriggerRight>
            <TabsTriggerRight value="privacy">
              <Lock className="h-4 w-4 mr-2" />
              Privacy
            </TabsTriggerRight>
            <TabsTriggerRight value="advanced" position="right">
              <Settings className="h-4 w-4 mr-2" />
              Advanced
            </TabsTriggerRight>
          </TabsList>
          <TabsContent value="appearance">
            Customize the look and feel of your application.
          </TabsContent>
          <TabsContent value="privacy">
            Manage your privacy and data sharing preferences.
          </TabsContent>
          <TabsContent value="advanced">
            Configure advanced system settings.
          </TabsContent>
        </Tabs>
      </section>

      {/* Stacked Tabs */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Responsive Stacked Tabs</h3>
        <Tabs defaultValue="general">
          <TabsList stackBehavior="stacked">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            General system settings and preferences.
          </TabsContent>
          <TabsContent value="system">
            Advanced system configuration options.
          </TabsContent>
          <TabsContent value="network">
            Network and connectivity settings.
          </TabsContent>
        </Tabs>
      </section>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    defaultValue: "tab1",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1</TabsContent>
      <TabsContent value="tab2">Content for Tab 2</TabsContent>
      <TabsContent value="tab3">Content for Tab 3</TabsContent>
    </Tabs>
  ),
};

export const IconTabs: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <TabsList>
        <TabsTrigger value="home">
          <User className="h-4 w-4 mr-2" />
          Home
        </TabsTrigger>
        <TabsTrigger value="messages">
          <Bell className="h-4 w-4 mr-2" />
          Messages
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">Home content</TabsContent>
      <TabsContent value="messages">Messages content</TabsContent>
      <TabsContent value="settings">Settings content</TabsContent>
    </Tabs>
  ),
};
