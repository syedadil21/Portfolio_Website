const coursework = [
  "DevOps",
  "Recommender Systems",
  "Database Management Systems",
  "Design & Analysis of Algorithms",
  "Software Engineering",
  "Software Design & Analysis",
  "Requirement Engineering",
];

export default function Education() {
  return (
    <section id="education" className="py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-10">Education</h2>

        <div className="rounded-xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Bachelor of Science in Computer Science
              </h3>
              <p className="text-blue-400 font-medium">
                National University of Computer and Emerging Sciences (FAST)
              </p>
              <p className="text-zinc-500 text-sm mt-1">Karachi, Pakistan</p>
            </div>
            <div className="text-sm text-zinc-500 sm:text-right shrink-0">
              <p>Jan 2021 — Dec 2024</p>
              <p className="text-zinc-400 font-medium mt-1">CGPA: 3.27</p>
            </div>
          </div>

          {/* Relevant Coursework */}
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-600 mb-3">
              Relevant Coursework
            </p>
            <div className="flex flex-wrap gap-1.5">
              {coursework.map((course) => (
                <span
                  key={course}
                  className="px-2.5 py-1 text-xs text-zinc-400 bg-zinc-800/60 border border-zinc-700/50 rounded"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
