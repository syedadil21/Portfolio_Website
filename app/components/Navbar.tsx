"use client";

import { useState, useEffect } from "react";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-start justify-between px-4 pt-4">
      {/* Spacer for left side */}
      <div className="w-24 hidden lg:block" />

      {/* Floating pill */}
      <div
        className={`transition-all duration-500 rounded-full px-8 py-3 flex items-center gap-8 ${
          scrolled
            ? "bg-zinc-900/80 backdrop-blur-xl shadow-lg shadow-black/20 border border-white/5"
            : "bg-zinc-900/40 backdrop-blur-md border border-white/5"
        }`}
      >
        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-6 h-5 flex flex-col justify-between"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-full bg-white transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[9px]" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-white transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[9px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Resume button — top right */}
      <a
        href="/Resume_SyedAdil.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:flex items-center gap-2 px-4 py-2 mt-0.5 rounded-full text-sm text-zinc-400 hover:text-white bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-white/15 transition-all duration-300 whitespace-nowrap"
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
        Resume
      </a>

      {/* Mobile dropdown */}
      <div
        className={`lg:hidden fixed top-[72px] left-4 right-4 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-white/5 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
