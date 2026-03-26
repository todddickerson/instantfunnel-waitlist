import Link from "next/link";
import { Zap } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.04] bg-[#0A0A0F]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            InstantFunnel
            <span className="text-indigo-400">.ai</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/compare"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Compare
          </Link>
          <Link
            href="/"
            className="text-sm px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-colors"
          >
            Join Waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
