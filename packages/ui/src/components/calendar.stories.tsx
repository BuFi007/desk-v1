import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./calendar";
import { useState } from "react";
import { addDays, isBefore, isToday } from "date-fns";
import {
  DateRange,
  SelectRangeEventHandler,
  SelectMultipleEventHandler,
} from "react-day-picker";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A calendar component with various selection modes and customization options.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Helper component for controlled selection
const ControlledCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return <Calendar selected={date} onSelect={setDate} />;
};

// Helper component for range selection
const RangeCalendar = () => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  const handleRangeSelect: SelectRangeEventHandler = (range) => {
    setRange(range);
  };

  return (
    <Calendar mode="range" selected={range} onSelect={handleRangeSelect} />
  );
};

// Helper component for multiple selection
const MultipleCalendar = () => {
  const [dates, setDates] = useState<Date[]>([
    new Date(),
    addDays(new Date(), 2),
  ]);

  const handleMultipleSelect: SelectMultipleEventHandler = (days) => {
    setDates(days || []);
  };

  return (
    <Calendar
      mode="multiple"
      selected={dates}
      onSelect={handleMultipleSelect}
    />
  );
};

export const Default: Story = {
  render: () => <Calendar />,
};

export const AllVariants: Story = {
  name: "Calendar Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Basic Calendar */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Single Selection</h3>
        <div className="flex flex-col items-center">
          <ControlledCalendar />
        </div>
      </section>

      {/* Range Selection */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Range Selection</h3>
        <div className="flex flex-col items-center">
          <RangeCalendar />
        </div>
      </section>

      {/* Multiple Selection */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Multiple Selection</h3>
        <div className="flex flex-col items-center">
          <MultipleCalendar />
        </div>
      </section>

      {/* Custom Styling */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Custom Styling</h3>
        <div className="flex flex-col items-center">
          <Calendar
            className="custom-calendar"
            modifiersStyles={{
              today: {
                fontWeight: "bold",
                textDecoration: "underline",
              },
            }}
          />
        </div>
      </section>

      {/* With Disabled Dates */}
      <section>
        <h3 className="text-lg font-semibold mb-4">With Disabled Dates</h3>
        <div className="flex flex-col items-center">
          <Calendar
            disabled={(date) => isBefore(date, new Date()) && !isToday(date)}
            defaultMonth={new Date()}
          />
        </div>
      </section>

      {/* Multiple Months */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Multiple Months</h3>
        <div className="flex flex-col items-center">
          <Calendar numberOfMonths={2} defaultMonth={new Date()} />
        </div>
      </section>

      {/* Footer Content */}
      <section>
        <h3 className="text-lg font-semibold mb-4">With Footer</h3>
        <div className="flex flex-col items-center">
          <Calendar
            footer={
              <div className="p-2 text-center text-sm text-muted-foreground">
                Click to select a date
              </div>
            }
          />
        </div>
      </section>
    </div>
  ),
};

// Individual variant stories
export const SingleSelect: Story = {
  render: () => <ControlledCalendar />,
};

export const RangeSelect: Story = {
  render: () => <RangeCalendar />,
};

export const MultipleSelect: Story = {
  render: () => <MultipleCalendar />,
};

export const DisabledDates: Story = {
  render: () => (
    <Calendar
      disabled={(date) => isBefore(date, new Date()) && !isToday(date)}
      defaultMonth={new Date()}
    />
  ),
};

export const TwoMonths: Story = {
  render: () => <Calendar numberOfMonths={2} defaultMonth={new Date()} />,
};

export const WithFooter: Story = {
  render: () => (
    <Calendar
      footer={
        <div className="p-2 text-center text-sm text-muted-foreground">
          Click a date to select it
        </div>
      }
    />
  ),
};
