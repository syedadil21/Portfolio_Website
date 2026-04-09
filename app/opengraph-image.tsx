import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Syed Adil — Full Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0e1a 0%, #0d1525 40%, #111827 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Decorative shapes */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          }}
        />

        {/* SA logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.3)",
            marginBottom: 32,
            fontSize: 32,
            fontWeight: 700,
            color: "#60a5fa",
          }}
        >
          SA
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          Syed Adil
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            marginBottom: 24,
          }}
        >
          Full Stack Software Engineer
        </div>

        {/* Tech tags */}
        <div
          style={{
            display: "flex",
            gap: 12,
          }}
        >
          {["Next.js", "React Native", "ASP.NET", "AI/LLM", "PostgreSQL"].map(
            (tech) => (
              <div
                key={tech}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#cbd5e1",
                  fontSize: 16,
                }}
              >
                {tech}
              </div>
            )
          )}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 16,
            color: "#475569",
          }}
        >
          syedadil21.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
