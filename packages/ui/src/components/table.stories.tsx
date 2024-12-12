import type { Meta, StoryObj } from "@storybook/react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableFooter, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./table";
import { 
  User, 
  CreditCard, 
  Package, 
  Activity, 
  Layers, 
  ChevronDown, 
  MoreHorizontal 
} from "lucide-react";
import { Button } from "./button";
import { Checkbox } from "./checkbox";

const meta: Meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible and responsive table component with multiple sub-components.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

const userDataColumns = [
  "Name",
  "Email",
  "Status",
  "Plan",
  "Actions"
];

const userData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    status: "Active",
    plan: "Pro",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    status: "Inactive",
    plan: "Basic",
  },
  {
    name: "Emma Wong",
    email: "emma.wong@email.com",
    status: "Active",
    plan: "Enterprise",
  },
  {
    name: "Sophia Lee",
    email: "sophia.lee@email.com",
    status: "Pending",
    plan: "Pro",
  },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          {userDataColumns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData.map((user) => (
          <TableRow key={user.email}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <span 
                className={`px-2 py-1 rounded-full text-xs ${
                  user.status === "Active" 
                    ? "bg-green-100 text-green-800" 
                    : user.status === "Inactive" 
                    ? "bg-red-100 text-red-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {user.status}
              </span>
            </TableCell>
            <TableCell>{user.plan}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const AllVariants: Story = {
  name: "Table Variations",
  render: () => (
    <div className="flex flex-col gap-8 p-6 space-y-6">
      {/* Basic Table */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Basic Table</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { product: "Laptop", category: "Electronics", price: "$999", stock: "In Stock" },
              { product: "Headphones", category: "Accessories", price: "$199", stock: "Low Stock" },
              { product: "Smartphone", category: "Mobile", price: "$599", stock: "Out of Stock" },
            ].map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.stock === "In Stock" 
                        ? "bg-green-100 text-green-800" 
                        : item.stock === "Low Stock" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.stock}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Table with Selection */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Table with Selection</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { 
                name: "John Doe", 
                email: "john@example.com", 
                role: "Admin", 
                lastLogin: "2 hours ago" 
              },
              { 
                name: "Jane Smith", 
                email: "jane@example.com", 
                role: "User", 
                lastLogin: "Yesterday" 
              },
            ].map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.lastLogin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Table with Footer */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Table with Footer</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { item: "Keyboard", quantity: 2, price: "$99", total: "$198" },
              { item: "Mouse", quantity: 1, price: "$49", total: "$49" },
              { item: "Monitor", quantity: 1, price: "$299", total: "$299" },
            ].map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.item}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell>$546</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>

      {/* Table with Caption */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Table with Caption</h3>
        <Table>
          <TableCaption>A list of recent team activities</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { 
                member: "Alex Rodriguez", 
                activity: "Completed Project", 
                date: "2023-06-15", 
                status: "Completed" 
              },
              { 
                member: "Sam Johnson", 
                activity: "Code Review", 
                date: "2023-06-14", 
                status: "In Progress" 
              },
            ].map((activity, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{activity.member}</span>
                  </div>
                </TableCell>
                <TableCell>{activity.activity}</TableCell>
                <TableCell>{activity.date}</TableCell>
                <TableCell>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs ${
                      activity.status === "Completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {activity.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Header 1</TableHead>
          <TableHead>Header 2</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Data 1</TableCell>
          <TableCell>Data 2</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Data 3</TableCell>
          <TableCell>Data 4</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const CompactTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
          { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
          { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
        ].map((item) => (
          <TableRow key={item.invoice}>
            <TableCell className="font-medium">{item.invoice}</TableCell>
            <TableCell>
              <span 
                className={`px-2 py-1 rounded-full text-xs ${
                  item.status === "Paid" 
                    ? "bg-green-100 text-green-800" 
                    : item.status === "Pending" 
                    ? "bg-yellow-100 text-yellow-800" 
                    : "bg-red-100 text-red-800"
                }`}
              >
                {item.status}
              </span>
            </TableCell>
            <TableCell>{item.method}</TableCell>
            <TableCell className="text-right">{item.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};