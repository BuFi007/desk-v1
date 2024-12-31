import { Button } from "../../button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../card"
import { SidebarInput } from "../../sidebar"

export function SidebarOptInForm() {
  return (
    <Card className="shadow-none">
      <form>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-xs">Subscribe to our newsletter</CardTitle>
          <CardDescription className="text-xs">
            Opt-in to receive updates and news about the sidebar.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4 text-xs">
          <SidebarInput type="email" placeholder="Email" />
          <Button
            className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
            size="xs"
          >
            Subscribe
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}
