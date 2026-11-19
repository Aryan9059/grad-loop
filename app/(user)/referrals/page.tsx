import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getReferralData } from "@/lib/data";
import ReferralsView from "@/components/referrals/ReferralsView";

export default async function ReferralsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <Suspense fallback={<ReferralsLoading />}>
      <ReferralsData clerkId={userId} />
    </Suspense>
  );
}

async function ReferralsData({ clerkId }: { clerkId: string }) {
  const data = await getReferralData(clerkId);
  if (!data) redirect("/onboarding");
  return <ReferralsView data={data} />;
}

function ReferralsLoading() {
  return (
    <div className="flex flex-col h-full w-full p-6 sm:p-10 overflow-y-auto animate-pulse">
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-muted" />
          <div className="h-8 w-40 rounded-xl bg-muted" />
        </div>
        <div className="h-4 w-64 rounded-lg bg-muted ml-1" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="soft-card h-40" />
        ))}
      </div>
    </div>
  );
}
