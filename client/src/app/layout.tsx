import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { DOMAIN_URL } from "@/constants/seo";

import AppProvider from "@/provider";
import JsonLd from "@/components/common/json-ld";
import { Toaster } from "@/components/ui/sonner";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL),
  title: {
    template: "%s | Task Management",
    default: "Task Management",
  },
  description: "Manage and organize your tasks efficiently with Task Management app.",
  keywords: ["Task Management", "Productivity", "To-Do List", "Organization", "Workflow"],
  authors: [{ name: "Task Management Team" }],
  creator: "Task Management Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: DOMAIN_URL,
    title: "Task Management",
    description: "Manage and organize your tasks efficiently with Task Management app.",
    siteName: "Task Management",
  },
  twitter: {
    card: "summary_large_image",
    title: "Task Management",
    description: "Manage and organize your tasks efficiently with Task Management app.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
        <Analytics />
      </head>
      <body className={cn("min-h-full flex flex-col font-sans", fontSans.variable, fontMono.variable)}>
        <main className="w-full h-full">
          <AppProvider>
            {children}
          </AppProvider>
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
