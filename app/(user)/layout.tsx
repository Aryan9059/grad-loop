"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Home, Users, MessageSquareText, FileText, Briefcase, Settings, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs"; 
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { label: "Home", href: "/home", icon: <Home className="h-5 w-5 flex-shrink-0" /> },
    { label: "Connections", href: "/connections", icon: <Users className="h-5 w-5 flex-shrink-0" /> },
    { label: "Chats", href: "/chats", icon: <MessageSquareText className="h-5 w-5 flex-shrink-0" /> },
    { label: "Resume analysis", href: "/resume", icon: <FileText className="h-5 w-5 flex-shrink-0" /> },
    { label: "Opportunities", href: "/opportunities", icon: <Briefcase className="h-5 w-5 flex-shrink-0" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="h-5 w-5 flex-shrink-0" /> },
  ];

  const isDark = theme === "dark";

  return (
    <div className={cn("flex flex-col md:flex-row w-full flex-1 max-w-full mx-auto overflow-hidden h-screen bg-background")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Logo */}
            <Link href="/home" className="font-normal flex space-x-2 items-center text-sm py-1 px-3 relative z-20">
               <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex-shrink-0 shadow-sm" />
               <motion.span animate={{ display: open ? "inline-block" : "none", opacity: open ? 1 : 0 }} className="font-bold text-base text-foreground whitespace-pre tracking-tight">
                 Grad Loop
               </motion.span>
            </Link>

            {/* Navigation Links */}
            <div className="mt-8 flex flex-col gap-1">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className={cn(
                    pathname === link.href && "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Bottom section: theme toggle + user */}
          <div className="flex flex-col gap-3 mt-auto">
            {/* Dark mode toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg w-full",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                "transition-colors duration-150 cursor-pointer"
              )}
              aria-label="Toggle dark mode"
            >
              <div className="flex-shrink-0 h-5 w-5 relative">
                {mounted && (
                  <motion.div
                    key={isDark ? "moon" : "sun"}
                    initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? (
                      <Moon className="h-5 w-5" />
                    ) : (
                      <Sun className="h-5 w-5" />
                    )}
                  </motion.div>
                )}
              </div>
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="text-sm font-medium whitespace-pre"
              >
                {isDark ? "Dark mode" : "Light mode"}
              </motion.span>
            </button>

            {/* Divider */}
            <div className="border-t border-sidebar-border" />

            {/* User info */}
            <div className="px-3 py-2 flex items-center justify-start cursor-pointer gap-2 overflow-hidden">
               <div className="flex-shrink-0">
                 <UserButton appearance={{ elements: { userButtonAvatarBox: "size-8 shadow-sm ring-1 ring-border/50" } }} /> 
               </div>
               <motion.span animate={{ display: open ? "inline-block" : "none", opacity: open ? 1 : 0 }} className="text-sm font-medium text-foreground whitespace-pre truncate pointer-events-none">
                 {user?.firstName} {user?.lastName}
               </motion.span>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main content */}
      <main className="flex flex-1 flex-col w-full h-full overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}
