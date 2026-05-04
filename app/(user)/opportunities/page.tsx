import { Suspense } from "react";
import { getOpportunities } from "@/lib/data";
import OpportunitiesView from "@/components/opportunities/OpportunitiesView";
import { Briefcase } from "lucide-react";

export const unstable_instant = { prefetch: 'static' };

export default async function OpportunitiesPage() {
  return (
    <Suspense fallback={<OpportunitiesLoading />}>
      <OpportunitiesData />
    </Suspense>
  );
}

async function OpportunitiesData() {
  const opportunities = await getOpportunities();
  return <OpportunitiesView initialOpportunities={opportunities} />;
}

function OpportunitiesLoading() {
  return (
    <div className="flex flex-col h-full w-full p-6 sm:p-10 overflow-y-auto bg-background/50">
      <div className="max-w-5xl mx-auto w-full space-y-10">
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <div className="relative">
            <div className="size-16 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
            <Briefcase className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary/40" />
          </div>
          <p className="text-muted-foreground font-bold animate-pulse tracking-wide uppercase text-xs">Preparing Opportunities...</p>
        </div>
      </div>
    </div>
  );
}
