"use client";

import { useEffect, useRef, useState } from "react";

import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";

import type {
  User,
  Message,
  Conversation,
} from "./types";

import {
  fetchUsers,
  fetchFriends,
  fetchFriendRequests,
  fetchConversations,
  fetchSentRequests,
  fetchMessages,
  updateOnlineStatus,
} from "./lib/api";

export default function ChatPage() {
  // ==========================
  // State
  // ==========================

  const [users, setUsers] =
    useState<User[]>([]);

  const [friends, setFriends] =
    useState<User[]>([]);

  const [friendRequests, setFriendRequests] =
    useState<any[]>([]);

  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  const [conversationId, setConversationId] =
    useState<string | null>(null);

  const [message, setMessage] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [sentRequests, setSentRequests] =
    useState<string[]>([]);

  // ==========================
  // Refs
  // ==========================

  const bottomRef =
    useRef<HTMLDivElement>(null);

  const messageContainerRef =
    useRef<HTMLDivElement>(null);

  const shouldScrollRef =
    useRef(false);

  // ==========================
  // Current User
  // ==========================

  const currentUserId =
    typeof window !== "undefined"
      ? localStorage.getItem("userId")
      : null;

  // ==========================
  // Search
  // ==========================

  const filteredUsers = users.filter(
  (user) =>
    user.id !== currentUserId &&
    user.username
      .toLowerCase()
      .includes(search.toLowerCase())
);

  // ==========================
  // Scroll
  // ==========================

  const scrollToBottom = (
    behavior: ScrollBehavior = "smooth"
  ) => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior,
      });
    }, 0);
  };
  // ==========================
  // Load All
  // ==========================

  const loadAll = async () => {
    if (!currentUserId) return;

    const [
  usersData,
  friendsData,
  requestsData,
  conversationsData,
  sentRequestsData,
] = await Promise.all([
  fetchUsers(currentUserId),
  fetchFriends(currentUserId),
  fetchFriendRequests(currentUserId),
  fetchConversations(currentUserId),
  fetchSentRequests(currentUserId),
]);

setUsers(usersData);
setFriends(friendsData);
setFriendRequests(requestsData);
setConversations(conversationsData);
setSentRequests(sentRequestsData);
  };

  // ==========================
  // Load Messages
  // ==========================

 const loadMessages = async (
  conversationId: string
) => {
  if (!currentUserId) return;

  const data = await fetchMessages(
    conversationId,
    currentUserId
  );



  setMessages(data);
};

  // ==========================
  // Initial Load
  // ==========================

  useEffect(() => {
    if (!currentUserId) {
      window.location.href = "/login";
      return;
    }

    loadAll();
  }, []);

  // ==========================
  // Conversation Changed
  // ==========================

  useEffect(() => {
    if (!conversationId) return;

    loadMessages(conversationId);

    scrollToBottom("auto");
  }, [conversationId]);

  // ==========================
  // Auto Refresh
  // ==========================

  useEffect(() => {
    const timer = setInterval(async () => {
      await loadAll();

      if (conversationId) {
        await loadMessages(
          conversationId
        );
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [conversationId]);
    // ==========================
  // Online Status
  // ==========================

  useEffect(() => {
    if (!currentUserId) return;

    updateOnlineStatus(
      currentUserId,
      true
    );

    const handleVisibility = () => {
      updateOnlineStatus(
        currentUserId,
        document.visibilityState === "visible"
      );
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  // ==========================
  // Auto Scroll
  // ==========================

  useEffect(() => {
    const container =
      messageContainerRef.current;

    if (!container) return;

    if (shouldScrollRef.current) {
      scrollToBottom();

      shouldScrollRef.current = false;

      return;
    }

    const isNearBottom =
      container.scrollHeight -
        container.scrollTop -
        container.clientHeight <
      120;

    if (isNearBottom) {
      scrollToBottom();
    }
  }, [messages]);

  // ==========================
  // Render
  // ==========================

  return (
    <main className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            <Sidebar
  users={filteredUsers}
  friends={friends}
  friendRequests={friendRequests}

  selectedUser={selectedUser}

  search={search}
  setSearch={setSearch}

  sentRequests={sentRequests}

onSelectUser={async (user) => {
  console.log("conversations", conversations);

  
  setSelectedUser(user);

  const conversation = conversations.find((c) =>
    c.members.some((m) => m.user.id === user.id)
  );

  console.log("conversation", conversation);

  if (!conversation) {

  const res = await fetch("/api/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-id": currentUserId ?? "",
    },
    body: JSON.stringify({
      userId1: currentUserId,
      userId2: user.id,
    }),
  });

  const newConversation = await res.json();

  setConversationId(newConversation.id);

  await loadAll();

shouldScrollRef.current = true;

await loadMessages(newConversation.id);

return;
}

  console.log("conversationId", conversation.id);

  setConversationId(conversation.id);

  shouldScrollRef.current = true;

  await loadMessages(conversation.id);
}}

  onAcceptRequest={async (requestId) => {
  const res = await fetch(
    "/api/friend-request/accept",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId,
      }),
    }
  );

  if (!res.ok) return;

  await loadAll();
}}

  onSendFriendRequest={async (userId) => {

  const res = await fetch("/api/friend-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-id": currentUserId ?? "",
    },
    body: JSON.stringify({
      senderId: currentUserId,
      receiverId: userId,
    }),
  });

  if (!res.ok) return;

  setSentRequests((prev) => [
    ...prev,
    userId,
  ]);

}}
/>

      <section className="flex flex-1 flex-col">

        <ChatHeader
          selectedUser={selectedUser}
        />



        <MessageList
          messages={messages}
          currentUserId={currentUserId ?? ""}
          selectedUser={selectedUser}
          bottomRef={bottomRef}
          messageContainerRef={messageContainerRef}
        />
                <MessageInput
          message={message}
          setMessage={setMessage}
          conversationId={conversationId}
          selectedUser={selectedUser}
          currentUserId={currentUserId}
          setUsers={setUsers}
          shouldScrollRef={shouldScrollRef}
          loadMessages={loadMessages}
          loadAll={loadAll}
          setMessageState={setMessage}
        />

      </section>

    </main>

  );

}