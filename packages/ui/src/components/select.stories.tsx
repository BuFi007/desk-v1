import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "./select";
import {
  User,
  Globe,
  CreditCard,
  Settings,
  Package,
  LogIn,
  MapPin,
} from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible select component with multiple configuration options.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const AllVariants: Story = {
  name: "Select Variations",
  render: () => {
    const [country, setCountry] = useState("");
    const [account, setAccount] = useState("");

    return (
      <div className="flex flex-col gap-8 p-6 space-y-6">
        {/* Basic Select */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Basic Select</h3>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Contextual Selects */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Contextual Selects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Country Select */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <label>Country</label>
              </div>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>North America</SelectLabel>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Europe</SelectLabel>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Account Type Select */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <label>Account Type</label>
              </div>
              <Select value={account} onValueChange={setAccount}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Advanced Select */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Advanced Select</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* User Role Select */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <label>User Role</label>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Admin Roles</SelectLabel>
                    <SelectItem value="superadmin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>User Roles</SelectLabel>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Shipping Method Select */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                <label>Shipping Method</label>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select shipping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Shipping</SelectItem>
                  <SelectItem value="express">Express Shipping</SelectItem>
                  <SelectItem value="overnight">Overnight Shipping</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Disabled and Grouped Selects */}
        <section>
          <h3 className="text-lg font-semibold mb-4">
            Disabled and Grouped Selects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <label>Preferences</label>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Display</SelectLabel>
                    <SelectItem value="light">Light Mode</SelectItem>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Accessibility</SelectLabel>
                    <SelectItem value="high-contrast">High Contrast</SelectItem>
                    <SelectItem value="screen-reader" disabled>
                      Screen Reader (Coming Soon)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <label>Timezone</label>
              </div>
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">EST</SelectItem>
                  <SelectItem value="pst">PST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    defaultValue: "",
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const GroupedSelect: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a team" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Engineering</SelectLabel>
          <SelectItem value="frontend">Frontend</SelectItem>
          <SelectItem value="backend">Backend</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Design</SelectLabel>
          <SelectItem value="ux">UX Design</SelectItem>
          <SelectItem value="ui">UI Design</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
