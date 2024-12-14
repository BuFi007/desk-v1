"use client";

// import { updateMenuAction } from "@/actions/update-menu-action";
import { useMenuStore } from "@/store/menu";
import { cn } from "@bu/ui/cn";
import { Icons } from "@bu/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@bu/ui/tooltip";
import { useClickAway } from "@uidotdev/usehooks";
import { Reorder, motion, useMotionValue } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const icons = {
  "/": () => <Icons.Overview size={22} />,
  "/transactions": () => <Icons.Transactions size={22} />,
  "/invoices": () => <Icons.Invoice size={22} />,
  "/tracker": () => <Icons.Tracker size={22} />,
  "/vault": () => <Icons.Files size={22} />,
  "/settings": () => <Icons.Settings size={22} />,
  "/apps": () => <Icons.Apps size={22} />,
  "/inbox": () => <Icons.Inbox2 size={22} />,
};

const defaultItems = [
  {
    path: "/",
    name: "Overview",
  },
  {
    path: "/inbox",
    name: "Inbox",
  },
  {
    path: "/transactions",
    name: "Transactions",
  },
  {
    path: "/invoices",
    name: "Invoices",
  },
  {
    path: "/tracker",
    name: "Tracker",
  },
  {
    path: "/vault",
    name: "Vault",
  },
  {
    path: "/apps",
    name: "Apps",
  },
  {
    path: "/settings",
    name: "Settings",
  },
];

interface ItemProps {
  item: { path: string; name: string };
  isActive: boolean;
  isCustomizing: boolean;
  onRemove: (path: string) => void;
  disableRemove: boolean;
  onDragEnd: () => void;
  onSelect?: () => void;
}

const Item = ({
  item,
  isActive,
  isCustomizing,
  onRemove,
  disableRemove,
  onDragEnd,
  onSelect,
}: ItemProps) => {
  const y = useMotionValue(0);
  const Icon = icons[item.path as keyof typeof icons];

  return (
    <TooltipProvider delayDuration={70}>
      <Link
        prefetch
        href={item.path}
        onClick={(evt) => {
          if (isCustomizing) {
            evt.preventDefault();
          }

          onSelect?.();
        }}
        onMouseDown={(evt) => {
          if (isCustomizing) {
            evt.preventDefault();
          }
        }}
      >
        <Tooltip>
          <TooltipTrigger className="w-full">
            <Reorder.Item
              key={item.path}
              value={item}
              id={item.path}
              style={{ y }}
              layoutRoot
              className={cn(
                "relative border border-transparent md:w-[75px] h-[75px] flex items-center "
                // "hover:bg-accent hover:border-[#DCDAD2] hover:dark:border-[#2C2C2C]"
              )}
            >
              <motion.div
                className="relative"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={cn("flex space-x-3 p-0 items-center m-auto")}>
                  <Icon />
                  <span className="flex">{item.name}</span>
                </div>
              </motion.div>
            </Reorder.Item>
          </TooltipTrigger>
          {/* <TooltipContent
            side="left"
            className="px-3 py-1.5 text-xs "
            sideOffset={10}
          >
            {item.name}
          </TooltipContent> */}
        </Tooltip>
      </Link>
    </TooltipProvider>
  );
};

const listVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

type Props = {
  initialItems?: { path: string; name: string }[];
  onSelect?: () => void;
};

export function MainMenu({ initialItems, onSelect }: Props) {
  const [items, setItems] = useState(initialItems ?? defaultItems);
  const { isCustomizing, setCustomizing } = useMenuStore();
  const pathname = usePathname();
  const part = pathname?.split("/")[1];
  //   const updateMenu = useAction(updateMenuAction);

  const onReorder = (reorderedItems: typeof items) => {
    setItems(reorderedItems);
  };

  const ref = useClickAway(() => {
    setCustomizing(false);
  });

  return (
    <div className="mt-6" ref={ref as any}>
      <nav>
        <Reorder.Group
          axis="y"
          onReorder={onReorder}
          values={items}
          className="flex flex-col gap-1.5"
        >
          {items.map((item) => {
            const isActive =
              (pathname === "/" && item.path === "/") ||
              (pathname !== "/" && item.path.startsWith(`/${part}`));

            return (
              <Item
                key={item.path}
                item={item}
                isActive={isActive}
                isCustomizing={isCustomizing}
                onRemove={() => {}}
                onDragEnd={() => {}}
                disableRemove={items.length === 1}
                onSelect={onSelect}
              />
            );
          })}
        </Reorder.Group>
      </nav>
    </div>
  );
}
