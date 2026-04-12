"use client";

import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiSharp,
  SiPostgresql,
  SiPython,
  SiNextdotjs,
  SiReact,
  SiDotnet,
  SiNodedotjs,
  SiNestjs,
  SiFastify,
  SiPrisma,
  SiZod,
  SiGraphql,
  SiDocker,
  SiSignal,
  SiSocketdotio,
  SiSupabase,
  SiGit,
  SiRedis,
  SiRedux,
  SiOpenai,
  SiVercel,
  SiShadcnui,
  SiMui,
} from "react-icons/si";
import {
  TbBrain,
  TbSearch,
  TbPrompt,
  TbDatabase,
  TbChartBar,
  TbSql,
  TbCloud,
  TbBell,
} from "react-icons/tb";
import type { IconType } from "react-icons";

interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

const skillGroups: { label: string; skills: Skill[] }[] = [
  {
    label: "Languages",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "C#", icon: SiSharp, color: "#68217A" },
      { name: "SQL", icon: TbSql, color: "#e38d16" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
    ],
  },
  {
    label: "Frameworks / ORMs",
    skills: [
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "React Native", icon: SiReact, color: "#61DAFB" },
      { name: "ASP.NET Core", icon: SiDotnet, color: "#512BD4" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { name: "Fastify", icon: SiFastify, color: "#ffffff" },
      { name: "Entity Framework", icon: SiDotnet, color: "#512BD4" },
      { name: "Dapper", icon: SiDotnet, color: "#512BD4" },
      { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
      { name: "Zod", icon: SiZod, color: "#3068B7" },
      { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
      { name: "Zustand", icon: SiReact, color: "#453F39" },
      { name: "shadcn/ui", icon: SiShadcnui, color: "#ffffff" },
      { name: "Material UI", icon: SiMui, color: "#007FFF" },
    ],
  },
  {
    label: "AI & Data",
    skills: [
      { name: "LLM Integration", icon: TbBrain, color: "#10b981" },
      { name: "RAG", icon: TbSearch, color: "#8b5cf6" },
      { name: "Prompt Engineering", icon: TbPrompt, color: "#f59e0b" },
      { name: "Schema Introspection", icon: TbDatabase, color: "#06b6d4" },
      { name: "GPT-4o", icon: SiOpenai, color: "#ffffff" },
      { name: "Vercel AI SDK", icon: SiVercel, color: "#ffffff" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Azure", icon: TbCloud, color: "#0078D4" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "AWS S3", icon: TbCloud, color: "#FF9900" },
      { name: "OneSignal", icon: TbBell, color: "#E8344E" },
      { name: "Socket.IO", icon: SiSocketdotio, color: "#ffffff" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "TanStack Query", icon: TbChartBar, color: "#FF4154" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
      { name: "Recharts", icon: TbChartBar, color: "#22c55e" },
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
              <h3 className="text-lg font-semibold text-zinc-300 shrink-0 sm:w-36">
                {group.label}
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="flex flex-wrap gap-2.5"
              >
                {group.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.span
                      key={skill.name}
                      variants={chip}
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-sm text-zinc-300 bg-zinc-900/50 border border-zinc-700/40 rounded-lg hover:border-zinc-500/60 hover:text-white transition-all duration-200 cursor-default backdrop-blur-sm"
                    >
                      <Icon style={{ color: skill.color }} className="text-base shrink-0" />
                      {skill.name}
                    </motion.span>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
