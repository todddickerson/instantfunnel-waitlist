import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Zap, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SidebarNav } from "./sidebar-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#e4e4e7] flex">
      {/* Sidebar */}
      <aside className="w-[220px] shrink-0 border-r border-white/[0.06] flex flex-col bg-white/[0.02]">
        {/* Logo */}
        <div className="px-5 py-5">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              InstantFunnel<span className="text-indigo-400">.ai</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <div className="mt-2 flex-1">
          <SidebarNav />
        </div>

        {/* User / Sign out */}
        <div className="px-4 py-4 border-t border-white/[0.06]">
          <p className="text-xs text-zinc-500 truncate mb-2">{user.email}</p>
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen overflow-y-auto">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
}
