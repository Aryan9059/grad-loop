import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ exists: false }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    const completed =
      !!user &&
      !!user.firstName &&
      !!user.lastName &&
      !!user.role &&
      !!user.domain &&
      (user.skills?.length ?? 0) > 0;

    return NextResponse.json({
      exists: completed,
    });
  } catch (error) {
    console.error("/api/me failed", error);
    return NextResponse.json({ exists: false, error: "server_error" }, { status: 500 });
  }
}