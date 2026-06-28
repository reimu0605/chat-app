export default function Home() {
  return (
    <main className="flex h-screen">
      {/* 左側 */}
      <div className="w-80 bg-zinc-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">ChatApp</h1>

        <input
          className="w-full rounded-lg p-2 text-black"
          placeholder="🔍 ユーザー検索"
        />

        <div className="mt-6 space-y-2">
          <div className="rounded-lg bg-zinc-800 p-3 cursor-pointer hover:bg-zinc-700">
            山田 太郎
          </div>

          <div className="rounded-lg bg-zinc-800 p-3 cursor-pointer hover:bg-zinc-700">
            鈴木 花子
          </div>

          <div className="rounded-lg bg-zinc-800 p-3 cursor-pointer hover:bg-zinc-700">
            佐藤 次郎
          </div>
        </div>
      </div>

      {/* 右側 */}
      <div className="flex flex-1 flex-col">
        <div className="border-b p-4 text-xl font-bold">
          山田 太郎
        </div>

        <div className="flex-1 bg-gray-100 p-6">
          <div className="mb-4">
            <div className="inline-block rounded-lg bg-white p-3 shadow">
              こんにちは！
            </div>
          </div>

          <div className="text-right">
            <div className="inline-block rounded-lg bg-blue-500 text-white p-3 shadow">
              はじめまして！
            </div>
          </div>
        </div>

        <div className="border-t p-4">
          <input
            className="w-full rounded-lg border p-3"
            placeholder="メッセージを入力..."
          />
        </div>
      </div>
    </main>
  );
}