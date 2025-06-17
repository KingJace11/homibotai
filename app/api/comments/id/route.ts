import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest } from "next";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const body = await request.json();

  const updatedComment = await prisma.comment.update({
    where: { id: params.id },
    data: { repliedText: body.repliedText },
  });

  return NextResponse.json(updatedComment);
}