import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "userIdがありません" },
      { status: 400 }
    );
  }

  const requests = await prisma.friendRequest.findMany({
    where: {
      receiverId: userId,
      status: "PENDING",
    },

    include: {
      sender: true,
    },
  });

  return NextResponse.json(requests);
}