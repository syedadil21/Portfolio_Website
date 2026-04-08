"use client";

import { useState, type FormEvent } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <section id="contact" className="py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left — Info */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-600 mb-4">
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              I&apos;m always looking to learn and collaborate on new ideas.
              Let&apos;s connect!
            </p>

            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-2 rounded-full border border-zinc-700/50 text-zinc-500">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-300">Location</p>
                <p className="text-sm text-zinc-500">Karachi, Pakistan</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-2 rounded-full border border-zinc-700/50 text-zinc-500">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-300">Email</p>
                <a
                  href="mailto:syed_adil21@live.com"
                  className="text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  syed_adil21@live.com
                </a>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Web3Forms access key — replace with your own from https://web3forms.com */}
            <input
              type="hidden"
              name="access_key"
              value="edaf0c56-6702-4459-b85a-6b44df812092"
            />

            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              className="w-full px-4 py-3.5 rounded-lg bg-zinc-900/60 border border-zinc-700/50 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors text-sm"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full px-4 py-3.5 rounded-lg bg-zinc-900/60 border border-zinc-700/50 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors text-sm"
            />
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Your message..."
              className="w-full px-4 py-3.5 rounded-lg bg-zinc-900/60 border border-zinc-700/50 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors text-sm resize-none"
            />

            {/* Status messages */}
            {status === "success" && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-900/40 border border-emerald-700/30">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-emerald-400 shrink-0"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p className="text-sm text-emerald-300">
                  Message sent successfully! I&apos;ll get back to you soon.
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-900/40 border border-red-700/30">
                <p className="text-sm text-red-300">
                  Something went wrong. Please try again or email me directly at{" "}
                  <a
                    href="mailto:syed_adil21@live.com"
                    className="underline hover:text-white"
                  >
                    syed_adil21@live.com
                  </a>
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 text-white font-medium transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
