import { useAssistantStore } from "@/store/assistant";
import { Button } from "@bu/ui/button";
import { Icons } from "@bu/ui/icons";

type Props = {
  isExpanded: boolean;
  toggleSidebar: () => void;
};

export function Header({ toggleSidebar, isExpanded }: Props) {
  const { setOpen } = useAssistantStore();

  return (
    <div className="px-4 py-3 flex justify-between items-center border-border border-b-[1px]">
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="icon"
          className="size-8 z-50 p-0"
          onClick={toggleSidebar}
        >
          {isExpanded ? (
            <Icons.SidebarFilled width={18} />
          ) : (
            <Icons.Sidebar width={18} />
          )}
        </Button>

        <h2>Assistant</h2>
      </div>

      <Button
        className="flex md:hidden todesktop:hidden"
        size="icon"
        variant="ghost"
        onClick={() => setOpen()}
      >
        <Icons.Close />
      </Button>
    </div>
  );
}