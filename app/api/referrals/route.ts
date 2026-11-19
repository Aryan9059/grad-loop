import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// REQUEST A REFERRAL FROM AN ALUM OF YOUR UNIVERSITY
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const me = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!me?.universityId) return NextResponse.json({ error: "University not set" }, { status: 403 });

    const { alumniId, message } = await req.json();
    if (!alumniId) return NextResponse.json({ error: "alumniId required" }, { status: 400 });

    const alum = await prisma.user.findUnique({ where: { id: Number(alumniId) } });
    if (!alum || alum.role !== "ALUMNI" || alum.universityId !== me.universityId || alum.id === me.id) {
      return NextResponse.json({ error: "Alum not found in your university" }, { status: 404 });
    }
    if (!alum.company) {
      return NextResponse.json({ error: "This alum hasn't listed a company" }, { status: 400 });
    }

    const existing = await prisma.referralRequest.findFirst({
      where: { requestorId: me.id, referrerId: alum.id, opportunityId: null, status: "Pending" },
    });
    if (existing) return NextResponse.json({ error: "You already have a pending request" }, { status: 400 });

    const request = await prisma.referralRequest.create({
      data: {
        requestorId: me.id,
        referrerId: alum.id,
        company: alum.company,
        message: typeof message === "string" ? message.trim().slice(0, 1000) || null : null,
        status: "Pending",
      },
    });

    return NextResponse.json(request);
  } catch (error) {
    console.error("Referral request failed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
