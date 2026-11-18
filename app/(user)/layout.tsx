import { auth } from "@clerk/nextjs/server";
import UserShell from "./UserShell";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth.protect();
  return <UserShell>{children}</UserShell>;
}
