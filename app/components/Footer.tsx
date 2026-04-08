const quotes = [
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
];

export default function Footer() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const quote = quotes[dayOfYear % quotes.length];

  return (
    <footer className="py-20 px-6">
      <div className="mx-auto max-w-3xl text-center">
        {/* Large quotation mark */}
        <div className="text-zinc-600 mb-6 flex justify-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        <p className="text-zinc-400 text-lg italic mb-4">
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="text-zinc-500 text-sm mb-2">{quote.author}</p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700 mb-12">
          Quote of the Day
        </p>

        <p className="text-sm text-zinc-700 font-mono">
          &copy; {new Date().getFullYear()} Syed Adil
        </p>
      </div>
    </footer>
  );
}
