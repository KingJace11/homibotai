import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const body = await request.json();

  const updatedComment = await prisma.comment.update({
    where: { id },
    data: { repliedText: body.repliedText },
  });

  return NextResponse.json(updatedComment);
}