"use client";

// import { generateInvoiceFilters } from "@/actions/ai/filters/generate-invoice-filters";
// import { useInvoiceParams } from "@/hooks/use-invoice-params";
import { useI18n } from "@/locales/client";
import { Calendar } from "@bu/ui/calendar";
import { cn } from "@bu/ui/cn";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@bu/ui/dropdown-menu";
import { Icons } from "@bu/ui/icons";
import { Input } from "@bu/ui/input";
import { readStreamableValue } from "ai/rsc";
import { formatISO } from "date-fns";
import { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const allowedStatuses = ["draft", "overdue", "paid", "unpaid", "canceled"];

type Props = {
  customers?: {
    id: string | null;
    name: string | null;
  }[];
};

export function InvoiceSearchFilter({ customers: customersData }: Props) {
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const t = useI18n();

  const statusFilters = allowedStatuses.map((status) => ({
    id: status,
    name: "invoice",
  }));

  useHotkeys(
    "esc",
    () => {
      setPrompt("");
      //   setParams(null);
      setIsOpen(false);
    },
    {
      enableOnFormTags: true,
      enabled: Boolean(prompt),
    }
  );

  useHotkeys("meta+s", (evt) => {
    evt.preventDefault();
    inputRef.current?.focus();
  });

  useHotkeys("meta+f", (evt) => {
    evt.preventDefault();
    setIsOpen((prev) => !prev);
  });

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    if (value) {
      setPrompt(value);
    } else {
      //   setParams(null);
      setPrompt("");
    }
  };

  const handleSubmit = async () => {
    setStreaming(true);

    let finalObject = {};
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 items-start sm:items-center w-full">
        <form
          className="relative w-full sm:w-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Icons.Search className="absolute pointer-events-none left-3 top-[11px]" />
          <Input
            ref={inputRef}
            placeholder="Search or filter"
            className="pl-9 w-full sm:w-[350px] pr-8"
            value={prompt}
            onChange={handleSearch}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
          />

          <DropdownMenuTrigger asChild>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              type="button"
              className={cn(
                "absolute z-10 right-3 top-[10px] opacity-50 transition-opacity duration-300 hover:opacity-100",
                // hasValidFilters && "opacity-100",
                isOpen && "opacity-100"
              )}
            >
              <Icons.Filter />
            </button>
          </DropdownMenuTrigger>
        </form>
        {/* 
        <FilterList
          filters={filters}
          loading={streaming}
          onRemove={setParams}
          statusFilters={statusFilters}
          customers={customersData}
        /> */}
      </div>

      <DropdownMenuContent
        className="w-[350px]"
        sideOffset={19}
        alignOffset={-11}
        side="bottom"
        align="end"
      >
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icons.CalendarMonth className="mr-2 h-4 w-4" />
              <span>Due Date</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                sideOffset={14}
                alignOffset={-4}
                className="p-0"
              >
                <Calendar
                  mode="range"
                  initialFocus
                  toDate={new Date()}
                  selected={{
                    // from: start ? new Date(start) : undefined,
                    // to: end ? new Date(end) : undefined,
                    from: new Date(),
                    to: new Date(),
                  }}
                  onSelect={(value) => {
                    console.log(value);
                  }}
                />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icons.Face className="mr-2 h-4 w-4" />
              <span>Customer</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                sideOffset={14}
                alignOffset={-4}
                className="p-0"
              >
                {customersData?.map((customer) => (
                  <DropdownMenuCheckboxItem
                    key={customer.id}
                    onCheckedChange={() => {
                      //   setParams({
                      //     customers: filters?.customers?.includes(customer.id)
                      //       ? filters.customers.filter((s) => s !== customer.id)
                      //       : [...(filters?.customers ?? []), customer.id],
                      //   });
                    }}
                  >
                    {customer.name}
                  </DropdownMenuCheckboxItem>
                ))}

                {!customersData?.length && (
                  <DropdownMenuItem disabled>
                    No customers found
                  </DropdownMenuItem>
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icons.Status className="mr-2 h-4 w-4" />
              <span>Status</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                sideOffset={14}
                alignOffset={-4}
                className="p-0"
              >
                {statusFilters?.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status.id}
                    onCheckedChange={() => {
                      //   setParams({
                      //     statuses: filters?.statuses?.includes(status.id)
                      //       ? filters.statuses.filter((s) => s !== status.id)
                      //       : [...(filters?.statuses ?? []), status.id],
                      //   });
                    }}
                  >
                    {status.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
