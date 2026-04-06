import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
        <UserButton appearance={{ elements: { userButtonAvatarBox: "size-10 shadow-sm" } }} />
      </div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </div>
  );
}
