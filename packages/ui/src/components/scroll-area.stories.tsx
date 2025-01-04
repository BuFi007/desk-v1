import type { Meta, StoryObj } from "@storybook/react";
import { cn } from "../utils";
import { ScrollArea } from "./scroll-area";
import { Separator } from "./separator";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A scrollable area component with custom scrollbars.",
      },
    },
  },
};

export default meta;

const tags = Array.from({ length: 50 }).map((_, i, a) => `Tag ${a.length - i}`);

export const Default: StoryObj<typeof ScrollArea> = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag} className="text-sm">
            {tag}
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// Example of chat/message list
const messages = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  sender: i % 2 === 0 ? "John Doe" : "Jane Smith",
  content: `This is message ${i + 1}. ${
    i % 3 === 0
      ? "It's a bit longer to demonstrate different message lengths."
      : ""
  }`,
  time: "12:00 PM",
}));

export const ChatList: StoryObj<typeof ScrollArea> = {
  render: () => (
    <ScrollArea className="h-96 w-80 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Chat</h4>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col rounded-lg p-3",
                message.id % 2 === 0
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted",
              )}
            >
              <p className="text-sm">{message.content}</p>
              <span className="mt-1 text-xs opacity-70">{message.time}</span>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
};

// Example with horizontal scroll
const imageItems = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  title: `Image ${i + 1}`,
  description: `Description for image ${i + 1}`,
}));

export const HorizontalScroll: StoryObj<typeof ScrollArea> = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {imageItems.map((item) => (
          <div key={item.id} className="w-40 shrink-0">
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <div className="aspect-square rounded-md bg-muted"></div>
            <h4 className="mt-2 font-medium">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// Example with both scrollbars
export const BothScrollbars: StoryObj<typeof ScrollArea> = {
  render: () => (
    <ScrollArea className="h-72 w-96 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">
          Large Content Area
        </h4>
        <div className="w-[600px]">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={`section-${index + 1}`} className="mb-4">
              <h5 className="text-sm font-medium">Section {index + 1}</h5>
              <p className="text-sm text-muted-foreground">
                This is a long paragraph that will cause horizontal scrolling.
                It contains enough text to demonstrate both vertical and
                horizontal scrollbars working together.
              </p>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
};

// Card list example
const cards = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  title: `Card ${i + 1}`,
  description:
    "This is a card description that might need scrolling if it gets too long.",
  tags: ["Tag 1", "Tag 2", "Tag 3"],
}));

export const CardList: StoryObj<typeof ScrollArea> = {
  render: () => (
    <ScrollArea className="h-96 w-80 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Cards</h4>
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="rounded-lg border p-4">
              <h3 className="font-medium">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {card.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-2 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
};

// Menu example
const menuItems = [
  {
    heading: "Fruits",
    items: ["Apple", "Banana", "Orange", "Mango", "Pear"],
  },
  {
    heading: "Vegetables",
    items: ["Carrot", "Broccoli", "Spinach", "Potato", "Tomato"],
  },
  {
    heading: "Meat",
    items: ["Chicken", "Beef", "Pork", "Lamb", "Turkey"],
  },
  {
    heading: "Drinks",
    items: ["Water", "Coffee", "Tea", "Juice", "Soda"],
  },
];

export const MenuList: StoryObj<typeof ScrollArea> = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        {menuItems.map((section) => (
          <div key={section.heading} className="mb-4">
            <h4 className="mb-2 text-sm font-medium leading-none">
              {section.heading}
            </h4>
            {section.items.map((item) => (
              <div
                key={item}
                className="text-sm py-1 cursor-pointer hover:text-primary"
              >
                {item}
              </div>
            ))}
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
