"use client";

import { Message } from "../types";

type MessageBubbleProps = {
  message: Message;
  isMine: boolean;
};

export default function MessageBubble({
  message,
  isMine,
}: MessageBubbleProps) {
  return (
    <div
      className={`flex ${
        isMine
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-all ${
          isMine
            ? "bg-blue-500 text-white rounded-br-md"
            : "bg-white border border-slate-200 text-slate-800 rounded-bl-md"
        }`}
      >
        <div
          className={`whitespace-pre-wrap break-words text-[15px] leading-6 ${
            isMine
              ? "text-white"
              : "text-slate-800"
          }`}
        >
          {message.content}
        </div>

        <div
          className={`mt-2 flex items-center gap-2 text-[11px] ${
            isMine
              ? "justify-end text-blue-100"
              : "justify-end text-slate-400"
          }`}
        >
          <span>
            {new Date(
              message.createdAt
            ).toLocaleTimeString(
              "ja-JP",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
          </span>

          {isMine && (
            <span className="font-semibold">
              {message.isRead
                ? "✓✓"
                : "✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}