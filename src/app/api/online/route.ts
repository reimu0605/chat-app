import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const authUserId =
  req.headers.get("user-id");

if (!authUserId) {
  return NextResponse.json(
    {
      message: "未ログインです",
    },
    {
      status: 401,
    }
  );
}
    const {
      userId,
      isOnline,
    } = await req.json();

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isOnline,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "サーバーエラー",
      },
      {
        status: 500,
      }
    );
  }
}