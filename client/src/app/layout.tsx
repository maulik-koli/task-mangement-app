import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import AppProvider from "@/provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management",
  description: "Manage and organize your tasks efficiently with Task Management app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-full flex flex-col", geistSans.variable, geistMono.variable)}>
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
