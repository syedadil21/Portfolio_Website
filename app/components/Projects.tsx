"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Category = "All" | "AI" | "Web" | "Mobile" | "Misc";

const projects = [
  {
    title: "AI Analytics Module",
    caseStudy: "ai-analytics-module",
    hasImages: false,
    category: "AI" as Category,
    description:
      "Built a production-grade AI-powered analytics layer inside an orthodontic patient management system. Users can query operational and financial data in plain English. Implemented dynamic PostgreSQL schema introspection to ground GPT-4o in real table names, enum values, and relationships — eliminating LLM hallucinations. Added SELECT-only validation and read-only DB connections for safe production execution. Integrated GA4 for marketing attribution and built real-time dashboards with 12+ report types.",
    tags: [
      "Next.js",
      "GPT-4o",
      "PostgreSQL",
      "Vercel AI SDK",
      "Prisma",
      "Recharts",
      "TanStack Query",
      "TypeScript",
    ],
    github: "",
    live: "https://www.bonded.ai/",
    isOpenSource: false,
  },
  {
    title: "OSINTify — OSINT Analysis Tool",
    caseStudy: "osintify",
    hasImages: true,
    category: "AI" as Category,
    description:
      "Final Year Project. Built an OSINT web app that aggregates data from 6 sources (Dehashed, Blackbird, Hunter.io, Blockchain.info, AntiTor, SimInfo) into a unified view. Supports email, username, IP, phone, domain, and blockchain lookups with intelligent routing to relevant APIs based on input type. Includes scan history persistence and summary dashboard. (Demo: test1@gmail.com / test123)",
    tags: ["Next.js", "React", "Supabase", "PostgreSQL", "Tailwind CSS", "Node.js"],
    github: "https://github.com/syedadil21/osintify",
    live: "https://osintify.vercel.app/",
    isOpenSource: true,
  },
  {
    title: "QuickBuy — Multi-Purveyor Grocery Platform",
    caseStudy: "quickbuy",
    hasImages: true,
    category: "Mobile" as Category,
    description:
      "Cross-platform grocery app — React Native mobile with multi-vendor carts, cross-store price comparison, order tracking, and i18n with RTL support. Multi-tenant ASP.NET backend with CompanyKey row-level isolation from JWT, GraphQL API (HotChocolate, 40+ types), SignalR real-time notifications, EF Core audit logging, promotions engine, and inventory lot tracking. Next.js purveyor dashboard with TanStack Query and reporting analytics.",
    tags: [
      "React Native",
      "ASP.NET Core",
      "Next.js",
      "SQL Server",
      "Entity Framework",
      "GraphQL",
      "SignalR",
      "JWT",
    ],
    github: "",
    live: "https://quickbuy-dashboard.netlify.app/",
    isOpenSource: false,
  },
  {
    title: "FBTA — Learning Platform",
    caseStudy: "fbta-learning-platform",
    hasImages: true,
    category: "Web" as Category,
    description:
      "Full-stack video learning platform with multi-layer content security: presigned URLs with 10-minute expiry via Backblaze B2, OTP-based device verification with SHA-256 fingerprinting (max 2 trusted devices), single concurrent stream enforcement with Redis locking, video watermarking with DevTools detection, sodium-encrypted sessions with MaxMind IP geolocation, and a real-time admin dashboard for session monitoring via Socket.IO.",
    tags: [
      "Next.js",
      "Fastify",
      "Node.js",
      "PostgreSQL",
      "Knex.js",
      "Backblaze B2",
      "Redis",
      "Socket.IO",
      "TypeScript",
      "Docker",
    ],
    github: "",
    live: "https://fbta-academy.netlify.app/",
    isOpenSource: false,
  },
  {
    title: "HARVEST — Grant Management Software",
    caseStudy: "",
    hasImages: false,
    category: "Web" as Category,
    description:
      "Maintained and enhanced a US-based grant management software designed to streamline and automate grant application and management processes for educational institutions. Developed new features by modifying and optimizing controllers and views. Managed work items using Azure DevOps for efficient tracking and delivery.",
    tags: ["ASP.NET", "jQuery", "SQL Server", "Azure DevOps"],
    github: "",
    live: "",
    isOpenSource: false,
  },
  {
    title: "CommunityVoteTracker",
    caseStudy: "communityvotetracker",
    hasImages: true,
    category: "Mobile" as Category,
    description:
      "Community voting application with a React Native mobile app for For/Against/Abstain voting and a Next.js admin portal for community management. Implemented voting permissions with tiered access levels and Redux Toolkit/RTK Query for state management. Built ASP.NET backend with Dapper ORM and stored procedures, push notifications via OneSignal, and Docker containerized deployment.",
    tags: [
      "React Native",
      "Next.js",
      "ASP.NET Core",
      "SQL Server",
      "Dapper",
      "OneSignal",
      "Azure",
      "Docker",
    ],
    github: "",
    live: "",
    isOpenSource: false,
  },
  {
    title: "Bento — AI-Powered Recipe App",
    caseStudy: "bento",
    hasImages: false,
    category: "AI" as Category,
    description:
      "Food recipe app with an AI assistant (ESP-32 hardware). Built a real-time voice visualizer with animated halo that responds to microphone decibel levels at 60fps using Reanimated. Implemented Wi-Fi provisioning over Bluetooth to configure ESP-32 hardware. Contributed to UI redesign.",
    tags: ["React Native", "Expo", "Reanimated", "Audio API", "ESP-32", "Bluetooth"],
    github: "",
    live: "",
    isOpenSource: false,
  },
];

const categories: Category[] = ["All", "AI", "Web", "Mobile", "Misc"];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function Projects() {
  const [filter, setFilter] = useState<Category>("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-10">
          Personal Projects
        </h2>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                filter === cat
                  ? "bg-white text-black font-medium"
                  : "bg-zinc-800/60 text-zinc-400 hover:bg-zinc-700/60 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-col grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              layout
              className="group flex flex-col rounded-xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm p-6 hover:border-zinc-600/50 transition-all duration-300"
            >
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>

              <span className="inline-block w-fit px-3 py-0.5 text-[11px] uppercase tracking-wider font-medium bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 rounded-full mb-4">
                {project.isOpenSource ? "Open Source" : "Closed Source"}
              </span>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {project.caseStudy && (
                  <a
                    href={`/case-studies/${project.caseStudy}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-500/15 border border-blue-400/20 rounded-md text-blue-300 hover:bg-blue-500/25 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Case Study
                  </a>
                )}
                {project.caseStudy && project.hasImages && (
                  <a
                    href={`/case-studies/${project.caseStudy}#screenshots`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-800/80 border border-zinc-700/50 rounded-md text-zinc-300 hover:bg-zinc-700/80 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    Screenshots
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-800/80 border border-zinc-700/50 rounded-md text-zinc-300 hover:bg-zinc-700/80 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-800/80 border border-zinc-700/50 rounded-md text-zinc-300 hover:bg-zinc-700/80 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Demo
                  </a>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] font-mono text-zinc-500 bg-zinc-800/50 border border-zinc-700/40 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
