import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { requestId } = await req.json();

  if (!requestId) {
    return NextResponse.json(
      { message: "requestIdがありません" },
      { status: 400 }
    );
  }

  const request = await prisma.friendRequest.update({
  where: {
    id: requestId,
  },
  data: {
    status: "ACCEPTED",
  },
});

return NextResponse.json({
  success: true,
  request,
});

  return NextResponse.json(request);
}