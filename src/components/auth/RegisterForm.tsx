"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/schemas/register";

export default function RegisterForm() {
const router = useRouter();
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message);
      return;
    }

    alert("登録成功！");
    reset();

    // 次回ログイン画面へ移動させる
    // router.push("/login")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          ユーザー名
        </label>

        <input
          {...register("username")}
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

        {errors.username && (
          <p className="mt-1 text-sm text-red-500">
            {errors.username.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          メールアドレス
        </label>

        <input
          type="email"
          {...register("email")}
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          パスワード
        </label>

        <input
          type="password"
          {...register("password")}
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className="h-12 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
      >
        {isSubmitting ? "登録中..." : "新規登録"}
      </button>
<div className="pt-2 text-center text-sm text-slate-500">
  Already have an account?{" "}
  <a
    href="/login"
    className="font-semibold text-blue-600 transition hover:text-blue-700"
  >
    Sign In →
  </a>
</div>
    </form>
  );
}