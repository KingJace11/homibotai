import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/comments/:id
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { repliedText } = body;

    const updated = await prisma.comment.update({
      where: { id: params.id },
      data: { repliedText },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Error updating comment reply:", error);
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
  }
}