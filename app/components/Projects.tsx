"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Category = "All" | "AI" | "Web" | "Mobile" | "Misc";

const projects = [
  {
    title: "AI Analytics Module",
    caseStudy: "ai-analytics-module",
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
    live: "",
  },
  {
    title: "OSINTify — OSINT Analysis Tool",
    caseStudy: "osintify",
    category: "AI" as Category,
    description:
      "Final Year Project. Led the development of a MERN stack web app for automating Open-Source Intelligence (OSINT) analysis, generating actionable insights into digital footprints. Integrated multiple OSINT data sources including social media, public records, and forums for comprehensive threat identification and footprint analysis.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "OSINT"],
    github: "",
    live: "",
  },
  {
    title: "QuickBuy — Multi-Purveyor Grocery Platform",
    caseStudy: "quickbuy",
    category: "Mobile" as Category,
    description:
      "Cross-platform grocery app where users manage multiple carts simultaneously and checkout across different stores. Built secure ASP.NET APIs with JWT authentication and role-based access. Implemented multi-tenant architecture using row-level data isolation with CompanyKey discriminator resolved from JWT claims. Built a Next.js purveyor dashboard with TanStack Query for caching and real-time updates. Delivered hybrid inventory management with API integrations for tech-enabled purveyors and manual updates for others.",
    tags: [
      "React Native",
      "ASP.NET Core",
      "Next.js",
      "SQL Server",
      "Entity Framework",
      "JWT",
      "Docker",
      "GitHub Actions",
    ],
    github: "",
    live: "",
  },
  {
    title: "FBTA — Learning Platform",
    caseStudy: "fbta-learning-platform",
    category: "Web" as Category,
    description:
      "Full-stack video learning platform with course and lecture management, HLS video streaming via Backblaze B2 and Cloudflare CDN, OTP-based new device verification, device fingerprinting, secure encrypted sessions, and IP geolocation. Built with Fastify backend and Next.js frontend with presigned S3-compatible URLs for secure video delivery.",
    tags: [
      "Next.js",
      "Fastify",
      "Node.js",
      "PostgreSQL",
      "Knex.js",
      "AWS S3",
      "TypeScript",
      "Docker",
    ],
    github: "",
    live: "",
  },
  {
    title: "HARVEST — Grant Management Software",
    caseStudy: "",
    category: "Web" as Category,
    description:
      "Maintained and enhanced a US-based grant management software designed to streamline and automate grant application and management processes for educational institutions. Developed new features by modifying and optimizing controllers and views. Managed work items using Azure DevOps for efficient tracking and delivery.",
    tags: ["ASP.NET", "jQuery", "SQL Server", "Azure DevOps"],
    github: "",
    live: "",
  },
  {
    title: "CommunityVoteTracker",
    caseStudy: "communityvotetracker",
    category: "Mobile" as Category,
    description:
      "Community voting application with both mobile and web clients. Implemented secure issue-based voting with role-based access control and Redux Toolkit/RTK Query for state management. Built ASP.NET backend with Dapper ORM, push notifications via OneSignal, and deployed APIs and SQL Server on Azure for scalability.",
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
  },
  {
    title: "Bento — AI-Powered Recipe App",
    caseStudy: "bento",
    category: "AI" as Category,
    description:
      "Food recipe app with an AI-powered assistant. Implemented Wi-Fi provisioning over Bluetooth to configure ESP-32 hardware via the mobile app.",
    tags: ["React Native", "Expo", "ESP-32"],
    github: "",
    live: "",
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
                Open Source
              </span>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              {/* Action buttons */}
              <div className="flex items-center gap-3 mb-5">
                {project.caseStudy && (
                  <a
                    href={`/case-studies/${project.caseStudy}`}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-500/15 border border-blue-400/20 rounded-lg text-blue-300 hover:bg-blue-500/25 transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Case Study
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-800/80 border border-zinc-700/50 rounded-lg text-white hover:bg-zinc-700/80 transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
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
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-800/80 border border-zinc-700/50 rounded-lg text-white hover:bg-zinc-700/80 transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
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
