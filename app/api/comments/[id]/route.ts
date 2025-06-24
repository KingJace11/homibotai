import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: { id: string };
};

// PATCH = update a comment
export async function PATCH(req: Request, context: Context) {
  try {
    const body = await req.json();
    const updated = await prisma.comment.update({
      where: { id: context.params.id },
      data: {
        repliedText: body.repliedText,
        isInterested:
          typeof body.isInterested === "boolean" ? body.isInterested : undefined,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
  }
}

// DELETE = remove a comment
export async function DELETE(req: Request, context: Context) {
  try {
    await prisma.comment.delete({
      where: { id: context.params.id },
    });
    return NextResponse.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}