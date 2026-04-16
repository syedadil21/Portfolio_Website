import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies } from "../lib/case-studies";
import FadeIn from "../components/FadeIn";

export const metadata: Metadata = {
  title: "Case Studies — Syed Adil",
  description:
    "Detailed case studies of projects by Syed Adil — problems, solutions, and outcomes.",
};

const categoryColors: Record<string, string> = {
  AI: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Mobile: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Web: "bg-violet-500/15 text-violet-400 border-violet-500/20",
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <FadeIn>
      <div className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Portfolio
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Case Studies</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Deep dives into the problems I solved, the approaches I took, and the
            outcomes I delivered across my projects.
          </p>
        </div>
      </div>
      </FadeIn>

      {/* Case study cards */}
      <FadeIn delay={0.15}>
      <div className="px-6 pb-28">
        <div className="mx-auto max-w-5xl space-y-6">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group block rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <h2 className="text-xl md:text-2xl font-bold group-hover:text-blue-400 transition-colors">
                      {cs.title}
                    </h2>
                    <span
                      className={`px-2.5 py-0.5 text-[11px] uppercase tracking-wider font-medium border rounded-full ${
                        categoryColors[cs.category] ||
                        "bg-zinc-500/15 text-zinc-400 border-zinc-500/20"
                      }`}
                    >
                      {cs.category}
                    </span>
                    {cs.images.length > 0 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] uppercase tracking-wider font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        {cs.images.length} {cs.images.length === 1 ? "image" : "images"}
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {cs.subtitle}
                  </p>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 mt-1"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-1.5">
                {cs.stack.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] font-mono text-zinc-500 bg-zinc-800/50 border border-zinc-700/30 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {cs.stack.length > 6 && (
                  <span className="px-2 py-0.5 text-[11px] font-mono text-zinc-600">
                    +{cs.stack.length - 6} more
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
      </FadeIn>
    </div>
  );
}
