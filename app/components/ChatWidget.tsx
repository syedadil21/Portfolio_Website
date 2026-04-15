"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm Adil's AI assistant. Ask me anything about his experience, projects, or skills!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [stickManActive, setStickManActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Periodically trigger the stick figure home run animation
  useEffect(() => {
    if (open) return;

    // First trigger after 4s so user notices the button first
    const initialTimeout = setTimeout(() => setStickManActive(true), 4000);

    // Then every 18s
    const interval = setInterval(() => {
      setStickManActive(true);
    }, 18000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [open]);

  // Reset stick man after animation completes
  useEffect(() => {
    if (!stickManActive) return;
    const timeout = setTimeout(() => setStickManActive(false), 4500);
    return () => clearTimeout(timeout);
  }, [stickManActive]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages([...updated, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([
          ...updated,
          {
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages([
        ...updated,
        {
          role: "assistant",
          content: "Couldn't connect. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          style={{ height: "480px" }}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 text-xs font-bold">
                SA
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Ask about Adil
                </p>
                <p className="text-[11px] text-zinc-500">
                  AI-powered assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-zinc-500 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed border ${
                    msg.role === "user"
                      ? "bg-blue-500/15 border-blue-400/20 text-white rounded-br-sm"
                      : "bg-white/5 border-white/10 text-zinc-300 rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 text-zinc-400 px-4 py-3 rounded-2xl rounded-bl-sm text-sm">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/10 bg-white/3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/25 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400/25 hover:bg-blue-500/30 disabled:opacity-40 disabled:cursor-not-allowed text-blue-300 transition-colors"
                aria-label="Send message"
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
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating button container */}
      <div className={`fixed bottom-6 right-6 z-50 ${!open && stickManActive ? "animate-screen-shake" : ""}`}>
        {/* Pulsing rings — only when closed */}
        {!open && !stickManActive && (
          <>
            <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-chat-ping pointer-events-none" />
            <span className="absolute inset-0 rounded-full bg-blue-400/20 animate-chat-ping-delayed pointer-events-none" />
          </>
        )}

        {/* Sparkle badge — only when closed */}
        {!open && !stickManActive && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3 z-10 pointer-events-none">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
          </span>
        )}

        {/* Stick figure batter — pops up from behind-left, swings an uppercut into button */}
        {!open && stickManActive && (
          <>
            {/* SVG filter definitions for bat motion blur */}
            <svg width="0" height="0" className="absolute" aria-hidden="true">
              <defs>
                <filter id="bat-motion-blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blurred">
                    <animate
                      attributeName="stdDeviation"
                      values="0;0;0;4;4;4;0;0;0"
                      keyTimes="0;0.18;0.28;0.35;0.42;0.5;0.6;0.8;1"
                      dur="4.5s"
                      fill="freeze"
                    />
                  </feGaussianBlur>
                </filter>
              </defs>
            </svg>

            <svg
              width="90"
              height="120"
              viewBox="10 -10 90 120"
              className="absolute -bottom-4 -left-20 pointer-events-none animate-stickman"
              aria-hidden="true"
              style={{ zIndex: 1 }}
            >
              {/* Head */}
              <circle cx="30" cy="20" r="9" stroke="white" strokeWidth="2.5" fill="none" />
              {/* Body */}
              <line x1="30" y1="29" x2="30" y2="68" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              {/* Legs — wider stance */}
              <line x1="30" y1="68" x2="18" y2="95" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="30" y1="68" x2="42" y2="95" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              {/* Back arm (resting against body) */}
              <line x1="30" y1="40" x2="22" y2="55" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

              {/* Swinging arm + bat — with motion blur filter */}
              <g
                className="animate-stickman-swing"
                style={{ transformOrigin: "30px 40px", filter: "url(#bat-motion-blur)" }}
              >
                <line x1="30" y1="40" x2="42" y2="58" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="42" y1="58" x2="48" y2="66" stroke="#6b4423" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="48" y1="66" x2="68" y2="88" stroke="#a16207" strokeWidth="7" strokeLinecap="round" />
              </g>
            </svg>

            {/* Impact flash — bursts at bottom of button where bat connects */}
            <div className="absolute inset-0 rounded-full pointer-events-none animate-impact-flash" style={{ zIndex: 2 }} />

            {/* POW lines — radiating from impact point */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute left-1/2 -translate-x-1/2 -bottom-6 pointer-events-none animate-impact-lines"
              aria-hidden="true"
              style={{ zIndex: 2 }}
            >
              <g stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none">
                <line x1="60" y1="20" x2="60" y2="5" />
                <line x1="20" y1="40" x2="5" y2="30" />
                <line x1="100" y1="40" x2="115" y2="30" />
                <line x1="15" y1="60" x2="0" y2="60" />
                <line x1="105" y1="60" x2="120" y2="60" />
                <line x1="25" y1="85" x2="10" y2="95" />
                <line x1="95" y1="85" x2="110" y2="95" />
                <line x1="60" y1="95" x2="60" y2="115" />
              </g>
            </svg>

            {/* Debris particles — burst outward at impact */}
            <div
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{ zIndex: 3, transform: "translate(-50%, -50%)" }}
              aria-hidden="true"
            >
              {[
                { angle: 0, distance: 80, delay: 0 },
                { angle: 45, distance: 70, delay: 0.02 },
                { angle: 90, distance: 90, delay: 0 },
                { angle: 135, distance: 75, delay: 0.03 },
                { angle: 180, distance: 85, delay: 0.01 },
                { angle: 225, distance: 65, delay: 0.04 },
                { angle: 270, distance: 80, delay: 0.02 },
                { angle: 315, distance: 72, delay: 0 },
                { angle: 20, distance: 95, delay: 0.05 },
                { angle: 160, distance: 100, delay: 0.03 },
                { angle: 200, distance: 88, delay: 0.04 },
                { angle: 340, distance: 92, delay: 0.02 },
              ].map((p, i) => {
                const rad = (p.angle * Math.PI) / 180;
                const x = Math.cos(rad) * p.distance;
                const y = Math.sin(rad) * p.distance;
                const size = 4 + (i % 3);
                const colors = ["#fbbf24", "#60a5fa", "#a78bfa", "#ffffff"];
                return (
                  <span
                    key={i}
                    className="absolute block rounded-full animate-debris"
                    style={
                      {
                        width: `${size}px`,
                        height: `${size}px`,
                        background: colors[i % colors.length],
                        boxShadow: `0 0 8px ${colors[i % colors.length]}`,
                        "--debris-x": `${x}px`,
                        "--debris-y": `${y}px`,
                        animationDelay: `${p.delay}s`,
                      } as React.CSSProperties
                    }
                  />
                );
              })}
            </div>

            {/* Motion trail — blue ghost copies of the button that fade behind it */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none animate-button-trail-1 bg-gradient-to-r from-blue-600/50 via-blue-500/50 to-violet-600/50"
              style={{ zIndex: 0 }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 rounded-full pointer-events-none animate-button-trail-2 bg-gradient-to-r from-blue-600/30 via-blue-500/30 to-violet-600/30"
              style={{ zIndex: 0 }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 rounded-full pointer-events-none animate-button-trail-3 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-violet-600/20"
              style={{ zIndex: 0 }}
              aria-hidden="true"
            />

            {/* Speed lines — trailing streaks as button flies up */}
            <svg
              width="80"
              height="140"
              viewBox="0 0 80 140"
              className="absolute left-1/2 -translate-x-1/2 -top-36 pointer-events-none animate-speed-lines"
              aria-hidden="true"
              style={{ zIndex: 1 }}
            >
              <g stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7">
                <line x1="20" y1="0" x2="20" y2="30" />
                <line x1="35" y1="10" x2="35" y2="50" />
                <line x1="50" y1="0" x2="50" y2="35" />
                <line x1="60" y1="15" x2="60" y2="55" />
                <line x1="15" y1="20" x2="15" y2="60" />
                <line x1="45" y1="25" x2="45" y2="70" />
              </g>
            </svg>
          </>
        )}

      <button
        onClick={() => setOpen(!open)}
        className={`relative flex items-center transition-all duration-300 ${
          open
            ? "w-14 h-14 rounded-full justify-center bg-zinc-800 hover:bg-zinc-700 shadow-lg shadow-black/30"
            : `gap-2 pl-3.5 pr-3.5 py-2.5 rounded-full bg-gradient-to-r from-blue-600/90 via-blue-500/90 to-violet-600/90 backdrop-blur-xl hover:from-blue-500 hover:via-blue-400 hover:to-violet-500 hover:scale-[1.05] shadow-[0_4px_24px_rgba(59,130,246,0.5),0_0_0_1px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.7),0_0_0_1px_rgba(255,255,255,0.25)] border border-white/30 ${
                stickManActive ? "animate-chat-homerun" : "animate-chat-bounce"
              }`
        }`}
        style={!open ? {
          transform: "perspective(800px) rotateX(2deg)",
        } : undefined}
        aria-label="Toggle chat"
      >
        {open ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <>
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <span className="text-white/90 text-xs font-semibold tracking-wide whitespace-nowrap">
              Ask AI about Adil
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-40"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </>
        )}
      </button>
      </div>
    </>
  );
}
