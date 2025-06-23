import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH = update a comment (e.g., send a reply)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { repliedText } = await req.json();
    const updated = await prisma.comment.update({
      where: { id: params.id },
      data: { repliedText },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
  }
}

// DELETE = remove a comment
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.comment.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}