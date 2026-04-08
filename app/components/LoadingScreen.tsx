"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment = current < 30 ? 12 : current < 70 ? 8 : current < 90 ? 4 : 15;
      current = Math.min(current + increment + Math.random() * 5, 100);
      setProgress(Math.round(current));

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setHidden(true), 400);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <p className="text-7xl font-bold tabular-nums tracking-tight">
          {progress}%
        </p>
        <p className="mt-3 text-sm uppercase tracking-[0.3em] text-zinc-600">
          Loading
        </p>
      </div>
    </div>
  );
}
