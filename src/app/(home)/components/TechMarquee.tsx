"use client";

const TECHS = ["Python","·","JavaScript","·","React","·","Flask","·","Linux","·","Git","·","Docker","·","CI/CD","·","AWS","·","Databases","·","Terraform","·"];

export function TechMarquee() {
  return (
    <div
      style={{
        background: "#08325C",
        overflow: "hidden",
        padding: "11px 0",
        borderTop: "1px solid rgba(133,183,235,0.14)",
        borderBottom: "1px solid rgba(133,183,235,0.14)",
      }}
    >
      <div style={{ display: "flex", width: "max-content", animation: "marquee 24s linear infinite", gap: 0 }}>
        {[0, 1].map((i) => (
          <div
            key={i}
            aria-hidden={i === 1 ? "true" : undefined}
            style={{
              display: "flex",
              gap: "42px",
              paddingRight: "42px",
              font: "500 11.5px 'IBM Plex Mono', monospace",
              color: "#6FA8DC",
              whiteSpace: "nowrap",
              letterSpacing: ".04em",
            }}
          >
            {TECHS.map((t, j) => (
              <span key={j}>{t}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
