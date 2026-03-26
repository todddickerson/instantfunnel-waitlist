"use client";

import { useState, useEffect, useRef } from "react";
import { Zap, BarChart2, Layers, Copy, Check, Share2, ArrowRight } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const [demoVisible, setDemoVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferredBy(ref);
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, referredBy }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setPosition(data.position);
      setReferralCode(data.referral_code);
      setReferralCount(data.referral_count);
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const referralLink =
    typeof window !== "undefined"
      ? `${window.location.origin}?ref=${referralCode}`
      : "";

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tweetText = encodeURIComponent(
    `I just joined the @InstantFunnelAI waitlist — AI-powered funnels in seconds. Join me:\n${referralLink}`
  );

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#e4e4e7]">
      {/* Hero */}
      <main className="relative flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Logo */}
          <div className="animate-fade-in-up mb-8">
            <div className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                InstantFunnel
                <span className="text-indigo-400">.ai</span>
              </span>
            </div>
          </div>

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
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-12 opacity-0">
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

          {/* Form / Result */}
          {!submitted ? (
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
                  className="flex-1 h-12 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 px-6 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-glow"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
              {error && (
                <p className="mt-3 text-sm text-red-400">{error}</p>
              )}
              <p className="mt-4 text-xs text-zinc-500">
                No spam. Early access + founding member pricing.
              </p>
            </div>
          ) : (
            <div className="animate-scale-in max-w-md mx-auto">
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold mb-1">You&apos;re in!</h2>
                <p className="text-zinc-400 mb-6">
                  You&apos;re <span className="text-indigo-400 font-semibold">#{position}</span> on the waitlist
                </p>

                {/* Referral section */}
                <div className="space-y-4">
                  <p className="text-sm text-zinc-400">
                    Share your link to move up the list:
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={referralLink}
                      className="flex-1 h-10 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-sm text-zinc-300 outline-none font-mono truncate"
                    />
                    <button
                      onClick={copyLink}
                      className="h-10 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] transition-colors flex items-center gap-1.5"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-zinc-400" />
                      )}
                      <span className="text-sm text-zinc-300">
                        {copied ? "Copied" : "Copy"}
                      </span>
                    </button>
                  </div>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-10 rounded-lg bg-[#1d9bf0]/10 border border-[#1d9bf0]/20 hover:bg-[#1d9bf0]/20 transition-colors text-[#1d9bf0] text-sm font-medium"
                  >
                    <Share2 className="w-4 h-4" />
                    Share on Twitter
                  </a>
                  {referralCount > 0 && (
                    <p className="text-xs text-zinc-500 text-center">
                      {referralCount} {referralCount === 1 ? "person has" : "people have"} joined through your link
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
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

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-8 px-6 text-center">
        <p className="text-sm text-zinc-500">
          InstantFunnel.ai — AI-powered funnels, built in seconds.
        </p>
      </footer>
    </div>
  );
}
