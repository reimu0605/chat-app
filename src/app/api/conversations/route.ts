import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
try {

const userId =
  req.headers.get("user-id");

if (!userId) {
  return NextResponse.json(
    {
      message: "未ログインです",
    },
    {
      status: 401,
    }
  );
}

const { userId1, userId2 } = await req.json();

const conversations =
  await prisma.conversation.findMany({
    include: {
      members: true,
    },
  });

const existingConversation =
  conversations.find((conversation) => {
    const userIds =
      conversation.members.map(
        (member) => member.userId
      );

    return (
      userIds.length === 2 &&
      userIds.includes(userId1) &&
      userIds.includes(userId2)
    );
  });

if (existingConversation) {
  return NextResponse.json(
    existingConversation
  );
}

const conversation =
  await prisma.conversation.create({
    data: {
      members: {
        create: [
          {
            userId: userId1,
          },
          {
            userId: userId2,
          },
        ],
      },
    },
    include: {
      members: true,
    },
  });

return NextResponse.json(
  conversation
);

} catch (error) {
console.error(error);

return NextResponse.json(
  { message: "サーバーエラー" },
  { status: 500 }
);

}
}