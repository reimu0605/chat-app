"use client";

import { RefObject } from "react";

import {
  File,
  FileImage,
  FileArchive,
  FileAudio,
  FileVideo,
  FileText,
  FileSpreadsheet,
  FileCode2,
} from "lucide-react";
function getFileIcon(fileName?: string) {
  if (!fileName)
    return <File size={30} />;

  const ext =
    fileName.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "webp":
      return (
        <FileImage
          size={30}
          className="text-sky-500"
        />
      );

    case "pdf":
      return (
        <FileText
          size={30}
          className="text-red-500"
        />
      );

    case "zip":
    case "rar":
    case "7z":
      return (
        <FileArchive
          size={30}
          className="text-yellow-500"
        />
      );

    case "mp3":
    case "wav":
    case "ogg":
      return (
        <FileAudio
          size={30}
          className="text-purple-500"
        />
      );

    case "mp4":
    case "mov":
    case "avi":
      return (
        <FileVideo
          size={30}
          className="text-pink-500"
        />
      );

    case "doc":
    case "docx":
      return (
        <FileText
          size={30}
          className="text-blue-500"
        />
      );

    case "xls":
    case "xlsx":
      return (
        <FileSpreadsheet
          size={30}
          className="text-green-500"
        />
      );

    case "ts":
    case "tsx":
    case "js":
    case "jsx":
    case "json":
    case "html":
    case "css":
      return (
        <FileCode2
          size={30}
          className="text-orange-500"
        />
      );

    case "exe":
    case "msi":
      return (
        <File
          size={30}
          className="text-gray-600"
        />
      );

    default:
      return (
        <File
          size={30}
          className="text-slate-500"
        />
      );
  }
}
import { Message, User } from "../types";

type Props = {
  messages: Message[];
  selectedUser: User | null;
  currentUserId: string | null;
  bottomRef: RefObject<HTMLDivElement | null>;
  messageContainerRef: RefObject<HTMLDivElement | null>;
};

export default function MessageList({
  messages,
  selectedUser,
  currentUserId,
  bottomRef,
  messageContainerRef,
}: Props) {
  return (
    <div
      ref={messageContainerRef}
      className="flex-1 overflow-y-auto bg-slate-50 p-6"
    >
      <div className="space-y-2">

        {messages.map((msg) => {

          const isMine =
            msg.senderId === currentUserId;

          return (

            <div
              key={msg.id}
              className={`flex ${
                isMine
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              {/* 相手アイコン */}
              {!isMine && selectedUser && (

                <div className="mr-3 mt-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white">

                  {selectedUser.username
                    .charAt(0)
                    .toUpperCase()}

                </div>

              )}

              {/* メッセージ */}
              <div
                className={`max-w-[70%] rounded-3xl px-5 py-3 shadow-sm ${
                  isMine
                    ? "rounded-br-md bg-blue-600 text-white"
                    : "rounded-bl-md border border-slate-200 bg-white text-slate-800"
                }`}
              >

                <div className="space-y-2">

  {msg.content && (
    <div className="whitespace-pre-wrap break-words leading-7">
      {msg.content}
    </div>
  )}

  {msg.fileUrl && msg.fileType?.startsWith("image/") ? (

  <div className="overflow-hidden rounded-2xl border bg-white">

  <a
  href={msg.fileUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  <img
    src={msg.fileUrl}
    alt={msg.fileName}
    className="
max-w-full
max-h-96
object-contain
cursor-zoom-in
rounded-xl
transition
hover:opacity-90
"
  />
</a>

<div
  className={`border-t p-3 ${
    isMine
      ? "bg-blue-700 text-white"
      : "bg-slate-50"
  }`}
>

  <div
    className={`truncate text-sm font-semibold ${
      isMine
        ? "text-white"
        : "text-slate-800"
    }`}
  >
    📷 {msg.fileName}
  </div>

  {msg.fileSize && (
    <div
      className={`text-xs ${
        isMine
          ? "text-blue-100"
          : "text-slate-500"
      }`}
    >
      {(msg.fileSize / 1024 / 1024).toFixed(2)} MB
    </div>
  )}

</div>

</div>

) : msg.fileUrl ? (

 <a
  href={msg.fileUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
>

  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100">

    {getFileIcon(msg.fileName)}

</div>

  <div className="min-w-0 flex-1">

    <div className="truncate font-semibold text-slate-800">
      {msg.fileName}
    </div>

    <div className="mt-1 text-xs text-slate-500">

      {msg.fileType}

      {msg.fileSize && (
        <> ・ {(msg.fileSize / 1024 / 1024).toFixed(2)} MB</>
      )}

    </div>

  </div>

</a>

) : null}

</div>

                <div
                  className={`mt-1.5 text-right text-xs ${
                    isMine
                      ? "text-blue-100"
                      : "text-slate-400"
                  }`}
                >

                  {new Date(
                    msg.createdAt
                  ).toLocaleTimeString(
                    "ja-JP",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}

                  {isMine && (
                    <span className="ml-2">
                      {msg.isRead
                        ? "✓✓"
                        : "✓"}
                    </span>
                  )}

                </div>

              </div>

            </div>

          );

        })}

        <div ref={bottomRef} />

      </div>
    </div>
  );
}