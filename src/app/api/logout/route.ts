import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isOnline: false,
      },
    });

    return NextResponse.json({
      message: "ログアウト成功",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "サーバーエラー" },
      { status: 500 }
    );
  }
}