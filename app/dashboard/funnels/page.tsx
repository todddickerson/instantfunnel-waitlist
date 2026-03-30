import Link from "next/link";
import { Layers, Plus } from "lucide-react";

export default function FunnelsPage() {
  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Funnels</h1>
        <Link
          href="/dashboard/build"
          className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Funnel
        </Link>
      </div>

      {/* Empty state */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-12 text-center">
        <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5">
          <Layers className="w-7 h-7 text-indigo-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No funnels yet</h2>
        <p className="text-zinc-400 max-w-sm mx-auto mb-6">
          Describe your offer and AI builds your entire funnel in seconds.
        </p>
        <Link
          href="/dashboard/build"
          className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-colors"
        >
          Build Your First Funnel
        </Link>
      </div>
    </div>
  );
}
