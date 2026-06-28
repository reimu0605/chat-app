import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      userId: string;
    }>;
  }
) {
  try {
    const { userId } = await params;

    const loginUserId =
      req.headers.get("user-id");

    if (!loginUserId) {
      return NextResponse.json(
        {
          message: "未ログインです",
        },
        {
          status: 401,
        }
      );
    }

    const conversations =
      await prisma.conversation.findMany({
        where: {
          members: {
            some: {
              userId,
            },
          },
        },

        orderBy: {
          updatedAt: "desc",
        },

        include: {
          members: {
            include: {
              user: true,
            },
          },

          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      });

    const conversationsWithUnread =
      await Promise.all(
        conversations.map(async (conversation) => {
          const unreadCount =
            await prisma.message.count({
              where: {
                conversationId:
                  conversation.id,

                isRead: false,

                NOT: {
                  senderId: userId,
                },
              },
            });

          return {
            ...conversation,
            unreadCount,
          };
        })
      );

    return NextResponse.json(
      conversationsWithUnread
    );
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