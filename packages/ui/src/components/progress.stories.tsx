import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";
import { useState, useEffect } from "react";
import { Label } from "./label";
import { Button } from "./button";
import { Icons } from "./icons";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A progress indicator component that shows the completion status of a task or process.",
      },
    },
  },
};

export default meta;

// Basic progress bar
export const Default: StoryObj<typeof Progress> = {
  render: () => <Progress value={60} className="w-[60%]" />,
};

// Progress with animation
const AnimatedProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-[60%]" />;
};

export const Animated: StoryObj<typeof Progress> = {
  render: () => <AnimatedProgress />,
};

// Progress with all variants
export const AllVariants: StoryObj<typeof Progress> = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const startLoading = () => {
      setLoading(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    };

    return (
      <div className="flex flex-col gap-8 p-6 w-[600px]">
        {/* Basic Progress */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Progress</h3>
          <div className="space-y-2">
            <Progress value={33} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0%</span>
              <span>33%</span>
              <span>100%</span>
            </div>
          </div>
        </section>

        {/* Progress States */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Progress States</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Starting (0%)</Label>
              <Progress value={0} />
            </div>
            <div className="space-y-2">
              <Label>In Progress (45%)</Label>
              <Progress value={45} />
            </div>
            <div className="space-y-2">
              <Label>Almost Done (80%)</Label>
              <Progress value={80} />
            </div>
            <div className="space-y-2">
              <Label>Complete (100%)</Label>
              <Progress value={100} />
            </div>
          </div>
        </section>

        {/* Interactive Progress */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Interactive Progress</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Uploading Files...</Label>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={startLoading}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Icons.Refresh className="mr-2 h-4 w-4 animate-spin" />
                      Uploading
                    </>
                  ) : (
                    "Start Upload"
                  )}
                </Button>
                {progress === 100 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setProgress(0)}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Custom Styles */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Custom Styles</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Success</Label>
              <Progress 
                value={66} 
                className="bg-green-100 dark:bg-green-900/20"
              >
                <div className="bg-green-500 h-full transition-all" />
              </Progress>
            </div>
            <div className="space-y-2">
              <Label>Warning</Label>
              <Progress 
                value={33} 
                className="bg-yellow-100 dark:bg-yellow-900/20"
              >
                <div className="bg-yellow-500 h-full transition-all" />
              </Progress>
            </div>
            <div className="space-y-2">
              <Label>Error</Label>
              <Progress 
                value={45} 
                className="bg-red-100 dark:bg-red-900/20"
              >
                <div className="bg-red-500 h-full transition-all" />
              </Progress>
            </div>
          </div>
        </section>

        {/* Different Sizes */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Sizes</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Small</Label>
              <Progress value={50} className="h-1" />
            </div>
            <div className="space-y-2">
              <Label>Default</Label>
              <Progress value={50} />
            </div>
            <div className="space-y-2">
              <Label>Large</Label>
              <Progress value={50} className="h-3" />
            </div>
          </div>
        </section>
      </div>
    );
  },
};

// Indeterminate progress
export const Indeterminate: StoryObj<typeof Progress> = {
  render: () => (
    <div className="space-y-2 w-[300px]">
      <Label>Loading...</Label>
      <Progress className="animate-pulse" value={null} />
    </div>
  ),
};

// File upload progress example
export const FileUpload: StoryObj<typeof Progress> = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"idle" | "uploading" | "complete">("idle");

    const startUpload = () => {
      setStatus("uploading");
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus("complete");
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    };

    return (
      <div className="w-[400px] space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>document.pdf</Label>
            <span className="text-sm text-muted-foreground">
              {status === "complete" ? "Completed" : `${progress}%`}
            </span>
          </div>
          <Progress value={progress} />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={startUpload}
              disabled={status === "uploading"}
            >
              {status === "uploading" ? (
                <>
                  <Icons.Refresh className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : status === "complete" ? (
                <>
                  <Icons.Check className="mr-2 h-4 w-4" />
                  Complete
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  },
};