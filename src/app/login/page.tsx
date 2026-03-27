"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials. Access denied.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6 selection:bg-[#c5a358] selection:text-black">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-10">
          <span className="text-[#c5a358] tracking-[0.5em] uppercase text-[10px] mb-4 block animate-pulse">
            Internal Access Only
          </span>
          <h1 className="text-4xl font-serif text-white tracking-tight">
            Swarn <span className="text-[#c5a358] italic font-light">Srinkhla</span>
          </h1>
          <p className="text-[#ffffff]/30 text-[11px] mt-4 uppercase tracking-[0.2em]">
            Administrative Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#141414] border border-[#c5a358]/20 p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#c5a358]/60 mb-2">
                Identifier
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="admin@resort.com"
                className="w-full bg-transparent border-b border-[#c5a358]/20 py-3 text-white focus:outline-none focus:border-[#c5a358] transition-colors text-sm tracking-wide"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#c5a358]/60 mb-2">
                Passcode
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-[#c5a358]/20 py-3 text-white focus:outline-none focus:border-[#c5a358] transition-colors text-sm"
              />
            </div>

            {error && (
              <p className="text-red-400 text-[10px] uppercase tracking-widest text-center animate-bounce">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-[#c5a358] text-black text-[11px] font-bold uppercase tracking-[0.3em] py-4 hover:bg-[#ffffff] transition-all duration-500 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Authorize Entry"}
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-[9px] text-[#ffffff]/20 uppercase tracking-[0.3em]">
          Secured by Auth.js & Prisma 7
        </p>
      </div>
    </div>
  );
}