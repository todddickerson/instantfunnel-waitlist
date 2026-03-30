"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Layers, Plus, Settings2 } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/funnels", label: "My Funnels", icon: Layers },
  { href: "/dashboard/build", label: "Build New", icon: Plus },
  { href: "/dashboard/settings", label: "Settings", icon: Settings2 },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-white/[0.06] text-white border-l-2 border-indigo-500 pl-[10px]"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
            }`}
          >
            <Icon className="w-[18px] h-[18px] shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
