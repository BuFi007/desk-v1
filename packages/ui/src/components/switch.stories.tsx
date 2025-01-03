import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";
import {
  Settings,
  Bell,
  Moon,
  Sun,
  Palette,
  CloudOff,
  Lock,
  Globe,
} from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A toggleable switch component for binary state selections.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => <Switch />,
};

export const AllVariants: Story = {
  name: "Switch Variations",
  render: () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [cloudSync, setCloudSync] = useState(false);
    const [publicProfile, setPublicProfile] = useState(false);

    return (
      <div className="flex flex-col gap-8 p-6 space-y-6">
        {/* Basic States */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Basic States</h3>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex items-center space-x-2">
              <span>Off</span>
              <Switch />
            </div>
            <div className="flex items-center space-x-2">
              <span>On</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center space-x-2">
              <span>Disabled</span>
              <Switch disabled />
            </div>
          </div>
        </section>

        {/* Contextual Usage */}
        <section>
          <h3 className="text-lg font-semibold mb-4">
            Contextual Applications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-4 bg-background border rounded-lg">
              <div className="flex items-center space-x-2">
                {darkMode ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
                <span>Dark Mode</span>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between p-4 bg-background border rounded-lg">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            {/* Cloud Sync */}
            <div className="flex items-center justify-between p-4 bg-background border rounded-lg">
              <div className="flex items-center space-x-2">
                {cloudSync ? (
                  <Globe className="h-5 w-5" />
                ) : (
                  <CloudOff className="h-5 w-5" />
                )}
                <span>Cloud Sync</span>
              </div>
              <Switch checked={cloudSync} onCheckedChange={setCloudSync} />
            </div>
          </div>
        </section>

        {/* Advanced Settings */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Profile Visibility */}
            <div className="flex items-center justify-between p-4 bg-background border rounded-lg">
              <div className="flex items-center space-x-2">
                {publicProfile ? (
                  <Globe className="h-5 w-5" />
                ) : (
                  <Lock className="h-5 w-5" />
                )}
                <div>
                  <span className="block text-sm font-medium">
                    Public Profile
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {publicProfile
                      ? "Visible to everyone"
                      : "Only visible to you"}
                  </span>
                </div>
              </div>
              <Switch
                checked={publicProfile}
                onCheckedChange={setPublicProfile}
              />
            </div>

            {/* System Settings */}
            <div className="flex items-center justify-between p-4 bg-background border rounded-lg">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <div>
                  <span className="block text-sm font-medium">
                    Advanced Settings
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Show advanced configuration options
                  </span>
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </section>

        {/* Form Integration */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Form Integration</h3>
          <div className="bg-background border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Custom Theme</span>
              </div>
              <Switch />
            </div>
            <div className="border-t pt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Email Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="border-t pt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Two-Factor Authentication</span>
              </div>
              <Switch />
            </div>
          </div>
        </section>
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    checked: true,
  },
};

export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 items-center">
      <div className="flex items-center space-x-2">
        <span>Disabled (Unchecked)</span>
        <Switch disabled />
      </div>
      <div className="flex items-center space-x-2">
        <span>Disabled (Checked)</span>
        <Switch disabled defaultChecked />
      </div>
    </div>
  ),
};
