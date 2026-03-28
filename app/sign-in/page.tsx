"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Stub: simulate a brief delay then redirect
    await new Promise((r) => setTimeout(r, 600));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#e4e4e7] flex flex-col">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-[100px]" />
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 mb-10 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            InstantFunnel<span className="text-indigo-400">.ai</span>
          </span>
        </Link>

        {/* Card */}
        <div className="w-full max-w-sm">
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8">
            <h1 className="text-2xl font-bold text-center mb-1">Welcome back</h1>
            <p className="text-sm text-zinc-400 text-center mb-8">
              Sign in to your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm text-zinc-300 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-zinc-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 pr-11 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-sm text-zinc-400 text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
