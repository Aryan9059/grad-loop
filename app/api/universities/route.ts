import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const universities = await prisma.university.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, domain: true },
    });
    return NextResponse.json(universities);
  } catch (error: any) {
    console.error("Failed to fetch universities:", error);
    return NextResponse.json({ 
        error: "Failed to load universities", 
        details: error.message 
    }, { status: 500 });
  }
}
