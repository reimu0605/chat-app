import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
req: Request,
{
params,
}: {
params: Promise<{
conversationId: string;
}>;
}
) {
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
  
  const { conversationId } =
await params;

console.log(
  "conversationId:",
  conversationId
);


await prisma.message.updateMany({
  where: {
    conversationId,

    isRead: false,

    NOT: {
      senderId: userId ?? "",
    },
  },

  data: {
    isRead: true,
  },
});

const messages =
  await prisma.message.findMany({
    where: {
      conversationId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

return NextResponse.json(
  messages
);

} catch (error) {
console.error(error);

return NextResponse.json(
  { message: "サーバーエラー" },
  { status: 500 }
);

}
}