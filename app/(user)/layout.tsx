"use client";

import React from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  Users,
  MessageSquareText,
  FileText,
  Briefcase,
  Settings,
  Sun,
  Moon,
  LayoutTemplate,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/favicon.ico";
import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Sidebar>
      <LayoutContent pathname={pathname}>{children}</LayoutContent>
    </Sidebar>
  );
}

function LayoutContent({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) {
  const { user } = useUser();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { open } = useSidebar();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    {
      label: "Dashboard",
      href: "/home",
      icon: <Home className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Connections",
      href: "/connections",
      icon: <Users className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Chats",
      href: "/chats",
      icon: <MessageSquareText className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Resume Studio",
      href: "/resume",
      icon: <WandSparkles className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Opportunities",
      href: "/opportunities",
      icon: <Briefcase className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5 shrink-0" />,
    },
  ];

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-background">
      <SidebarBody className="px-5 py-6 flex flex-col justify-between">
        {/* Top section */}
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Logo */}
            <Link href="/home" className="flex items-center gap-2.5 mb-1 px-1">
            <Image
              src={logo}
              alt="Grad Loop logo"
              className="h-7 w-7 shrink-0 object-contain"
            />
            {open && (
              <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-extrabold text-lg text-foreground tracking-tight whitespace-nowrap"
              >
              Grad Loop
              </motion.span>
            )}
            </Link>

          {/* Navigation section */}
          <nav className="mt-8 flex flex-col gap-0.5">
            {open && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60 px-3 mb-2 whitespace-nowrap"
              >
                Menu
              </motion.span>
            )}
            {links.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                className={cn(
                  pathname === link.href &&
                    "bg-sidebar-accent text-sidebar-accent-foreground font-semibold!",
                )}
              />
            ))}
          </nav>
        </div>

        {/* Bottom section: theme toggle + user */}
        <div className="flex flex-col gap-4 pt-4">
          {/* Theme toggle row */}
          {mounted && open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between px-3"
            >
              <div className="flex items-center gap-2.5 text-sidebar-foreground/70">
                {isDark ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">
                  {isDark ? "Dark" : "Light"}
                </span>
              </div>
              {/* Toggle switch */}
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 cursor-pointer focus:outline-none",
                  isDark ? "bg-accent-foreground" : "bg-border",
                )}
                aria-label="Toggle dark mode"
              >
                <span
                  className={cn(
                    "inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-sm transition-transform duration-200",
                    isDark ? "translate-x-5.5" : "translate-x-0.5",
                  )}
                />
              </button>
            </motion.div>
          )}

          {/* Divider */}
          <div className="border-t border-sidebar-border" />

          {/* User info */}
          <div className="flex items-center gap-3 px-2 overflow-hidden">
            <div className="flex-shrink-0">
              <UserButton
                appearance={{
                  elements: { userButtonAvatarBox: "size-9 shadow-sm" },
                }}
              />
            </div>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col min-w-0"
              >
                <span className="text-sm font-semibold text-foreground truncate">
                  {user?.firstName} {user?.lastName}
                </span>
                {user?.primaryEmailAddress && (
                  <span className="text-xs text-muted-foreground truncate">
                    {user.primaryEmailAddress.emailAddress}
                  </span>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </SidebarBody>

      {/* Main content */}
      <main className="flex flex-1 flex-col w-full min-h-screen overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}
