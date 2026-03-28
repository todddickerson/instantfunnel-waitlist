export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
}

export const posts: BlogPost[] = [
  {
    slug: "why-ai-funnel-builder",
    title: "The Future of Funnel Building Is AI — Here's Why",
    description:
      "Manual funnel building is a relic. AI can generate copy, design, and optimize entire funnels in seconds. The question isn't if — it's who gets there first.",
    category: "Industry",
    date: "2026-03-20",
    readTime: "6 min read",
  },
  {
    slug: "vs-gohighlevel",
    title: "InstantFunnel vs GoHighLevel: Simplicity Wins",
    description:
      "GoHighLevel tries to be everything for everyone. The result? A tool so complex that agencies spend more time configuring it than using it.",
    category: "Comparison",
    date: "2026-03-18",
    readTime: "8 min read",
  },
  {
    slug: "vs-leadpages",
    title: "InstantFunnel vs Leadpages: Beyond Dated Templates",
    description:
      "Leadpages was great in 2016. But drag-and-drop template builders haven't kept up with what modern funnels demand.",
    category: "Comparison",
    date: "2026-03-15",
    readTime: "7 min read",
  },
  {
    slug: "vs-perspective",
    title: "InstantFunnel vs Perspective.co: What Happens When AI Meets Mobile-First",
    description:
      "Perspective proved that mobile-first funnels convert. We respect their UI. But AI can build what they do 100x faster — and without EUR pricing in a USD market.",
    category: "Comparison",
    date: "2026-03-12",
    readTime: "7 min read",
  },
  {
    slug: "mobile-first-funnels",
    title: "65% of Your Traffic Is Mobile — Your Funnel Probably Isn't",
    description:
      "Most funnel builders design for desktop and hope mobile works. The data says that's leaving money on the table.",
    category: "Strategy",
    date: "2026-03-10",
    readTime: "5 min read",
  },
  {
    slug: "auto-split-testing",
    title: "Nobody Split Tests Manually (And That's the Problem)",
    description:
      "A/B testing is the most powerful conversion lever in marketing. It's also the one almost nobody actually does. AI changes that.",
    category: "Product",
    date: "2026-03-08",
    readTime: "6 min read",
  },
];
