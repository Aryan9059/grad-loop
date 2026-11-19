import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateAndUpsertEmbedding } from "@/lib/embeddings";

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
      universityId,
    } = body;

    // Switching university = switching "community" (feed, alumni, network)
    let nextUniversityId: number | undefined;
    if (universityId !== undefined && universityId !== null && universityId !== "") {
      nextUniversityId = Number(universityId);
      const exists = await prisma.university.findUnique({ where: { id: nextUniversityId }, select: { id: true } });
      if (!exists) {
        return NextResponse.json({ error: "Invalid university" }, { status: 400 });
      }
    }

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
        universityId: nextUniversityId,
      },
      include: { university: true },
    });

    // Fire-and-forget: regenerate profile embedding
    generateAndUpsertEmbedding(updatedUser).catch((err) =>
      console.error("Embedding generation failed (profile update):", err)
    );

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Profile update failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Server error" }, { status: 500 });
  }
}
