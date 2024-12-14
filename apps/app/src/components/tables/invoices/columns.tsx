import { InvoiceTemplate } from "@/actions/invoice/schema";

export type Invoice = {
  id: string;
  due_date: string;
  issue_date?: string;
  paid_at?: string;
  status: string;
  currency: string;
  invoice_number: string;
  amount?: number;
  vat?: number;
  tax?: number;
  updated_at?: string;
  viewed_at?: string;
  template: InvoiceTemplate;
  token: string;
  sent_to?: string | null;
  customer_details?: JSON;
  internal_note?: string | null;
  customer?: {
    id: string;
    name: string;
    website: string;
  };
  // Used when relation is deleted
  customer_name?: string;
};
