import type { Meta, StoryObj } from "@storybook/react";
import { Icons } from "./icons";
import { cn } from "../utils";

const meta: Meta = {
  title: "Components/Icons",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A collection of icons used throughout the application.",
      },
    },
  },
};

export default meta;

type IconDisplayProps = {
  name: string;
  icon: any;
  size?: number;
  className?: string;
};

const IconDisplay = ({
  name,
  icon: Icon,
  size = 24,
  className,
}: IconDisplayProps) => (
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-accent transition-colors">
    <Icon className={cn("text-foreground", className)} size={size} />
    <span className="text-xs text-muted-foreground text-center">{name}</span>
  </div>
);

// Group icons by category
const iconCategories = {
  "Brand & Logos": {
    LogoSmall: Icons.LogoSmall,
    LogoIcon: Icons.LogoIcon,
    Logo: Icons.Logo,
    Github: Icons.Github,
    Discord: Icons.Discord,
    X: Icons.X,
    Apple: Icons.Apple,
    Google: Icons.Google,
    Slack: Icons.Slack,
    OpenAI: Icons.OpenAI,
  },
  Navigation: {
    Menu: Icons.Menu,
    ArrowLeft: Icons.ArrowLeft,
    ArrowRight: Icons.ArrowRight,
    ArrowUp: Icons.ArrowUp,
    ArrowDown: Icons.ArrowDown,
    ArrowBack: Icons.ArrowBack,
    ChevronLeft: Icons.ChevronLeft,
    ChevronRight: Icons.ChevronRight,
    ChevronUp: Icons.ChevronUp,
    ChevronDown: Icons.ChevronDown,
    KeyboardArrowDown: Icons.KeyboardArrowDown,
    KeyboardArrowUp: Icons.KeyboardArrowUp,
    KeyboardArrowLeft: Icons.KeyboardArrowLeft,
    KeyboardArrowRight: Icons.KeyboardArrowRight,
  },
  "Actions & Controls": {
    Add: Icons.Add,
    Remove: Icons.Remove,
    Close: Icons.Close,
    Search: Icons.Search,
    Refresh: Icons.Refresh,
    Settings: Icons.Settings,
    Edit: Icons.DashboardCustomize,
    Delete: Icons.Delete,
    Copy: Icons.Copy,
    Share: Icons.Share,
    Download: Icons.FileDownload,
    Upload: Icons.FileUpload,
  },
  "Files & Folders": {
    Folder: Icons.Folder,
    FolderSpecial: Icons.FolderSpecial,
    FolderZip: Icons.FolderZip,
    CreateNewFolder: Icons.CreateNewFolder,
    DriveFileMove: Icons.DriveFileMove,
    Description: Icons.Description,
    Pdf: Icons.Pdf,
  },
  "Media Controls": {
    Play: Icons.Play,
    PlayOutline: Icons.PlayOutline,
    Pause: Icons.Pause,
    PauseOutline: Icons.PauseOutline,
    PlayCircle: Icons.PlayCircle,
    PauseCircle: Icons.PauseCircle,
    Mute: Icons.Mute,
    UnMute: Icons.UnMute,
  },
  Status: {
    Error: Icons.Error,
    Security: Icons.Security,
    Pending: Icons.Pending,
    TrendingUp: Icons.TrendingUp,
    TrendingDown: Icons.TrendingDown,
    BrokenImage: Icons.BrokenImage,
    WorkInProgress: Icons.WorkInProgress,
  },
  Communication: {
    Email: Icons.Email,
    ChatBubble: Icons.ChatBubble,
    Notifications: Icons.Notifications,
    QuestionAnswer: Icons.QuestionAnswer,
    Forwarded: Icons.Forwarded,
  },
  "UI Elements": {
    MoreHoriz: Icons.MoreHoriz,
    MoreVertical: Icons.MoreVertical,
    Visibility: Icons.Visibility,
    Sort: Icons.Sort,
    Filter: Icons.Filter,
    Clear: Icons.Clear,
    Calendar: Icons.Calendar,
    CalendarMonth: Icons.CalendarMonth,
  },
  Features: {
    AI: Icons.AI,
    AIOutline: Icons.AIOutline,
    Tracker: Icons.Tracker,
    InboxCustomize: Icons.InboxCustomize,
    Transactions: Icons.Transactions,
    Transactions2: Icons.Transactions2,
    Bank: Icons.Bank,
    Currency: Icons.Currency,
  },
};

export const Default: StoryObj = {
  render: () => (
    <div className="w-full max-w-[800px] p-6 space-y-8">
      {Object.entries(iconCategories).map(([category, icons]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">{category}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {Object.entries(icons).map(([name, icon]) => (
              <IconDisplay key={name} name={name} icon={icon} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Icon Sizes</h3>
        <div className="flex items-end gap-4">
          {[16, 20, 24, 32, 40].map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Icons.Settings size={size} />
              <span className="text-xs text-muted-foreground">{size}px</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Colors: StoryObj = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Icon Colors</h3>
        <div className="flex gap-4">
          <IconDisplay
            name="Default"
            icon={Icons.Settings}
            className="text-foreground"
          />
          <IconDisplay
            name="Primary"
            icon={Icons.Settings}
            className="text-primary"
          />
          <IconDisplay
            name="Secondary"
            icon={Icons.Settings}
            className="text-secondary"
          />
          <IconDisplay
            name="Muted"
            icon={Icons.Settings}
            className="text-muted-foreground"
          />
          <IconDisplay
            name="Accent"
            icon={Icons.Settings}
            className="text-accent-foreground"
          />
          <IconDisplay
            name="Destructive"
            icon={Icons.Settings}
            className="text-destructive"
          />
        </div>
      </div>
    </div>
  ),
};

export const WithText: StoryObj = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Icons with Text</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Icons.Settings size={20} />
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.Notifications size={20} />
            <span>Notifications</span>
            <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              3
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.Error className="text-destructive" size={20} />
            <span className="text-destructive">Error message</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
