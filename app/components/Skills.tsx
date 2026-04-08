"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    label: "Languages",
    skills: [
      "JavaScript", "TypeScript", "C#", "SQL", "Python",
    ],
  },
  {
    label: "Frameworks / ORMs",
    skills: [
      "Next.js", "React", "React Native", "ASP.NET Core", "Node.js",
      "NestJS", "Fastify", "Entity Framework", "Dapper", "Prisma",
      "Zod", "GraphQL", "Zustand",
    ],
  },
  {
    label: "AI & Data",
    skills: [
      "LLM Integration", "Retrieval-Augmented Generation (RAG)", "Prompt Engineering",
      "Schema Introspection", "GPT-4o", "Vercel AI SDK", "PostgreSQL",
    ],
  },
  {
    label: "Tools",
    skills: [
      "Azure", "Docker", "AWS S3", "OneSignal", "Socket.IO", "Supabase",
      "Git", "TanStack Query", "Redis", "Redux Toolkit", "Recharts",
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const chip = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">My Stack</h2>

        <div className="space-y-10">
          {skillGroups.map((group) => (
            <div key={group.label} className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <h3 className="text-lg font-semibold text-zinc-300 shrink-0 sm:w-28">
                {group.label}
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="flex flex-wrap gap-2"
              >
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={chip}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm text-zinc-300 bg-zinc-900/50 border border-zinc-700/40 rounded-lg hover:border-zinc-500/60 hover:text-white transition-all duration-200 cursor-default backdrop-blur-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
