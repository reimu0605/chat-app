import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } =
      new URL(req.url);

    const currentUserId =
  searchParams.get("currentUserId");

if (!currentUserId) {
  return NextResponse.json(
    {
      message: "未ログインです",
    },
    {
      status: 401,
    }
  );
}

const users =
  await prisma.user.findMany({
        where: {
          id: {
            not:
              currentUserId ??
              undefined,
          },
        },
      });

    const usersWithInfo =
      await Promise.all(
        users.map(async (user) => {
          const conversation =
            await prisma.conversation.findFirst({
              where: {
                members: {
                  some: {
                    userId:
                      currentUserId ??
                      "",
                  },
                },

                AND: {
                  members: {
                    some: {
                      userId: user.id,
                    },
                  },
                },
              },

              include: {
                messages: {
                  orderBy: {
                    createdAt:
                      "desc",
                  },
                  take: 1,
                },
              },
            });

          let unreadCount = 0;

          if (conversation) {
            unreadCount =
              await prisma.message.count({
                where: {
                  conversationId:
                    conversation.id,

                  isRead: false,

                  NOT: {
                    senderId:
                      currentUserId ??
                      "",
                  },
                },
              });
          }
const last =
  conversation?.messages[0];
          return {
            id: user.id,
            username:
              user.username,
            email: user.email,
            isOnline:
              user.isOnline,

            lastMessage:
  last?.content ||
  (
    last?.fileType?.startsWith("image/")
      ? "📷 写真"
      : last?.fileName
      ? `📎 ${last.fileName}`
      : ""
  ),

            unreadCount,
          };
        })
      );

    return NextResponse.json(
      usersWithInfo
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "サーバーエラー" },
      { status: 500 }
    );
  }
}