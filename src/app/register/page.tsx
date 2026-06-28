import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-10 shadow-2xl backdrop-blur">
        <div className="mb-10 text-center">

  <div className="mb-5 flex justify-center">
    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-4xl shadow-lg shadow-blue-200">
      💬
    </div>
  </div>

  <h1 className="text-4xl font-bold tracking-tight text-slate-900">
    Lumina
  </h1>

  <p className="mt-3 text-sm text-slate-500">
    Create your account.
  </p>

</div>

        <RegisterForm />
      </div>
    </main>
  );
}