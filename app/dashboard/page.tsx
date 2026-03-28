import Link from "next/link";
import { Zap } from "lucide-react";

export default function DashboardPage() {
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
        <Link href="/" className="inline-flex items-center gap-3 mb-12 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            InstantFunnel<span className="text-indigo-400">.ai</span>
          </span>
        </Link>

        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-12 text-center max-w-md">
          <h1 className="text-3xl font-bold mb-3">Coming soon</h1>
          <p className="text-zinc-400 mb-8">
            The dashboard is under construction. We&apos;ll notify you when it&apos;s ready.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
