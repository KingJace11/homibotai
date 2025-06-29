import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// POST = create a new comment
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newComment = await prisma.comment.create({
      data: {
        name: body.name,
        comment: body.comment,
        timestamp: body.timestamp,
        isInterested: body.isInterested ?? false,
        repliedText: body.repliedText ?? null,
        intent: body.intent ?? "generic", // ✅ Fallback if missing
      },
    });

    return NextResponse.json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}