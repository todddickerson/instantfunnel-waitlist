import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { posts } from "../posts";

import WhyAIFunnelBuilder from "../content/why-ai-funnel-builder";
import VsGoHighLevel from "../content/vs-gohighlevel";
import VsLeadpages from "../content/vs-leadpages";
import VsPerspective from "../content/vs-perspective";
import MobileFirstFunnels from "../content/mobile-first-funnels";
import AutoSplitTesting from "../content/auto-split-testing";

const contentMap: Record<string, React.ComponentType> = {
  "why-ai-funnel-builder": WhyAIFunnelBuilder,
  "vs-gohighlevel": VsGoHighLevel,
  "vs-leadpages": VsLeadpages,
  "vs-perspective": VsPerspective,
  "mobile-first-funnels": MobileFirstFunnels,
  "auto-split-testing": AutoSplitTesting,
};

const categoryColors: Record<string, string> = {
  Industry: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Comparison: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  Strategy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Product: "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — InstantFunnel.ai`,
    description: post.description,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const Content = contentMap[slug];
  if (!Content) notFound();

  const postIndex = posts.findIndex((p) => p.slug === slug);
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#e4e4e7]">
      <SiteHeader />

      <article className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to blog
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
              categoryColors[post.category] || categoryColors.Industry
            }`}
          >
            {post.category}
          </span>
          <span className="text-xs text-zinc-500">{post.date}</span>
          <span className="text-xs text-zinc-500">{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6">
          {post.title}
        </h1>

        <p className="text-lg text-zinc-400 mb-12 leading-relaxed">
          {post.description}
        </p>

        <div className="prose prose-invert prose-zinc max-w-none [&>p]:text-zinc-300 [&>p]:leading-relaxed [&>p]:mb-5 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>ul]:text-zinc-300 [&>ul]:space-y-2 [&>ul]:mb-5 [&>ul]:ml-5 [&>ul]:list-disc [&>ol]:text-zinc-300 [&>ol]:space-y-2 [&>ol]:mb-5 [&>ol]:ml-5 [&>ol]:list-decimal [&>hr]:my-10 [&_strong]:text-zinc-200 [&_li]:leading-relaxed">
          <Content />
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">
            Ready to build funnels the AI way?
          </h3>
          <p className="text-zinc-400 mb-6 text-sm">
            Join the waitlist for early access to InstantFunnel.ai.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-colors"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Prev/Next navigation */}
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all"
            >
              <span className="text-xs text-zinc-500 flex items-center gap-1 mb-1">
                <ArrowLeft className="w-3 h-3" /> Previous
              </span>
              <span className="text-sm font-medium group-hover:text-indigo-400 transition-colors">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all text-right"
            >
              <span className="text-xs text-zinc-500 flex items-center gap-1 justify-end mb-1">
                Next <ArrowRight className="w-3 h-3" />
              </span>
              <span className="text-sm font-medium group-hover:text-indigo-400 transition-colors">
                {nextPost.title}
              </span>
            </Link>
          )}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
