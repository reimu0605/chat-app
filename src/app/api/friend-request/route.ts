import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      senderId,
      receiverId,
    } = await req.json();

    if (!senderId || !receiverId) {
      return NextResponse.json(
        {
          message: "データ不足",
        },
        {
          status: 400,
        }
      );
    }

    // 自分には送れない
    if (senderId === receiverId) {
      return NextResponse.json(
        {
          message: "自分には送れません",
        },
        {
          status: 400,
        }
      );
    }

    // 重複チェック
    const exists =
      await prisma.friendRequest.findUnique({
        where: {
          senderId_receiverId: {
            senderId,
            receiverId,
          },
        },
      });

    if (exists) {
      return NextResponse.json(
        {
          message: "申請済みです",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.friendRequest.create({
      data: {
        senderId,
        receiverId,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

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