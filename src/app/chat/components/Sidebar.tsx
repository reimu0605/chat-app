"use client";

import { User } from "../types";

type SidebarProps = {
  users: User[];
  friends: User[];
  friendRequests: any[];

  selectedUser: User | null;

  search: string;
  setSearch: (value: string) => void;

  sentRequests: string[];

  onSelectUser: (user: User) => void;

  onAcceptRequest: (
    requestId: string
  ) => void;

  onSendFriendRequest: (
    userId: string
  ) => void;
};

export default function Sidebar({
  users,
  friends,
  friendRequests,
  selectedUser,
  search,
  setSearch,
  sentRequests,
  onSelectUser,
  onAcceptRequest,
  onSendFriendRequest,
}: SidebarProps) {

const displayUsers =
  (search.trim() === ""
    ? friends
    : users.filter((user) =>
        user.username
          .toLowerCase()
          .includes(search.toLowerCase())
      )
  ).map((friend) => {

    const info = users.find(
      (u) => u.id === friend.id
    );

    return {
      ...friend,
      lastMessage:
        info?.lastMessage ?? "",
      unreadCount:
        info?.unreadCount ?? 0,
    };

  });


  return (

    <aside className="w-80 border-r border-slate-200 bg-white/70 p-6 backdrop-blur-xl">

      {/* タイトル */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-900">
          People
        </h2>

        <p className="text-sm text-slate-500">
          Start a new conversation
        </p>

      </div>

      {/* 検索 */}

      <input
        type="text"
        placeholder="Search people..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
mb-6
h-11
w-full
rounded-2xl
border
border-slate-200
bg-slate-50
px-4
text-sm
text-slate-800
placeholder:text-slate-500
outline-none
transition
focus:border-blue-500
focus:bg-white
focus:ring-4
focus:ring-blue-100
"
      />

      {/* フレンド申請 */}

      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">

        Friend Requests

      </h3>

      {friendRequests.length === 0 ? (

        <p className="mb-6 text-sm text-slate-400">
          No pending requests
        </p>

      ) : (

        <div className="mb-6 space-y-3">

          {friendRequests.map(
            (request) => (

              <div
                key={request.id}
                className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
              >

                <div className="font-semibold">

                  {request.sender.username}

                </div>

                <button
                  onClick={() =>
                    onAcceptRequest(
                      request.id
                    )
                  }
                  className="mt-3 w-full rounded-xl bg-green-500 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
                >

                  Accept

                </button>

              </div>

            )
          )}

        </div>

      )}

      {/* フレンド一覧 */}

      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">

        {search ? "Search Results" : "Friends"}

      </h3>

      <div className="space-y-1">
                {displayUsers.map((user) => {

          const isFriend =
            friends.some(
              (friend) =>
                friend.id === user.id
            );

          const requestSent =
            sentRequests.includes(
              user.id
            );

          return (

            <div
              key={user.id}
              onClick={() =>
                onSelectUser(user)
              }
              className={`cursor-pointer rounded-2xl border border-transparent p-4 transition-all duration-200 ${
                selectedUser?.id === user.id
                  ? "border-blue-500 bg-blue-100"
                  : "hover:bg-slate-100"
              }`}
            >

              <div className="flex items-center gap-3">

                {/* アイコン */}

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">

                  {user.username
                    .charAt(0)
                    .toUpperCase()}

                </div>

                {/* 情報 */}

                <div className="min-w-0 flex-1">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <span
                        className={`font-semibold ${
                          selectedUser?.id ===
                          user.id
                            ? "text-blue-700"
                            : "text-slate-800"
                        }`}
                      >
                        {user.username}
                      </span>

                      <span
                        className={`text-xs ${
                          user.isOnline
                            ? "text-green-500"
                            : "text-slate-400"
                        }`}
                      >
                        ●
                      </span>

                    </div>

                    {user.unreadCount !==
                      undefined &&
                      user.unreadCount >
                        0 && (

                        <div className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">

                          {user.unreadCount}

                        </div>

                    )}

                  </div>

                  <div className="mt-1 truncate text-sm text-slate-500">

  {user.lastMessage
    ? user.lastMessage
    : "Tap to start chatting"}

</div>

                </div>

                {/* フレンド申請 */}

                {!isFriend && (

                  requestSent ? (

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />

                      </svg>

                    </div>

                  ) : (

                    <button
                      onClick={(e) => {

                        e.stopPropagation();

                        onSendFriendRequest(
                          user.id
                        );

                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-lg text-white transition hover:bg-blue-600"
                    >

                      +

                    </button>

                  )

                )}

              </div>

            </div>

          );

        })}
              </div>

    </aside>

  );

}