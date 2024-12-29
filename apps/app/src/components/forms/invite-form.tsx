"use client";

import { inviteTeamMembersAction } from "@/actions/team/invite-team-members-action";
import {
  type InviteTeamMembersFormValues,
  inviteTeamMembersSchema,
} from "@/actions/team/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@bu/ui/button";
import { Form, FormControl, FormField, FormItem } from "@bu/ui/form";
import { Input } from "@bu/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bu/ui/select";
import { useToast } from "@bu/ui/use-toast";
import { Loader2, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";

export function InviteForm() {
  const { toast } = useToast();

  const inviteMembers = useAction(inviteTeamMembersAction, {
    onError: () => {
      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    },
  });

  const form = useForm<InviteTeamMembersFormValues>({
    resolver: zodResolver(inviteTeamMembersSchema),
    defaultValues: {
      invites: [
        {
          email: "",
          role: "member",
        },
      ],
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    inviteMembers.execute({
      // Remove invites without email (last appended invite validation)
      invites: data.invites.filter((invite) => invite.email !== undefined),
      redirectTo: "/",
    });
  });

  const { fields, append, remove } = useFieldArray({
    name: "invites",
    control: form.control,
  });
  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <div
            className="flex items-center justify-between mt-4 space-x-4"
            key={index.toString()}
          >
            <FormField
              control={form.control}
              key={field.id}
              name={`invites.${index}.email`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="jane@example.com"
                      type="email"
                      className="w-full"
                      autoComplete="off"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck="false"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`invites.${index}.role`}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="min-w-[120px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-bg">
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {fields.length > 1 && (
              <Button
                type="button"
                variant="duende"
                size="icon"
                className="flex-shrink-0"
                onClick={() => remove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        <Button
          variant="default"
          type="button"
          className="mt-4"
          onClick={() => append({ email: undefined, role: "member" })}
        >
          + Add more
        </Button>

        <div className="border-t-[1px] pt-4 mt-8 items-center justify-between">
          <div>
            {Object.values(form.formState.errors).length > 0 && (
              <span className="text-sm text-destructive">
                Please complete the fields above.
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="link"
                className="p-0 hover:bg-transparent font-normal"
              >
                Skip this step
              </Button>
            </Link>

            <Button
              type="submit"
              variant="duende"
              disabled={inviteMembers.status === "executing"}
            >
              {inviteMembers.status === "executing" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Send invites"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
