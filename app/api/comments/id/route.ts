import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: Record<string, string> }
) {
  const id = context.params.id;
  const body = await request.json();

  const updatedComment = await prisma.comment.update({
    where: { id },
    data: { repliedText: body.repliedText },
  });

  return NextResponse.json(updatedComment);
}