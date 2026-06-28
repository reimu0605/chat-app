import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json([], {
      status: 400,
    });
  }

  const requests =
    await prisma.friendRequest.findMany({
      where: {
        senderId: userId,
        status: "PENDING",
      },
      select: {
        receiverId: true,
      },
    });

  return NextResponse.json(
    requests.map((r) => r.receiverId)
  );
}