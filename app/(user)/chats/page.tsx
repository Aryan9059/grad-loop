import { MessageSquareText, Inbox } from "lucide-react";

export default function ChatsPage() {
  return (
    <div className="flex flex-col h-full w-full p-6 sm:p-10 overflow-y-auto">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-linear-to-br from-emerald-500/10 to-teal-500/10">
            <MessageSquareText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Chats
          </h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mt-1 ml-1">
          Your messages and conversations.
        </p>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Inbox className="h-7 w-7 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">No messages yet</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Start a conversation with your connections to see messages here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
