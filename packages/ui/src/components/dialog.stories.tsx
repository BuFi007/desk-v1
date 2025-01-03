import type { Meta, StoryObj } from "@storybook/react";
import * as Dialog from "./dialog";
import * as DialogZ from "./dialog-z";
import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";

const meta = {
  title: "Components/Dialog",
};

export default meta;

// Stories for the main Dialog component
export const MainDialog: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      {/* Basic Dialog */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Basic Dialog</h3>
        <Dialog.Dialog>
          <Dialog.DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </Dialog.DialogTrigger>
          <Dialog.DialogContent>
            <Dialog.DialogHeader>
              <Dialog.DialogTitle>Basic Dialog</Dialog.DialogTitle>
              <Dialog.DialogDescription>
                A simple dialog with title and description.
              </Dialog.DialogDescription>
            </Dialog.DialogHeader>
            <div className="py-4">This is the main content of the dialog.</div>
            <Dialog.DialogFooter>
              <Dialog.DialogClose asChild>
                <Button>Close</Button>
              </Dialog.DialogClose>
            </Dialog.DialogFooter>
          </Dialog.DialogContent>
        </Dialog.Dialog>
      </section>

      {/* Dialog with Form */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Dialog with Form</h3>
        <Dialog.Dialog>
          <Dialog.DialogTrigger asChild>
            <Button>Edit Profile</Button>
          </Dialog.DialogTrigger>
          <Dialog.DialogContent size="lg">
            <Dialog.DialogHeader>
              <Dialog.DialogTitle>Edit Profile</Dialog.DialogTitle>
              <Dialog.DialogDescription>
                Make changes to your profile settings.
              </Dialog.DialogDescription>
            </Dialog.DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="john@example.com" />
              </div>
            </div>
            <Dialog.DialogFooter>
              <Dialog.DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.DialogClose>
              <Button type="submit">Save changes</Button>
            </Dialog.DialogFooter>
          </Dialog.DialogContent>
        </Dialog.Dialog>
      </section>

      {/* Different Sizes */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Different Sizes</h3>
        <div className="flex gap-4">
          {["sm", "md", "lg", "xl", "full"].map((size) => (
            <Dialog.Dialog key={size}>
              <Dialog.DialogTrigger asChild>
                <Button variant="outline">{size.toUpperCase()}</Button>
              </Dialog.DialogTrigger>
              <Dialog.DialogContent
                size={size as "sm" | "md" | "lg" | "xl" | "full"}
              >
                <Dialog.DialogHeader>
                  <Dialog.DialogTitle>
                    {size.toUpperCase()} Dialog
                  </Dialog.DialogTitle>
                  <Dialog.DialogDescription>
                    This is a {size} sized dialog.
                  </Dialog.DialogDescription>
                </Dialog.DialogHeader>
                <div className="py-4">Content for {size} dialog</div>
              </Dialog.DialogContent>
            </Dialog.Dialog>
          ))}
        </div>
      </section>
    </div>
  ),
};

// Stories for the DialogZ component
export const ZDialog: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      {/* Basic DialogZ */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Basic DialogZ</h3>
        <DialogZ.Dialog>
          <DialogZ.DialogTrigger asChild>
            <Button variant="outline">Open DialogZ</Button>
          </DialogZ.DialogTrigger>
          <DialogZ.DialogContent>
            <DialogZ.DialogHeader>
              <DialogZ.DialogTitle>Basic DialogZ</DialogZ.DialogTitle>
              <DialogZ.DialogDescription>
                A simple dialog with darker overlay and different styling.
              </DialogZ.DialogDescription>
            </DialogZ.DialogHeader>
            <div className="py-4">
              Notice the darker overlay and different close button styling.
            </div>
            <DialogZ.DialogFooter>
              <DialogZ.DialogClose asChild>
                <Button>Close</Button>
              </DialogZ.DialogClose>
            </DialogZ.DialogFooter>
          </DialogZ.DialogContent>
        </DialogZ.Dialog>
      </section>

      {/* Complex DialogZ */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Complex DialogZ</h3>
        <DialogZ.Dialog>
          <DialogZ.DialogTrigger asChild>
            <Button>Share Document</Button>
          </DialogZ.DialogTrigger>
          <DialogZ.DialogContent>
            <DialogZ.DialogHeader>
              <DialogZ.DialogTitle>Share Document</DialogZ.DialogTitle>
              <DialogZ.DialogDescription>
                Invite others to collaborate on this document.
              </DialogZ.DialogDescription>
            </DialogZ.DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" placeholder="Enter email address" />
              </div>
              <div className="grid gap-2">
                <Label>Permission level</Label>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Admin
                  </Button>
                </div>
              </div>
            </div>
            <DialogZ.DialogFooter>
              <DialogZ.DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogZ.DialogClose>
              <Button>Send Invite</Button>
            </DialogZ.DialogFooter>
          </DialogZ.DialogContent>
        </DialogZ.Dialog>
      </section>
    </div>
  ),
};
