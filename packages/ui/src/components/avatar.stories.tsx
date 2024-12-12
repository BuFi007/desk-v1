import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import type { Meta, StoryObj } from "@storybook/react";
import { User } from "lucide-react";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An avatar component for user profile images with fallback support.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/ekmas.png" alt="@ekmas" />
      <AvatarFallback>EK</AvatarFallback>
    </Avatar>
  ),
};

export const AllVariants: Story = {
  name: "Avatar Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Sizes */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="flex flex-wrap items-end gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/ekmas.png" alt="@ekmas" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/ekmas.png" alt="@ekmas" />
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/ekmas.png" alt="@ekmas" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
        </div>
      </section>

      {/* Fallback Variations */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Fallback Variations</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar>
            <AvatarImage src="https://broken-link.jpg" alt="@broken" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://broken-link.jpg" alt="@broken" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://broken-link.jpg" alt="@broken" />
            <AvatarFallback className="bg-blue-500 text-white">TB</AvatarFallback>
          </Avatar>
        </div>
      </section>

      {/* Group Example */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Group Example</h3>
        <div className="flex -space-x-4">
          <Avatar className="border-2 border-background">
            <AvatarImage src="https://github.com/ekmas.png" alt="@ekmas" />
            <AvatarFallback>EK</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-background">
            <AvatarImage src="https://broken-link.jpg" alt="@user2" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-background">
            <AvatarImage src="https://broken-link.jpg" alt="@user3" />
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
        </div>
      </section>
    </div>
  ),
};