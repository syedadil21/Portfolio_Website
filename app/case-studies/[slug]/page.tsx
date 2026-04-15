import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "../../lib/case-studies";
import ImageCarousel from "../../components/ImageCarousel";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Not Found" };
  return {
    title: `${cs.title} — Case Study | Syed Adil`,
    description: cs.overview,
  };
}

const categoryColors: Record<string, string> = {
  AI: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Mobile: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Web: "bg-violet-500/15 text-violet-400 border-violet-500/20",
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="pt-32 pb-12 px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/case-studies"
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
            All Case Studies
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-2.5 py-0.5 text-[11px] uppercase tracking-wider font-medium border rounded-full ${
                categoryColors[cs.category] ||
                "bg-zinc-500/15 text-zinc-400 border-zinc-500/20"
              }`}
            >
              {cs.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-3">{cs.title}</h1>
          <p className="text-zinc-400 text-lg mb-6">{cs.subtitle}</p>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {cs.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono text-zinc-400 bg-zinc-800/50 border border-zinc-700/30 rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Role */}
          <div className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
            <p className="text-xs uppercase tracking-widest text-zinc-600 mb-1">
              My Role
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">{cs.role}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-28">
        <div className="mx-auto max-w-3xl space-y-12">
          {/* Screenshots */}
          {cs.images.length > 0 && (
            <div id="screenshots" className="scroll-mt-8" />
          )}
          {cs.images.length > 0 && (
            <Section title="Screenshots">
              <ImageCarousel images={cs.images} />
            </Section>
          )}

          {/* Overview */}
          <Section title="Overview">
            <p className="text-zinc-400 leading-relaxed">{cs.overview}</p>
          </Section>

          {/* Problem */}
          <Section title="The Problem">
            <ul className="space-y-3">
              {cs.problem.map((p, i) => (
                <li key={i} className="flex gap-3 text-zinc-400 leading-relaxed">
                  <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-red-500/60" />
                  {p}
                </li>
              ))}
            </ul>
          </Section>

          {/* Solution */}
          <Section title="The Solution">
            <ul className="space-y-3">
              {cs.solution.map((s, i) => (
                <li key={i} className="flex gap-3 text-zinc-400 leading-relaxed">
                  <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-emerald-500/60" />
                  {s}
                </li>
              ))}
            </ul>
          </Section>

          {/* Key Features */}
          <Section title="Key Features">
            <div className="grid sm:grid-cols-2 gap-3">
              {cs.features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 px-4 py-3 rounded-lg border border-white/5 bg-white/[0.02]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-blue-400 shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-zinc-400 text-sm">{f}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Outcome */}
          <Section title="Outcome & Impact">
            <ul className="space-y-3">
              {cs.outcome.map((o, i) => (
                <li key={i} className="flex gap-3 text-zinc-400 leading-relaxed">
                  <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-blue-500/60" />
                  {o}
                </li>
              ))}
            </ul>
          </Section>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-white/5">
            <Link
              href="/case-studies"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              &larr; All Case Studies
            </Link>
            <Link
              href="/#projects"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              View Projects &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-5">{title}</h2>
      {children}
    </div>
  );
}
