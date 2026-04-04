import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await auth();
  const body = await req.json();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const clerkUser = await currentUser();
  const email = clerkUser?.primaryEmailAddress?.emailAddress;

  if (!email) {
    return new Response("Missing Clerk email", { status: 400 });
  }

  await prisma.user.upsert({
    where: { clerkId: userId },
    update: {
      email,
      name: body.name,
    },
    create: {
      clerkId: userId,
      email,
      name: body.name,
    },
  });

  return Response.json({ success: true });
}