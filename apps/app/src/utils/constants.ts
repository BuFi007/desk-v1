import { startOfMonth, subMonths } from "date-fns";

export const Cookies = {
  PreferredSignInProvider: "preferred-signin-provider",
  SpendingPeriod: "spending-period",
  ChartType: "chart-type",
  TransactionsPeriod: "transactions-period",
  TransactionsColumns: "transactions-columns",
  MfaSetupVisited: "mfa-setup-visited",
  MenuConfig: "menu-config-v2",
  InboxFilter: "inbox-filter-v2",
  TrackingConsent: "tracking-consent",
  InboxOrder: "inbox-order",
  HideConnectFlow: "hide-connect-flow",
  LastProject: "last-project",
};

export const maxDuration = 30;

export const metadata = {
  title: "Desk | Overview | Bu",
};

export const defaultValue = {
  from: subMonths(startOfMonth(new Date()), 12).toISOString(),
  to: new Date().toISOString(),
  period: "monthly",
};