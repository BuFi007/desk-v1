import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";
import {
  Edit,
  MessageSquare,
  AlignLeft,
  FileText,
  Send,
  Clipboard,
} from "lucide-react";
import { useState } from "react";
import { Label } from "./label";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible textarea component for multi-line text input.",
      },
    },
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the textarea",
    },
    disabled: {
      control: "boolean",
      description: "Disable the textarea",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: () => <Textarea placeholder="Enter your text here..." />,
};

export const AllVariants: Story = {
  name: "Textarea Variations",
  render: () => {
    const [comment, setComment] = useState("");
    const [feedbackLength, setFeedbackLength] = useState(0);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
      setFeedbackLength(e.target.value.length);
    };

    return (
      <div className="flex flex-col gap-8 p-6 space-y-6">
        {/* Basic Input States */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Basic Input States</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Default Textarea</Label>
              <Textarea placeholder="Enter your text here..." />
            </div>
            <div>
              <Label>Disabled Textarea</Label>
              <Textarea placeholder="This textarea is disabled" disabled />
            </div>
          </div>
        </section>

        {/* Contextual Usage */}
        <section>
          <h3 className="text-lg font-semibold mb-4">
            Contextual Input Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Feedback Form */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <Label>Feedback</Label>
              </div>
              <div className="relative">
                <Textarea
                  placeholder="Share your feedback..."
                  value={comment}
                  onChange={handleCommentChange}
                  maxLength={500}
                />
                <div className="text-xs text-muted-foreground absolute bottom-2 right-2">
                  {feedbackLength}/500
                </div>
              </div>
            </div>

            {/* Support Ticket */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <Label>Support Ticket</Label>
              </div>
              <Textarea
                placeholder="Describe your issue in detail..."
                rows={5}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Edit className="h-5 w-5 text-muted-foreground" />
                <Label>Personal Notes</Label>
              </div>
              <Textarea
                placeholder="Write your notes here..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        </section>

        {/* Advanced Input Scenarios */}
        <section>
          <h3 className="text-lg font-semibold mb-4">
            Advanced Input Scenarios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Copy-Paste Scenario */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clipboard className="h-5 w-5 text-muted-foreground" />
                <Label>Copy-Paste Area</Label>
              </div>
              <Textarea
                placeholder="Paste your content here..."
                className="min-h-[150px]"
              />
            </div>

            {/* Message Composition */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Send className="h-5 w-5 text-muted-foreground" />
                <Label>Compose Message</Label>
              </div>
              <Textarea placeholder="Write your message..." rows={6} />
            </div>
          </div>
        </section>

        {/* Resizing Behavior */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Resizing Behavior</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Default (No Resize)</Label>
              <Textarea
                placeholder="Cannot be resized"
                className="resize-none"
              />
            </div>
            <div>
              <Label>Vertical Resize</Label>
              <Textarea placeholder="Resize vertically" className="resize-y" />
            </div>
            <div>
              <Label>Horizontal Resize</Label>
              <Textarea
                placeholder="Resize horizontally"
                className="resize-x"
              />
            </div>
          </div>
        </section>
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    placeholder: "Enter your text...",
    rows: 4,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Textarea placeholder="Small textarea" className="min-h-[80px]" />
      <Textarea placeholder="Medium textarea" className="min-h-[120px]" />
      <Textarea placeholder="Large textarea" className="min-h-[200px]" />
    </div>
  ),
};
