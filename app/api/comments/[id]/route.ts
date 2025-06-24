import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH: update a comment (reply or toggle interest)
export async function PATCH(req: Request, { params }: any) {
  try {
    const body = await req.json();

    const updated = await prisma.comment.update({
      where: { id: params.id },
      data: {
        repliedText: body.repliedText,
        isInterested:
          typeof body.isInterested === "boolean" ? body.isInterested : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
  }
}

// DELETE: remove a comment
export async function DELETE(req: Request, { params }: any) {
  try {
    await prisma.comment.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}