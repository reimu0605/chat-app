"use client";

import { User } from "../types";

type Props = {
  selectedUser: User | null;
};

export default function ChatHeader({
  selectedUser,
}: Props) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-5 backdrop-blur">

      {selectedUser ? (
        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-md">
            {selectedUser.username
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              {selectedUser.username}
            </h2>

            <p
              className={`text-sm ${
                selectedUser.isOnline
                  ? "text-green-500"
                  : "text-slate-400"
              }`}
            >
              {selectedUser.isOnline
                ? "● Online"
                : "● Offline"}
            </p>

          </div>

        </div>
      ) : (
        <div>

          <h2 className="text-lg font-bold text-slate-900">
            Lumina
          </h2>

          <p className="text-sm text-slate-500">
            Select a friend to start chatting
          </p>

        </div>
      )}

      <button
        onClick={async () => {

          const userId =
            localStorage.getItem("userId");

          await fetch("/api/logout", {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              userId,
            }),
          });

          localStorage.removeItem("userId");

          window.location.href =
            "/login";
        }}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
      >
        Sign Out
      </button>

    </header>
  );
}