import Link from "next/link";
import { Zap } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.04] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold">
                InstantFunnel<span className="text-indigo-400">.ai</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-500 max-w-[200px]">
              AI-powered funnels, built in seconds.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Compare
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Join Waitlist
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.04] pt-6">
          <p className="text-xs text-zinc-600 text-center">
            &copy; {new Date().getFullYear()} InstantFunnel.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
