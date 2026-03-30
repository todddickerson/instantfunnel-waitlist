import Link from "next/link";
import {
  Layers,
  TrendingUp,
  DollarSign,
  Lightbulb,
} from "lucide-react";

const stats = [
  { label: "Active Funnels", value: "0", icon: Layers },
  { label: "Avg Conversion", value: "\u2014", icon: TrendingUp },
  { label: "Total Revenue", value: "\u2014", icon: DollarSign },
  { label: "AI Suggestions", value: "0", icon: Lightbulb },
];

export default function DashboardPage() {
  return (
    <div className="px-8 py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Icon className="w-[18px] h-[18px] text-indigo-400" />
              </div>
              <span className="text-sm text-zinc-400">{label}</span>
            </div>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        ))}
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
