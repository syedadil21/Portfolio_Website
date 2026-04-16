"use client";

import { useEffect, useState, useCallback } from "react";

const fullText =
  "Full Stack Software Engineer. Building AI-Powered Systems. Mobile & Web App Developer. From Idea to Deployment.";

export default function Typewriter() {
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    if (!isDeleting) {
      setCharIndex((prev) => prev + 1);

      if (charIndex + 1 === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2500);
        return;
      }
    } else {
      setCharIndex((prev) => prev - 1);

      if (charIndex - 1 === 0) {
        setIsDeleting(false);
        return;
      }
    }
  }, [charIndex, isDeleting]);

  useEffect(() => {
    const speed = isDeleting ? 20 : 50;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span>
      {fullText.slice(0, charIndex)}
      <span className="animate-blink ml-1 text-blue-400 font-normal text-[1.1em]">
        ▌
      </span>
    </span>
  );
}
