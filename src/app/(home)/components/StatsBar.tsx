"use client";

const STATS = [
  { count: 30, label: "Seats per cohort — small by design, so no one gets left behind", delay: 0 },
  { count: 2, label: "Dedicated supporters each — a peer partner and an accountability manager", delay: 0.08 },
  { count: 16, suf: " wks", label: "From absolute zero to a live deployed project on your PathPalz subdomain", delay: 0.16 },
  { count: 0, pre: "£", label: "Risk — 7-day money-back guarantee on every enrolment, no questions asked", color: "#0F6E56", delay: 0.24 },
] as const;

export function StatsBar() {
  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #E7E4DB",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      }}
    >
      {STATS.map((stat, i) => (
        <div
          key={i}
          data-reveal=""
          data-reveal-delay={String(stat.delay)}
          style={{
            padding: "26px 20px",
            textAlign: "center",
            borderRight: i < 3 ? "1px solid #EFEDE5" : undefined,
          }}
        >
          <div
            data-count={String(stat.count)}
            data-pre={"pre" in stat ? stat.pre : ""}
            data-suf={"suf" in stat ? stat.suf : ""}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "34px",
              color: "color" in stat ? stat.color : "#185FA5",
              marginBottom: "6px",
            }}
          >
            {"pre" in stat ? stat.pre : ""}{stat.count}{"suf" in stat ? stat.suf : ""}
          </div>
          <div style={{ fontSize: "12px", color: "#5F5E5A", lineHeight: 1.45, maxWidth: "180px", margin: "0 auto" }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
