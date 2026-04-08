"use client";

import { motion } from "framer-motion";
import Typewriter from "./Typewriter";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6"
      >
        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6"
        >
          Hi, I&apos;m Syed Adil
        </motion.h1>

        <motion.p
          variants={item}
          className="text-xl md:text-2xl text-zinc-300 h-[36px] md:h-[40px]"
        >
          <Typewriter />
        </motion.p>
      </motion.div>
    </section>
  );
}
