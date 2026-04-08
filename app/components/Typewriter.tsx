"use client";

import { useEffect, useState, useCallback } from "react";

const phrases = [
  "Full Stack Software Engineer.",
  "AI Systems Builder.",
  "Mobile App Developer.",
  "Tech Enthusiast.",
];

export default function Typewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");

  const tick = useCallback(() => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      setText(currentPhrase.slice(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);

      if (charIndex + 1 === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 1800);
        return;
      }
    } else {
      setText(currentPhrase.slice(0, charIndex - 1));
      setCharIndex((prev) => prev - 1);

      if (charIndex - 1 === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        return;
      }
    }
  }, [charIndex, isDeleting, phraseIndex]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span>
      {text}
      <span className="animate-blink ml-0.5 font-light text-blue-400">|</span>
    </span>
  );
}
