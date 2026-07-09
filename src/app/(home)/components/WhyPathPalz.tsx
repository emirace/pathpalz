"use client";

const CARDS = [
  { tag: "{ real }", tagColor: "#185FA5", borderColor: "#185FA5", title: "You build real things. Every week.", body: "Not exercises you delete. Actual projects that ship — web apps, APIs, pipelines — straight into your GitHub and portfolio.", delay: 0 },
  { tag: "{ live }", tagColor: "#0F6E56", borderColor: "#0F6E56", title: "Live cohort. Not a video library.", body: "A class of 30 — live, synchronous, with real instructors who know your name. When you're stuck, you get unstuck.", delay: 0.08 },
  { tag: "{ proof }", tagColor: "#854F0B", borderColor: "#854F0B", title: 'Graduate with proof, not just a certificate.', body: 'A live deployed project, a public GitHub with real commit history, and a portfolio that replaces "meaning to learn" with evidence.', delay: 0.16 },
  { tag: "{ hired }", tagColor: "#993556", borderColor: "#993556", title: "Top graduates get more than a certificate.", body: "High-performing graduates are considered for paid PathPalz roles and freelance contracts first — before we advertise. Earned, not guaranteed.", delay: 0.24 },
];

export function WhyPathPalz() {
  return (
    <div
      style={{
        background: "#fff",
        backgroundImage: "radial-gradient(rgba(24,95,165,.04) 1px,transparent 1px),radial-gradient(circle at 100% 100%,rgba(133,183,235,.12),transparent 44%)",
        backgroundSize: "24px 24px,100% 100%",
        padding: "clamp(30px,4vw,52px) clamp(20px,4vw,52px)",
        borderBottom: "1px solid #E7E4DB",
      }}
    >
      <div data-reveal="" style={{ font: "500 11px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#8A8981", textTransform: "uppercase", marginBottom: "8px" }}>// Why PathPalz</div>
      <div data-reveal="" data-reveal-delay="0.05" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(20px,2.8vw,28px)", color: "#2C2C2A", marginBottom: "24px", letterSpacing: "-.01em", maxWidth: "640px" }}>What makes this different from every other course you&apos;ve seen</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "14px" }}>
        {CARDS.map((card, i) => (
          <div
            key={i}
            data-reveal=""
            data-reveal-delay={String(card.delay)}
            style={{ background: "#F8F7F1", border: "1px solid #EAE8DF", borderRadius: "14px", padding: "20px", borderLeft: `3px solid ${card.borderColor}` }}
          >
            <div style={{ font: "600 13px 'IBM Plex Mono',monospace", color: card.tagColor, marginBottom: "10px" }}>{card.tag}</div>
            <div style={{ font: "600 14.5px 'IBM Plex Sans',sans-serif", color: "#2C2C2A", marginBottom: "5px" }}>{card.title}</div>
            <div style={{ fontSize: "12.5px", color: "#5F5E5A", lineHeight: 1.55 }}>{card.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
