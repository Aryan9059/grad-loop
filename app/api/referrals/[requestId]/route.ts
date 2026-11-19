import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const ALLOWED = ["Pending", "Referred", "Not Now"];

// ALUM UPDATES THE STATUS OF A REFERRAL REQUEST SENT TO THEM
export async function PATCH(req: Request, context: { params: Promise<{ requestId: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { requestId } = await context.params;
    const { status } = await req.json();
    if (!ALLOWED.includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });

    const me = await prisma.user.findUnique({ where: { clerkId: userId }, select: { id: true } });
    if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const request = await prisma.referralRequest.findUnique({ where: { id: Number(requestId) } });
    if (!request || request.referrerId !== me.id) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    const updated = await prisma.referralRequest.update({
      where: { id: request.id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Referral update failed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
