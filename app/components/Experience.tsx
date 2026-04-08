"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    company: "Bonded PK",
    role: "Full Stack Next.js Developer",
    location: "Remote",
    period: "Oct 2025 — Present",
    sections: [
      {
        heading: "AI-Powered Analytics Layer",
        bullets: [
          "Designed and implemented an AI-powered analytics layer inside an Orthodontic Patient Management System enabling production-grade natural language querying over operational and financial datasets.",
          "Built a schema-grounded SQL generation pipeline using dynamic PostgreSQL schema introspection (tables, enums, relationships) to eliminate LLM hallucinations.",
          "Integrated GPT-4o via Vercel AI SDK with structured output enforcement and query validation to ensure safe production execution.",
        ],
      },
      {
        heading: "Analytics & Dashboards",
        bullets: [
          "Integrated GA4 to bridge marketing attribution with treatment start and revenue analytics, delivering real-time visualizations with Recharts and TanStack Query.",
          "Built real-time dashboards with 12+ report types for operational and financial data analysis.",
        ],
      },
    ],
    stack: [
      "Next.js",
      "GPT-4o",
      "PostgreSQL",
      "Vercel AI SDK",
      "Prisma",
      "Recharts",
      "TanStack Query",
      "TypeScript",
    ],
  },
  {
    company: "Kaizen Software Solutions",
    role: "Full Stack Developer",
    location: "Onsite, Karachi",
    period: "Jul 2024 — Oct 2025",
    sections: [
      {
        heading: "Backend & API Development",
        bullets: [
          "Designed and implemented secure, role-based ASP.NET Web APIs with JWT authentication and optimized database schemas for multi-tenant applications.",
          "Deployed ASP.NET Web APIs and databases to Azure with CI/CD pipelines, ensuring scalable and reliable production releases.",
        ],
      },
      {
        heading: "Mobile & Web Applications",
        bullets: [
          "Built and shipped React Native (Expo) apps with Redux Toolkit/RTK Query for performance optimization.",
          "Engineered a scalable Next.js purveyor dashboard with TanStack Query for real-time data caching, improving responsiveness and reducing API load.",
        ],
      },
    ],
    stack: [
      "React Native",
      "ASP.NET Core",
      "Next.js",
      "SQL Server",
      "Entity Framework",
      "JWT",
      "Azure",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    company: "NETTCORE",
    role: "Junior Software Engineer",
    location: "Onsite, Karachi",
    period: "Feb 2024 — Jul 2024",
    sections: [
      {
        heading: null,
        bullets: [
          "Implemented server-side rendering and optimized web application performance using Next.js.",
          "Managed and revitalized an older ASP.NET project, implementing updates and improvements.",
          "Maintained a cross-platform mobile application, ensuring optimal performance through the use of React Native.",
        ],
      },
    ],
    stack: ["Next.js", "ASP.NET", "React Native", "TypeScript"],
  },
  {
    company: "TechHunt",
    role: "Junior Frontend Developer",
    location: "Onsite, Karachi",
    period: "Oct 2023 — Feb 2024",
    sections: [
      {
        heading: null,
        bullets: [
          "Contributed to React.js and Next.js-based web development, seamlessly transitioning from intern to a key team member.",
          "Designed and built a Fitness Dashboard to visualize user data using interactive graphs and charts.",
          "Implemented complex state management and component interactions to enhance application functionality.",
          "Resolved coding issues promptly, demonstrating a proactive problem-solving approach and continuous learning.",
        ],
      },
    ],
    stack: ["React.js", "Next.js", "JavaScript", "CSS"],
  },
];

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="experience" className="py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Experience</h2>

        <div className="space-y-4">
          {experiences.map((exp, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={exp.company}
                className="rounded-xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm overflow-hidden"
              >
                {/* Header — always visible */}
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {exp.company}
                      <span className="mx-2 text-zinc-700">|</span>
                      {exp.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="text-sm text-zinc-500 hidden sm:block">
                      {exp.period}
                    </span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-zinc-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {/* Collapsible body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-white/5 pt-5">
                        {/* Period on mobile */}
                        <p className="text-sm text-zinc-500 mb-4 sm:hidden">
                          {exp.period}
                        </p>

                        {exp.sections.map((section, j) => (
                          <div key={j} className="mb-5">
                            {section.heading && (
                              <h4 className="text-sm font-bold text-zinc-200 mb-2">
                                {section.heading}
                              </h4>
                            )}
                            <ul className="space-y-2">
                              {section.bullets.map((bullet, k) => (
                                <li
                                  key={k}
                                  className="text-zinc-400 text-sm leading-relaxed flex gap-2"
                                >
                                  <span className="text-zinc-600 mt-1.5 shrink-0">
                                    &bull;
                                  </span>
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {/* Tech Stack */}
                        <div className="mt-4">
                          <p className="text-xs text-zinc-600 mb-2">
                            Tech Stack:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.stack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 text-xs font-mono text-zinc-400 bg-zinc-800/60 border border-zinc-700/50 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
