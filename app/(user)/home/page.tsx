import { Home, Search, Bell, Mail, GraduationCap, Sparkles, TrendingUp, Users, BookOpen } from "lucide-react";
import PostFeed from "@/components/feed/PostFeed";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getPosts } from "@/lib/data";
import { Suspense } from "react";

export const unstable_instant = { prefetch: 'static' };

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

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-3xl mx-auto w-full space-y-6">
          {/* University Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-linear-to-br from-primary/15 to-primary/5 shadow-sm">
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
          <Suspense fallback={<div className="soft-card p-12 text-center text-sm font-medium text-muted-foreground animate-pulse">Loading feed...</div>}>
            <PostFeedData userId={userId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function PostFeedData({ userId }: { userId: string }) {
  const posts = await getPosts(userId);
  return <PostFeed initialPosts={posts as any} />;
}
