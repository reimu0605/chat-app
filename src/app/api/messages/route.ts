import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const userId = req.headers.get("user-id");

    if (!userId) {
      return NextResponse.json(
        { message: "未ログインです" },
        { status: 401 }
      );
    }

    const {
  content,
  senderId,
  conversationId,
  fileUrl,
  fileName,
  fileType,
  fileSize,
} = await req.json();

    if (!content && !fileUrl) {
  return NextResponse.json(
    {
      message: "メッセージまたはファイルを送信してください",
    },
    {
      status: 400,
    }
  );
}

    const message = await prisma.message.create({
  data: {
    content,
    senderId: userId,
    conversationId,

    fileUrl,
    fileName,
    fileType,
    fileSize,
  },
});
    await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {},
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "サーバーエラー" },
      { status: 500 }
    );
  }
}