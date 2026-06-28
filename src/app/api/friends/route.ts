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
      status: "ACCEPTED",
      OR: [
        {
          senderId: userId,
        },
        {
          receiverId: userId,
        },
      ],
    },
    include: {
      sender: true,
      receiver: true,
    },
  });

  const friends = Array.from(
  new Map(
    requests
      .map((request) =>
        request.senderId === userId
          ? request.receiver
          : request.sender
      )
      .map((user) => [user.id, user])
  ).values()
);

  return NextResponse.json(friends);
}