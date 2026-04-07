import { Briefcase, Compass } from "lucide-react";

export default function OpportunitiesPage() {
  return (
    <div className="flex flex-col h-full w-full p-6 sm:p-10 overflow-y-auto">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-linear-to-br from-rose-500/10 to-pink-500/10">
            <Briefcase className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Opportunities
          </h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mt-1 ml-1">
          Find or post job openings and opportunities.
        </p>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Compass className="h-7 w-7 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">No opportunities posted</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Check back soon for new job openings and career opportunities from your alumni network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
