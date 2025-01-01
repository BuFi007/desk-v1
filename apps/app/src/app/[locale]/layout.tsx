import "@bu/ui/globals.css";
import { Footer } from "@/components/footer";
import { cn } from "@bu/ui/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import "@rainbow-me/rainbowkit/styles.css";
import { Provider as Analytics } from "@bu/events/client";
import { Toaster } from "@bu/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import SetStylingPref from "@/components/styling/SetStylingPref";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Bu 👻 | Invoice Module",
  description: "Create invoice confidential and automated invoice requests",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${GeistSans.variable} ${GeistMono.variable}`,
          "antialiased bg-[(var(--bg))] text-[(var(--text))]"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={theme?.value}
          enableSystem={false}
          disableTransitionOnChange
        >
          <Providers locale={"en"}>
            <div className="size-full">{children}</div>
            <Toaster />
            <Footer />
            <Analytics />
            <SetStylingPref />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
