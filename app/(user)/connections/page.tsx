import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { getConnectionsList, getPendingRequests, getRecommendedUsers } from "@/lib/data";
import ConnectionsView from "@/components/connections/ConnectionsView";
import { Loader2 } from "lucide-react";

export const unstable_instant = { prefetch: 'static' };

export default async function ConnectionsPage() {
  const { userId: clerkId } = await auth();

  if (!clerkId) return null;

  return (
    <Suspense fallback={<ConnectionsLoading />}>
      <ConnectionsData clerkId={clerkId} />
    </Suspense>
  );
}

async function ConnectionsData({ clerkId }: { clerkId: string }) {
  const [connections, pending, recommendations] = await Promise.all([
    getConnectionsList(clerkId),
    getPendingRequests(clerkId),
    getRecommendedUsers(clerkId)
  ]);

  return (
    <ConnectionsView 
      initialConnections={connections as any}
      initialReceived={pending.received as any}
      initialSent={pending.sent as any}
      initialRecommendations={recommendations as any}
    />
  );
}

function ConnectionsLoading() {
  return (
    <div className="flex-1 flex items-center justify-center h-full w-full">
      <Loader2 className="h-6 w-6 animate-spin text-primary/50" />
    </div>
  );
}
