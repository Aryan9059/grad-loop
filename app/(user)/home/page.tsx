import { Home, Search, Bell, Mail, GraduationCap, Sparkles, TrendingUp, Users, BookOpen } from "lucide-react";
import PostFeed from "@/components/feed/PostFeed";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { university: true },
  });

  if (!user?.universityId) {
    redirect("/onboarding");
  }

  const universityName = user.university?.name || "University Feed";

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto">
      {/* Top search bar */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-sidebar-border px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search your network..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            />
          </div>
          <button className="relative h-10 w-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors cursor-pointer">
            <Mail className="h-4 w-4" />
          </button>
          <button className="relative h-10 w-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors cursor-pointer">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">3</span>
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-3xl mx-auto w-full space-y-6">
          {/* University Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 shadow-sm">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {universityName}
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
                See what&apos;s happening in your university network.
              </p>
            </div>
          </div>


          {/* Post Feed */}
          <PostFeed />
        </div>
      </div>
    </div>
  );
}
