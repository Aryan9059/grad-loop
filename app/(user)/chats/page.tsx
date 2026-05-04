import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { getUserConversations, getRecommendedUsers, getUserConnections } from "@/lib/data";
import ChatsView from "@/components/chats/ChatsView";
import { Loader2 } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const unstable_instant = { prefetch: 'static' };

export default async function ChatsPage() {
  const { userId: clerkId } = await auth();

  if (!clerkId) return null;

  return (
    <Suspense fallback={<ChatsLoading />}>
      <ChatsData clerkId={clerkId} />
    </Suspense>
  );
}

async function ChatsData({ clerkId }: { clerkId: string }) {
  const [conversations, recommendations, connections, userProfile] = await Promise.all([
    getUserConversations(clerkId),
    getRecommendedUsers(clerkId),
    getUserConnections(clerkId),
    prisma.user.findUnique({ where: { clerkId }, select: { id: true } })
  ]);

  return (
    <ChatsView 
      initialConversations={conversations as any}
      initialRecommendations={recommendations as any}
      initialConnections={connections}
      currentUserId={userProfile?.id || null}
    />
  );
}

function ChatsLoading() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Loader2 className="h-6 w-6 animate-spin text-primary/50" />
    </div>
  );
}
