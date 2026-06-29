"use client";

import { useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { User } from "../types";
import { Send } from "lucide-react";

type Props = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  conversationId: string | null;
  selectedUser: User | null;
  currentUserId: string | null;

  setUsers: Dispatch<SetStateAction<User[]>>;

  shouldScrollRef: React.MutableRefObject<boolean>;

  loadMessages: (
    conversationId: string
  ) => Promise<void>;

  loadAll: () => Promise<void>;

  setMessageState: Dispatch<SetStateAction<string>>;
};

export default function MessageInput({
  message,
  setMessage,
  conversationId,
  selectedUser,
  currentUserId,
  setUsers,
  shouldScrollRef,
  loadMessages,
  loadAll,
  setMessageState,
}: Props) {
  console.log("conversationId", conversationId);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef =
  useRef<HTMLInputElement>(null);
async function handleSend(
  e: React.FormEvent
) {
  console.log("送信時", conversationId);
  e.preventDefault();

  if (!conversationId) {
    alert("ユーザーを選択してください");
    return;
  }
  
if (!message.trim() && !file) {
  return;
}
  let fileUrl = "";
  let fileName = "";
  let fileType = "";
  let fileSize = 0;

  // ファイルがあるならCloudinaryへアップロード
  if (file) {
    const formData = new FormData();

    formData.append("file", file);

    const upload = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!upload.ok) {
      alert("アップロード失敗");
      return;
    }

    const uploaded = await upload.json();

    fileUrl = uploaded.url;
    fileName = uploaded.originalName;
    fileType = uploaded.type;
    fileSize = uploaded.size;

    console.log("アップロード成功", uploaded);
  }

  console.log(fileUrl);

 await fetch("/api/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "user-id": currentUserId ?? "",
  },
  body: JSON.stringify({
    content: message,
    senderId: currentUserId,
    conversationId,

    // ↓追加
    fileUrl,
    fileName,
    fileType,
    fileSize,
  }),
});
if (selectedUser) {
  setUsers((prev) =>
    prev.map((u) =>
      u.id === selectedUser.id
        ? {
            ...u,
            lastMessage: message || fileName,
          }
        : u
    )
  );
}

setMessageState("");
setFile(null);

if (fileInputRef.current) {
  fileInputRef.current.value = "";
}

shouldScrollRef.current = true;

await loadMessages(conversationId);

await loadAll();
}

  return (
    <form
  onSubmit={handleSend}
  className="relative flex gap-3 border-t border-slate-200 bg-white p-5"
>
 {file && (

  <div className="absolute bottom-20 left-5 right-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        {file.type.startsWith("image/") ? (

          <img
            src={URL.createObjectURL(file)}
            className="h-16 w-16 rounded-xl object-cover"
          />

        ) : (

          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 text-3xl">
            📄
          </div>

        )}

        <div>

          <div className="font-semibold text-slate-800">
            {file.name}
          </div>

          <div className="text-sm text-slate-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </div>

        </div>

      </div>

      <button
        type="button"
        onClick={() => {
          setFile(null);

          if (fileInputRef.current)
            fileInputRef.current.value = "";
        }}
        className="rounded-full bg-red-100 px-3 py-1 text-red-600 hover:bg-red-200"
      >
        ✕
      </button>

    </div>

  </div>

)} 
        <input
  ref={fileInputRef}
  type="file"
  id="file"
  hidden
  onChange={(e) =>
    setFile(e.target.files?.[0] ?? null)
  }
/>

<label
  htmlFor="file"
  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-slate-100 hover:bg-slate-200"
>
  📎
</label>
      <input
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Type a message..."
        className="h-12 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />

      <button
  type="submit"
  disabled={!message.trim() && !file}
  className="
  flex
  h-12
  w-12
  items-center
  justify-center
  rounded-2xl
  bg-blue-600
  text-white
  transition
  hover:bg-blue-700
  disabled:bg-gray-400
  "
>

<Send size={20}/>

</button>
    </form>
  );
}