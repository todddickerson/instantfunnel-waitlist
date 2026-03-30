"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Zap, BarChart2, Layers, ArrowRight } from "lucide-react";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const demoRef = useRef<HTMLDivElement>(null);
  const [demoVisible, setDemoVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDemoVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (demoRef.current) observer.observe(demoRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/sign-up?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#e4e4e7]">
      <SiteHeader />

      {/* Hero */}
      <main className="relative flex flex-col items-center justify-center px-6 pt-20 sm:pt-32 pb-20 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Headline */}
          <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 opacity-0">
            Build High-Converting Funnels{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              in Seconds
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-zinc-400 mb-10 max-w-lg mx-auto leading-relaxed opacity-0">
            AI that understands your product and builds complete sales funnels
            — copy, design, and optimization — instantly.
          </p>

          {/* Bullets */}
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12 opacity-0">
            {[
              { icon: Zap, text: "Describe your product, get a funnel" },
              { icon: Layers, text: "Landing pages, upsells, and email flows" },
              { icon: BarChart2, text: "AI split-testing built in" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-sm text-zinc-300">{text}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="animate-fade-in-up delay-400 opacity-0">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-14 sm:h-12 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all text-base"
              />
              <button
                type="submit"
                className="h-14 sm:h-12 px-6 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse-glow"
              >
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="mt-4 text-xs text-zinc-500">
              No spam. Early access + founding member pricing.
            </p>
          </div>
        </div>
      </main>

      {/* Product Demo Animations — Below Fold */}
      <section
        ref={demoRef}
        className="relative px-6 py-24 max-w-5xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          How It Works
        </h2>
        <p className="text-zinc-400 text-center mb-16 max-w-lg mx-auto">
          From idea to live funnel in under 60 seconds
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Demo 1 — Funnel Builder */}
          <div
            className={`rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 ${
              demoVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="mb-4 h-40 rounded-xl bg-gradient-to-b from-indigo-500/5 to-transparent border border-white/[0.04] overflow-hidden flex flex-col items-center justify-end p-4">
              <div
                className={`w-full space-y-2 ${
                  demoVisible ? "animate-demo-funnel" : "opacity-0"
                }`}
              >
                <div className="h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30" />
                <div className="h-6 rounded-lg bg-indigo-500/15 border border-indigo-500/20 w-4/5 mx-auto" />
                <div className="h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/15 w-3/5 mx-auto" />
                <div className="h-5 rounded-lg bg-indigo-500/5 border border-indigo-500/10 w-2/5 mx-auto" />
              </div>
            </div>
            <h3 className="font-semibold mb-1">Instant Page Generation</h3>
            <p className="text-sm text-zinc-400">
              AI builds your landing page, headline, copy, and CTA in seconds.
            </p>
          </div>

          {/* Demo 2 — Metrics */}
          <div
            className={`rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 ${
              demoVisible ? "animate-fade-in-up delay-200" : "opacity-0"
            }`}
          >
            <div className="mb-4 h-40 rounded-xl bg-gradient-to-b from-indigo-500/5 to-transparent border border-white/[0.04] overflow-hidden flex flex-col justify-end p-4 gap-2">
              {[85, 65, 45, 92].map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500 w-8 text-right font-mono">
                    {["CVR", "CTR", "AOV", "LTV"][i]}
                  </span>
                  <div className="flex-1 h-4 rounded bg-white/[0.03] overflow-hidden">
                    <div
                      className={`h-full rounded bg-gradient-to-r from-indigo-500/60 to-indigo-400/40 ${
                        demoVisible ? "animate-demo-metrics" : ""
                      }`}
                      style={{
                        maxWidth: `${w}%`,
                        animationDelay: `${i * 300 + 500}ms`,
                        animationFillMode: "forwards",
                        width: demoVisible ? undefined : 0,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <h3 className="font-semibold mb-1">Real-Time Analytics</h3>
            <p className="text-sm text-zinc-400">
              Track conversions, revenue, and funnel performance as it happens.
            </p>
          </div>

          {/* Demo 3 — AI Optimization */}
          <div
            className={`rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 ${
              demoVisible ? "animate-fade-in-up delay-400" : "opacity-0"
            }`}
          >
            <div className="mb-4 h-40 rounded-xl bg-gradient-to-b from-indigo-500/5 to-transparent border border-white/[0.04] overflow-hidden flex items-center justify-center gap-6 p-4">
              <div className="text-center">
                <div
                  className={`w-14 h-14 rounded-full border-2 border-indigo-500/30 flex items-center justify-center mx-auto mb-1 ${
                    demoVisible ? "animate-demo-pulse" : ""
                  }`}
                  style={{ animationDelay: "800ms" }}
                >
                  <span className="text-xs font-bold text-indigo-400">A</span>
                </div>
                <span className="text-[10px] text-zinc-500">2.3%</span>
              </div>
              <div className="text-zinc-600 text-lg">vs</div>
              <div className="text-center">
                <div
                  className={`w-14 h-14 rounded-full border-2 border-green-500/40 bg-green-500/5 flex items-center justify-center mx-auto mb-1 ${
                    demoVisible ? "animate-demo-pulse" : ""
                  }`}
                  style={{ animationDelay: "1200ms" }}
                >
                  <span className="text-xs font-bold text-green-400">B</span>
                </div>
                <span className="text-[10px] text-green-400 font-medium">4.7%</span>
              </div>
            </div>
            <h3 className="font-semibold mb-1">AI Split Testing</h3>
            <p className="text-sm text-zinc-400">
              Automatically tests variations and picks the winner for you.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
