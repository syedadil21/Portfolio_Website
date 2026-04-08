"use client";

import { motion } from "framer-motion";

const certifications = [
  {
    title: "Practical Ethical Hacking",
    issuer: "TCM Security",
  },
  {
    title: "Windows Privilege Escalation",
    issuer: "TCM Security",
  },
  {
    title: "Linux Privilege Escalation",
    issuer: "TCM Security",
  },
  {
    title: "Google Cybersecurity",
    issuer: "Coursera",
  },
  {
    title: "Jr. Penetration Tester",
    issuer: "TryHackMe",
  },
  {
    title: "Web Security",
    issuer: "TryHackMe",
  },
  {
    title: "Networking Essentials",
    issuer: "Cisco",
  },
];

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Certifications</h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          transition={{ staggerChildren: 0.06 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={item}
              className="rounded-xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm p-5 hover:border-zinc-600/50 transition-all duration-300"
            >
              <h3 className="text-sm font-semibold text-white mb-1">
                {cert.title}
              </h3>
              <p className="text-xs text-zinc-500">{cert.issuer}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
