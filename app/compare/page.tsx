import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus, X } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

export const metadata: Metadata = {
  title: "Compare Funnel Builders — InstantFunnel.ai",
  description:
    "Honest comparison of InstantFunnel.ai vs ClickFunnels 2.0, GoHighLevel, Leadpages, Perspective, and Systeme.io.",
};

type Support = "yes" | "partial" | "no";

interface Feature {
  name: string;
  instantfunnel: Support;
  cf2: Support;
  ghl: Support;
  leadpages: Support;
  perspective: Support;
  systeme: Support;
  note?: string;
}

const features: Feature[] = [
  {
    name: "AI funnel generation",
    instantfunnel: "yes",
    cf2: "no",
    ghl: "no",
    leadpages: "no",
    perspective: "no",
    systeme: "no",
  },
  {
    name: "AI copywriting built-in",
    instantfunnel: "yes",
    cf2: "no",
    ghl: "no",
    leadpages: "no",
    perspective: "no",
    systeme: "no",
  },
  {
    name: "Automatic split testing",
    instantfunnel: "yes",
    cf2: "no",
    ghl: "no",
    leadpages: "no",
    perspective: "no",
    systeme: "no",
    note: "AI-generated variants, multi-armed bandit routing",
  },
  {
    name: "Manual A/B testing",
    instantfunnel: "yes",
    cf2: "yes",
    ghl: "yes",
    leadpages: "yes",
    perspective: "yes",
    systeme: "partial",
  },
  {
    name: "Mobile-first design",
    instantfunnel: "yes",
    cf2: "partial",
    ghl: "partial",
    leadpages: "partial",
    perspective: "yes",
    systeme: "partial",
    note: "Perspective pioneered mobile-first; most others are desktop-first with responsive",
  },
  {
    name: "Drag-and-drop editor",
    instantfunnel: "no",
    cf2: "yes",
    ghl: "yes",
    leadpages: "yes",
    perspective: "yes",
    systeme: "yes",
    note: "InstantFunnel uses AI generation instead of manual editing",
  },
  {
    name: "Multi-step funnels",
    instantfunnel: "yes",
    cf2: "yes",
    ghl: "yes",
    leadpages: "partial",
    perspective: "yes",
    systeme: "yes",
  },
  {
    name: "Landing pages",
    instantfunnel: "yes",
    cf2: "yes",
    ghl: "yes",
    leadpages: "yes",
    perspective: "yes",
    systeme: "yes",
  },
  {
    name: "Email marketing",
    instantfunnel: "partial",
    cf2: "yes",
    ghl: "yes",
    leadpages: "partial",
    perspective: "no",
    systeme: "yes",
    note: "CF2 and GHL have full email/SMS; Leadpages and IF integrate with external ESPs",
  },
  {
    name: "CRM / contact management",
    instantfunnel: "no",
    cf2: "yes",
    ghl: "yes",
    leadpages: "no",
    perspective: "partial",
    systeme: "partial",
  },
  {
    name: "Course / membership hosting",
    instantfunnel: "no",
    cf2: "yes",
    ghl: "partial",
    leadpages: "no",
    perspective: "no",
    systeme: "yes",
  },
  {
    name: "White-label / agency mode",
    instantfunnel: "no",
    cf2: "no",
    ghl: "yes",
    leadpages: "no",
    perspective: "no",
    systeme: "no",
    note: "GHL's primary value prop for agencies",
  },
  {
    name: "E-commerce / checkout",
    instantfunnel: "partial",
    cf2: "yes",
    ghl: "yes",
    leadpages: "partial",
    perspective: "partial",
    systeme: "yes",
  },
  {
    name: "Custom domains",
    instantfunnel: "yes",
    cf2: "yes",
    ghl: "yes",
    leadpages: "yes",
    perspective: "yes",
    systeme: "yes",
  },
  {
    name: "Analytics / reporting",
    instantfunnel: "yes",
    cf2: "yes",
    ghl: "yes",
    leadpages: "yes",
    perspective: "yes",
    systeme: "partial",
  },
  {
    name: "Fast page load times",
    instantfunnel: "yes",
    cf2: "partial",
    ghl: "partial",
    leadpages: "yes",
    perspective: "yes",
    systeme: "partial",
    note: "CF2 and GHL pages can be heavy; IF generates optimized static pages",
  },
  {
    name: "Template library",
    instantfunnel: "no",
    cf2: "yes",
    ghl: "yes",
    leadpages: "yes",
    perspective: "yes",
    systeme: "yes",
    note: "InstantFunnel generates unique designs instead of templates",
  },
  {
    name: "Beginner-friendly",
    instantfunnel: "yes",
    cf2: "partial",
    ghl: "no",
    leadpages: "yes",
    perspective: "yes",
    systeme: "yes",
    note: "GHL has a steep learning curve; CF2 is powerful but complex",
  },
];

const platforms = [
  { key: "instantfunnel" as const, name: "InstantFunnel", highlight: true },
  { key: "cf2" as const, name: "CF 2.0" },
  { key: "ghl" as const, name: "GHL" },
  { key: "leadpages" as const, name: "Leadpages" },
  { key: "perspective" as const, name: "Perspective" },
  { key: "systeme" as const, name: "Systeme" },
];

const summaries = [
  {
    key: "instantfunnel",
    name: "InstantFunnel.ai",
    verdict: "AI-first funnel builder. Describe your product, get a complete funnel with copy, design, and automatic optimization. No templates, no drag-and-drop — the AI handles it.",
  },
  {
    key: "cf2",
    name: "ClickFunnels 2.0",
    verdict: "Solid, full-featured funnel builder with courses, email, and e-commerce. Powerful but complex — the editor has a learning curve and the platform is desktop-oriented. Good if you need an all-in-one and don't mind the setup time.",
  },
  {
    key: "ghl",
    name: "GoHighLevel",
    verdict: "An agency operating system more than a funnel builder. CRM, SMS, calendars, reputation management — the funnel builder is a feature, not the focus. Best for agencies managing multiple clients who want one platform for everything.",
  },
  {
    key: "leadpages",
    name: "Leadpages",
    verdict: "Reliable, affordable landing page builder. Templates are showing their age, but the core product is stable and beginner-friendly. Best for simple lead capture pages, not complex multi-step funnels.",
  },
  {
    key: "perspective",
    name: "Perspective.co",
    verdict: "Excellent mobile-first UI that genuinely converts well. Proved that mobile-native funnels outperform responsive ones. EUR pricing and European market focus limit US appeal. No AI capabilities.",
  },
  {
    key: "systeme",
    name: "Systeme.io",
    verdict: "Best value for bootstrapped founders. Free tier is generous, and the paid plans include funnels, email, courses, and e-commerce at aggressive pricing. Trade-off is less polish and fewer advanced features.",
  },
];

function SupportIcon({ value }: { value: Support }) {
  if (value === "yes")
    return <Check className="w-4 h-4 text-emerald-400 mx-auto" />;
  if (value === "partial")
    return <Minus className="w-4 h-4 text-amber-400 mx-auto" />;
  return <X className="w-4 h-4 text-zinc-600 mx-auto" />;
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#e4e4e7]">
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="mb-16 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Funnel Builder Comparison
          </h1>
          <p className="text-lg text-zinc-400">
            An honest, feature-by-feature comparison. We mark what we
            don&apos;t do yet. Green means full support, yellow means partial,
            gray means no.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/[0.06] overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="text-left px-4 py-4 font-semibold text-zinc-300 min-w-[200px] sticky left-0 bg-[#111118]">
                    Feature
                  </th>
                  {platforms.map((p) => (
                    <th
                      key={p.key}
                      className={`px-4 py-4 font-semibold text-center min-w-[100px] ${
                        p.highlight
                          ? "text-indigo-400 bg-indigo-500/5"
                          : "text-zinc-400"
                      }`}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr
                    key={f.name}
                    className={`border-b border-white/[0.04] ${
                      i % 2 === 0 ? "bg-white/[0.01]" : ""
                    }`}
                  >
                    <td className="px-4 py-3 sticky left-0 bg-[#0d0d14]">
                      <span className="text-zinc-300">{f.name}</span>
                      {f.note && (
                        <span className="block text-[11px] text-zinc-500 mt-0.5 leading-tight">
                          {f.note}
                        </span>
                      )}
                    </td>
                    {platforms.map((p) => (
                      <td
                        key={p.key}
                        className={`px-4 py-3 text-center ${
                          p.highlight ? "bg-indigo-500/5" : ""
                        }`}
                      >
                        <SupportIcon value={f[p.key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform summaries */}
        <h2 className="text-2xl font-bold mb-8">Platform Summaries</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {summaries.map((s) => (
            <div
              key={s.key}
              className={`rounded-2xl border p-6 ${
                s.key === "instantfunnel"
                  ? "bg-indigo-500/5 border-indigo-500/20"
                  : "bg-white/[0.02] border-white/[0.06]"
              }`}
            >
              <h3
                className={`font-semibold mb-3 ${
                  s.key === "instantfunnel" ? "text-indigo-400" : "text-white"
                }`}
              >
                {s.name}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {s.verdict}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">
            Skip the configuration. Build with AI.
          </h3>
          <p className="text-zinc-400 mb-6 text-sm max-w-md mx-auto">
            InstantFunnel.ai generates complete funnels from a product
            description. Join the waitlist for early access.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-colors"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
