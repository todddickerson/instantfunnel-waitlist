"use client";

import { useState } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Check, ArrowRight } from "lucide-react";

export default function WaitlistConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { email } = use(searchParams);
  const displayEmail = typeof email === "string" ? email : "";
  const router = useRouter();

  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);

  const handleApplyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;

    setLoading(true);
    setError("");

    const res = await fetch("/api/invite-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: inviteCode.trim(), email: displayEmail }),
    });
    const data = await res.json();

    if (!data.valid) {
      setError(data.error || "Invalid invite code");
      setLoading(false);
      return;
    }

    setApplied(true);
    setLoading(false);

    // Brief success flash, then redirect to dashboard
    setTimeout(() => router.push("/dashboard"), 1200);
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
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 text-center">
            {/* Success icon */}
            <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5">
              <Check className="w-7 h-7 text-indigo-400" />
            </div>

            <h1 className="text-2xl font-bold mb-2">You&apos;re on the waitlist!</h1>
            <p className="text-zinc-400 mb-2">
              We&apos;ll let you know as soon as your spot opens up.
            </p>
            {displayEmail && (
              <p className="text-sm text-zinc-500 mb-8">
                Confirmation sent to{" "}
                <span className="text-indigo-400 font-medium">{displayEmail}</span>
              </p>
            )}

            {/* Invite code section */}
            <div className="border-t border-white/[0.06] pt-6 mt-2">
              <h2 className="text-sm font-semibold text-zinc-300 mb-1">
                Have an invite code?
              </h2>
              <p className="text-xs text-zinc-500 mb-4">
                Skip the waitlist and get instant access.
              </p>

              {!applied ? (
                <form onSubmit={handleApplyCode} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter invite code"
                      value={inviteCode}
                      onChange={(e) => { setInviteCode(e.target.value); setError(""); }}
                      className="flex-1 h-11 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-mono uppercase"
                    />
                    <button
                      type="submit"
                      disabled={loading || !inviteCode.trim()}
                      className="h-11 px-5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Apply
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className="text-xs text-red-400 text-left">{error}</p>
                  )}
                </form>
              ) : (
                <div className="flex items-center justify-center gap-2 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <Check className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm text-indigo-300 font-medium">
                    Access granted — redirecting…
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
