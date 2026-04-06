import { Home, Users, MessageSquareText, FileText, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { label: "Connections", href: "/connections", icon: Users, description: "Network with alumni and peers" },
  { label: "Chats", href: "/chats", icon: MessageSquareText, description: "Start conversations" },
  { label: "Resume Analysis", href: "/resume", icon: FileText, description: "AI-powered resume feedback" },
  { label: "Opportunities", href: "/opportunities", icon: Briefcase, description: "Explore job postings" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col h-full w-full p-6 sm:p-10 overflow-y-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10">
            <Home className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mt-1 ml-1">
          Welcome back! Here&apos;s what you can do today.
        </p>
      </div>

      {/* Quick access cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-border/80 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex-shrink-0 p-2.5 rounded-xl bg-muted text-muted-foreground group-hover:bg-violet-500/10 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-foreground">{item.label}</h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Stats placeholder */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Connections", value: "—", accent: "from-violet-500/10 to-purple-500/10" },
          { label: "Unread Messages", value: "—", accent: "from-sky-500/10 to-blue-500/10" },
          { label: "Open Opportunities", value: "—", accent: "from-emerald-500/10 to-teal-500/10" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-start gap-2 p-5 rounded-xl border border-border bg-card"
          >
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            <span className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
