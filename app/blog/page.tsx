import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Blog — InstantFunnel.ai",
  description:
    "Insights on AI-powered funnels, conversion optimization, and the future of funnel building.",
};

const categoryColors: Record<string, string> = {
  Industry: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Comparison: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  Strategy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Product: "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#e4e4e7]">
      <SiteHeader />

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl">
            Thoughts on AI-powered funnels, conversion strategy, and why the
            old way of building funnels is dying.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                    categoryColors[post.category] || categoryColors.Industry
                  }`}
                >
                  {post.category}
                </span>
                <span className="text-xs text-zinc-500">{post.readTime}</span>
              </div>
              <h2 className="text-lg font-semibold mb-2 group-hover:text-indigo-400 transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-zinc-400 mb-4 line-clamp-3">
                {post.description}
              </p>
              <div className="flex items-center gap-1.5 text-sm text-indigo-400 font-medium">
                Read more
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
