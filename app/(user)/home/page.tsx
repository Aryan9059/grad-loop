import { Home } from "lucide-react";
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
    <div className="flex flex-col h-full w-full p-4 sm:p-6 lg:p-10 overflow-y-auto bg-muted/20">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-linear-to-br from-violet-500/10 to-indigo-500/10">
              <Home className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground lowercase-first capitalize">
              {universityName}
            </h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base mt-1 ml-1">
            See what&apos;s happening in your university network.
          </p>
        </div>

        {/* Post Feed */}
        <PostFeed />
      </div>
    </div>
  );
}
