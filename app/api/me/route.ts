import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ exists: false }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });

    return NextResponse.json({
      exists: !!user,
    });
  } catch (error) {
    console.error("/api/me failed", error);
    return NextResponse.json({ exists: false, error: "server_error" }, { status: 500 });
  }
}