"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
  alert(data.message);
  setLoading(false);
  return;
}

localStorage.setItem("userId", data.user.id);
localStorage.setItem("username", data.user.username);

alert("ログイン成功！");

setLoading(false);
window.location.href = "/chat";

      // 後でチャット画面へ
      // router.push("/chat");
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
      setLoading(false);
    }
  }

return (
  <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-6">
    <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-10 shadow-2xl backdrop-blur">
      <div className="mb-8 text-center">

        <div className="mb-4 text-5xl">
          💬
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Lumina
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Connect beautifully.
        </p>
      </div>

      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
        >
          {loading
            ? "Signing in..."
            : "Sign In"}
        </button>

      </form>

      <div className="mt-8 text-center text-sm text-slate-500">
        New here?{" "}
        <a
          href="/register"
          className="font-semibold text-blue-600 transition hover:text-blue-700"
        >
          Create an account →
        </a>
      </div>
    </div>
  </main>
);
}