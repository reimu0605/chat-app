import {
  Conversation,
  Message,
  User,
} from "../types";

// =========================
// Users
// =========================

export async function fetchUsers(
  currentUserId: string
): Promise<User[]> {
  const res = await fetch(
    `/api/users?currentUserId=${currentUserId}`
  );

  return res.json();
}

// =========================
// Friends
// =========================

export async function fetchFriends(
  userId: string
): Promise<User[]> {
  const res = await fetch(
    `/api/friends?userId=${userId}`
  );

  return res.json();
}

// =========================
// Friend Requests
// =========================

export async function fetchFriendRequests(
  userId: string
) {
  const res = await fetch(
    `/api/friend-request/received?userId=${userId}`
  );

  return res.json();
}

export async function fetchSentRequests(
  userId: string
): Promise<string[]> {

  const res = await fetch(
    `/api/friend-request/sent?userId=${userId}`
  );

  return res.json();
}

// =========================
// Conversations
// =========================

export async function fetchConversations(
  userId: string
): Promise<Conversation[]> {
  const res = await fetch(
    `/api/conversations/user/${userId}`,
    {
      headers: {
        "user-id": userId,
      },
    }
  );

  return res.json();
}

// =========================
// Messages
// =========================

export async function fetchMessages(
  conversationId: string,
  userId: string
): Promise<Message[]> {
  const res = await fetch(
    `/api/messages/${conversationId}`,
    {
      headers: {
        "user-id": userId,
      },
    }
  );

  return res.json();
}

// =========================
// Online
// =========================

export async function updateOnlineStatus(
  userId: string,
  isOnline: boolean
) {
  await fetch("/api/online", {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",

      "user-id": userId,
    },

    body: JSON.stringify({
      userId,
      isOnline,
    }),
  });
}