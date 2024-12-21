import "@bu/ui/globals.css";
import { Footer } from "@/components/footer";
import { cn } from "@bu/ui/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { cookies } from "next/headers"
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "@rainbow-me/rainbowkit/styles.css";
import { Web3Provider } from "@/context/Web3";
import { Header } from "@/components/header";
import { Toaster } from "@bu/ui/toaster";
import { DotPattern } from "@bu/ui/dot-pattern";

export const metadata: Metadata = {
  title: "Bu 👻 | Invoice Module",
  description: "Create invoice confidential and automated invoicerequests",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = cookies()
  const theme = cookieStore.get('theme')
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${GeistSans.variable} ${GeistMono.variable}`,
          "antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={theme?.value || 'yellow'} 
          enableSystem={false}
          disableTransitionOnChange
        >
          <Web3Provider>
            <div className="w-screen flex flex-col custom-scrollbar">
              <Header />
              <DotPattern
                className={cn(
                  "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
                )}
              />{" "}
              {children}
              <Toaster />
              <Footer />
            </div>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
