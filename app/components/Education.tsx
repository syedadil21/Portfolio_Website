const coursework = [
  "DevOps",
  "Recommender Systems",
  "Database Management Systems",
  "Design & Analysis of Algorithms",
  "Software Engineering",
  "Software Design & Analysis",
  "Requirement Engineering",
];

const achievements = [
  {
    title: "Dean's List",
    detail: "1st & 2nd Semester — awarded for academic excellence",
  },
  {
    title: "Student Lab Assistant (SLA)",
    detail: "Object Oriented Programming — 3rd & 4th Semester",
  },
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

          {/* Achievements */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-zinc-600 mb-3">
              Achievements
            </p>
            <div className="space-y-2">
              {achievements.map((a) => (
                <div
                  key={a.title}
                  className="flex items-start gap-3 px-4 py-3 rounded-lg bg-zinc-800/40 border border-zinc-700/40"
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
                    className="text-amber-400 shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      {a.title}
                    </p>
                    <p className="text-xs text-zinc-500">{a.detail}</p>
                  </div>
                </div>
              ))}
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
