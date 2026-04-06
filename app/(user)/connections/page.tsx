import { Users, Search } from "lucide-react";

export default function ConnectionsPage() {
  return (
    <div className="flex flex-col h-full w-full p-6 sm:p-10 overflow-y-auto">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500/10 to-blue-500/10">
            <Users className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Connections
          </h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mt-1 ml-1">
          Network with alumni and build meaningful relationships.
        </p>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Search className="h-7 w-7 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">No connections yet</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Start networking with other alumni to see your connections here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
