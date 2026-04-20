import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      firstName,
      lastName,
      bio,
      profile_photo,
      graduationYear,
      domain,
      skills,
      company,
      roleTitle,
      openToConnect,
    } = body;

    const updatedUser = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        firstName,
        lastName,
        bio,
        profile_photo,
        graduationYear: graduationYear ? Number(graduationYear) : undefined,
        domain,
        skills,
        company,
        roleTitle,
        openToConnect: openToConnect !== undefined ? openToConnect : undefined,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Profile update failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Server error" }, { status: 500 });
  }
}
