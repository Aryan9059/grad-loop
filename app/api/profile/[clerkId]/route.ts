import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ clerkId: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { clerkId } = await context.params;

    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        university: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Exclude sensitive information if any (email, id, clerkId are somewhat public but maybe not email)
    const { email, id, ...publicUser } = user;

    return NextResponse.json(publicUser);
  } catch (error) {
    console.error("Fetch profile failed", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
