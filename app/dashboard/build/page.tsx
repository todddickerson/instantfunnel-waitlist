"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";

export default function BuildPage() {
  const router = useRouter();
  const [offer, setOffer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!offer.trim()) return;
    setLoading(true);
    // Sprint 2: wire AI generation here
    router.push("/dashboard/funnels");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-[#e4e4e7]">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-[100px]" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-xl">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            InstantFunnel<span className="text-indigo-400">.ai</span>
          </span>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8">
          <h1 className="text-2xl font-bold mb-2">What are you selling?</h1>
          <p className="text-zinc-400 text-sm mb-6">
            Describe your offer, who it&apos;s for, and the transformation you
            promise. The more specific, the better.
          </p>

          <form onSubmit={handleSubmit}>
            <textarea
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              rows={6}
              placeholder="e.g. I sell a 6-week online course that teaches freelance designers how to land $10k clients using cold outreach and a simple portfolio site..."
              className="w-full rounded-xl bg-white/[0.05] border border-white/[0.08] px-4 py-3 text-sm text-[#e4e4e7] placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 resize-none transition-colors"
            />
            <button
              type="submit"
              disabled={!offer.trim() || loading}
              className="mt-4 w-full h-12 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:hover:bg-indigo-500 text-white font-medium transition-colors cursor-pointer"
            >
              {loading ? "Building..." : "Build My Funnel"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
