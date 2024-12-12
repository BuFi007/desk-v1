import type { Meta, StoryObj } from "@storybook/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Button } from "./button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Checkbox } from "./checkbox";
import { useFieldArray } from "react-hook-form";
import { Loader2, Plus, Trash } from "lucide-react";
import { useState } from "react";

const meta: Meta = {
  title: "Components/Form",
  component: Form,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A form component built with React Hook Form and Zod validation.",
      },
    },
  },
};

export default meta;

// Basic profile form schema
const profileFormSchema = z.object({
  username: z.string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must not be longer than 30 characters." }),
  email: z.string()
    .email({ message: "Please enter a valid email address." }),
  bio: z.string().max(160).min(4),
  notifications: z.boolean().default(false),
  role: z.string({
    required_error: "Please select a role.",
  }),
});

// Team invite form schema
const inviteFormSchema = z.object({
  invites: z.array(
    z.object({
      email: z.string().email({ message: "Please enter a valid email address." }),
      role: z.enum(["owner", "member"]),
    })
  ),
});

export const BasicForm: StoryObj = {
  render: () => {
    const form = useForm<z.infer<typeof profileFormSchema>>({
      resolver: zodResolver(profileFormSchema),
      defaultValues: {
        username: "",
        email: "",
        bio: "",
        notifications: false,
        role: "",
      },
    });

    return (
      <div className="w-[400px] space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          <p className="text-muted-foreground">
            Update your profile information.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Brief description for your profile.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </div>
    );
  },
};

// Dynamic form with field array example
export const DynamicForm: StoryObj = {
  render: () => {
    const form = useForm<z.infer<typeof inviteFormSchema>>({
      resolver: zodResolver(inviteFormSchema),
      defaultValues: {
        invites: [{ email: "", role: "member" }],
      },
    });

    const { fields, append, remove } = useFieldArray({
      name: "invites",
      control: form.control,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: z.infer<typeof inviteFormSchema>) => {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(data);
      setIsSubmitting(false);
    };

    return (
      <div className="w-[600px] space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Invite Team Members</h2>
          <p className="text-muted-foreground">
            Add members to your team.
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4">
                <FormField
                  control={form.control}
                  name={`invites.${index}.email`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="team@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
                          <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="owner">Owner</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ email: "", role: "member" })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>

            <div className="flex justify-between pt-4 border-t mt-6">
              <Button variant="ghost" type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending invites...
                  </>
                ) : (
                  "Send Invites"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  },
};

// Form with validation states
export const ValidationStates: StoryObj = {
  render: () => {
    const form = useForm<z.infer<typeof profileFormSchema>>({
      resolver: zodResolver(profileFormSchema),
    });

    return (
      <div className="w-[400px] space-y-6">
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invalid Field</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>This field is required</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valid Field</FormLabel>
                  <FormControl>
                    <Input {...field} value="valid@example.com" />
                  </FormControl>
                  <FormDescription>
                    This field has a valid value
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Checkbox with Description
                    </FormLabel>
                    <FormDescription>
                      Get notifications about account activity.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  },
};
