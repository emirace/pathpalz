"use client";

const CARDS = [
  {
    badge: "THE PEER PARTNER",
    badgeBg: "#E6F1FB",
    badgeColor: "#0C447C",
    title: "Someone at your exact level",
    body: 'Matched on time zone, experience and learning style. You review each other\'s code, debug together, and hold each other accountable. The "Palz" in PathPalz.',
    delay: 0,
  },
  {
    badge: "ACCOUNTABILITY MANAGER",
    badgeBg: "#EAF3DE",
    badgeColor: "#27500A",
    title: "Your personal progress coach",
    body: "Every week they check your progress. If you slip behind, they don't just notice — they step in with a plan to get you back on track. No one gets left behind.",
    delay: 0.1,
  },
];

export function BuiltInSupport() {
  return (
    <div
      style={{
        background: "#F5F3EC",
        backgroundImage: "radial-gradient(rgba(15,110,86,.055) 1px,transparent 1px),radial-gradient(circle at 0% 0%,rgba(15,110,86,.07),transparent 44%)",
        backgroundSize: "22px 22px,100% 100%",
        padding: "clamp(30px,4vw,52px) clamp(20px,4vw,52px)",
        borderBottom: "1px solid #E7E4DB",
      }}
    >
      <div data-reveal="" style={{ font: "500 11px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#8A8981", textTransform: "uppercase", marginBottom: "8px" }}>// Built-in support</div>
      <div data-reveal="" data-reveal-delay="0.05" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(20px,2.8vw,28px)", color: "#2C2C2A", marginBottom: "6px", letterSpacing: "-.01em" }}>You will never learn alone</div>
      <div data-reveal="" data-reveal-delay="0.1" style={{ fontSize: "14px", color: "#5F5E5A", lineHeight: 1.6, maxWidth: "480px", marginBottom: "24px" }}>Self-learning fails because it&apos;s lonely. PathPalz fixes that from day one.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px" }}>
        {CARDS.map((card, i) => (
          <div
            key={i}
            data-reveal=""
            data-reveal-delay={String(card.delay)}
            className="hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(4,44,83,.12)] transition-all duration-[220ms]"
            style={{ background: "#fff", border: "1px solid #E7E4DB", borderRadius: "14px", padding: "22px" }}
          >
            <div style={{ display: "inline-block", font: "600 10px 'IBM Plex Mono',monospace", background: card.badgeBg, color: card.badgeColor, padding: "4px 10px", borderRadius: "20px", marginBottom: "12px", letterSpacing: ".04em" }}>{card.badge}</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "16px", color: "#2C2C2A", marginBottom: "6px" }}>{card.title}</div>
            <div style={{ fontSize: "13px", color: "#5F5E5A", lineHeight: 1.6 }}>{card.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
