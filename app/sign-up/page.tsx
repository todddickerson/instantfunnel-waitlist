"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, ArrowRight, Eye, EyeOff, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { email: prefillEmail } = use(searchParams);
  const router = useRouter();
  const [email, setEmail] = useState(
    typeof prefillEmail === "string" ? prefillEmail : ""
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Invite-only gate state
  const [signupOpen, setSignupOpen] = useState<boolean | null>(null);
  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    fetch("/api/signup-status")
      .then((res) => res.json())
      .then((data) => setSignupOpen(data.open))
      .catch(() => setSignupOpen(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    // If signup is closed, validate invite code first
    if (signupOpen === false) {
      if (!inviteCode.trim()) {
        setError("InstantFunnel.ai is invite-only. Enter your invite code to continue.");
        setLoading(false);
        return;
      }

      const inviteRes = await fetch("/api/invite-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: inviteCode.trim(), email }),
      });
      const inviteData = await inviteRes.json();

      if (!inviteData.valid) {
        setError(inviteData.error || "InstantFunnel.ai is invite-only. Enter your invite code to continue.");
        setLoading(false);
        return;
      }
    }

    // Sign up with Supabase
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    // If signup was open, close it after the first successful user
    if (signupOpen === true) {
      // Fire-and-forget: close signup after first user
      fetch("/api/signup-status", { method: "POST" }).catch(() => {});
    }

    router.push(`/waitlist-confirmed?email=${encodeURIComponent(email)}`);
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
            <h1 className="text-2xl font-bold text-center mb-1">Create your account</h1>
            <p className="text-sm text-zinc-400 text-center mb-8">
              Get early access to InstantFunnel.ai
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
                    placeholder="At least 8 characters"
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

              <div>
                <label htmlFor="confirm-password" className="block text-sm text-zinc-300 mb-1.5">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirm ? "text" : "password"}
                    required
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-12 px-4 pr-11 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Invite code field — only shown when signup is closed */}
              {signupOpen === false && (
                <div>
                  <label htmlFor="invite-code" className="block text-sm text-zinc-300 mb-1.5">
                    Invite code
                  </label>
                  <div className="relative">
                    <input
                      id="invite-code"
                      type="text"
                      required
                      placeholder="Enter your invite code"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      className="w-full h-12 px-4 pl-10 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-mono"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">
                    InstantFunnel.ai is invite-only during early access.
                  </p>
                </div>
              )}

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || signupOpen === null}
                className="w-full h-12 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-sm text-zinc-400 text-center mt-6">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
