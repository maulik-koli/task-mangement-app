"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, LogOut, Check } from "lucide-react";
import { useGetProfile, useLogout } from "@/api/auth/hooks";

import DropDownMenu from "../composites/drop-down-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";


const DashboardHeader: React.FC = () => {
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  const { data, error, isLoading } = useGetProfile()
  const { mutate, isPending } = useLogout()
  const toast = useToast()

  const onLogout = () => {
    console.log('click')
    mutate(undefined, {
      onSuccess: () => {
        router.push('/login')
        toast.success("Logout successfully")
      }
    })
  }

  toast.isLoading(isPending, "Loading...")

  
  const getContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-full bg-primary/20" />
        </div>
      )
    }

    if (error || !data) {
      return (
        <Button variant="outline" size="sm" asChild className="h-7 text-xs px-2.5">
          <Link href="/login">
            Log In
          </Link>
        </Button>
      )
    }

    return (
      <DropDownMenu
        triggerNode={
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                {data?.data?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        }
        items={[
          {
            label: "Log out",
            onClick: onLogout,
            // leette going to add confirm model
            leftIcon: LogOut,
          },
        ]}
        contantNode={
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">{data?.data?.name}</p>
            <p className="text-xs text-muted-foreground">
              {data?.data?.email}
            </p>
          </div>
        }
      />
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60 shadow-sm transition-all duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center transition-colors">
          <span className="text-xl font-bold tracking-tight text-foreground/90 transition-colors group-hover:text-primary">
            Task Management
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <DropDownMenu
            triggerNode={
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors">
                <Sun className="size-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            }
            items={[
              {
                label: "Light",
                onClick: () => setTheme("light"),
                leftIcon: Sun,
                rightIcon: theme === "light" ? Check : undefined,
              },
              {
                label: "Dark",
                onClick: () => setTheme("dark"),
                leftIcon: Moon,
                rightIcon: theme === "dark" ? Check : undefined,
              },
              {
                label: "System",
                onClick: () => setTheme("system"),
                leftIcon: Monitor,
                rightIcon: theme === "system" ? Check : undefined,
              },
            ]}
          />

          {getContent()}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader