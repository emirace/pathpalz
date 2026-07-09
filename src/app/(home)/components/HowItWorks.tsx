"use client";

const STEPS = [
  { num: "01", title: "Apply in 5 minutes", body: "Tell us your goals. No coding test, no prior knowledge required. Motivation over experience.", color: "#E6F1FB", textColor: "#0C447C", delay: 0 },
  { num: "02", title: "Get matched", body: "A peer partner at your level and an accountability manager, assigned before your first session.", color: "#E6F1FB", textColor: "#0C447C", delay: 0.08 },
  { num: "03", title: "Build real things", body: "Every week you ship code — web apps, APIs, pipelines — straight into your GitHub and portfolio.", color: "#E6F1FB", textColor: "#0C447C", delay: 0.16 },
  { num: "04", title: "Graduate with proof", body: "A live project on your subdomain, a public GitHub, and a certificate that opens doors.", color: "#E1F5EE", textColor: "#0F6E56", delay: 0.24 },
];

export function HowItWorks() {
  return (
    <div
      style={{
        background: "#F5F3EC",
        backgroundImage: "radial-gradient(rgba(24,95,165,.05) 1px,transparent 1px),radial-gradient(circle at 100% 0%,rgba(24,95,165,.08),transparent 46%)",
        backgroundSize: "22px 22px,100% 100%",
        padding: "clamp(30px,4vw,52px) clamp(20px,4vw,52px)",
        borderBottom: "1px solid #E7E4DB",
      }}
    >
      <div data-reveal="" style={{ font: "500 11px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#8A8981", textTransform: "uppercase", marginBottom: "8px" }}>// How it works</div>
      <div data-reveal="" data-reveal-delay="0.05" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(20px,2.8vw,28px)", color: "#2C2C2A", marginBottom: "6px", letterSpacing: "-.01em" }}>From zero to hired — exactly what happens</div>
      <div data-reveal="" data-reveal-delay="0.1" style={{ fontSize: "14px", color: "#5F5E5A", lineHeight: 1.6, maxWidth: "520px", marginBottom: "24px" }}>No coding test to apply. We value motivation over existing knowledge — the structure does the rest.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "14px" }}>
        {STEPS.map((step, i) => (
          <div
            key={i}
            data-reveal=""
            data-reveal-delay={String(step.delay)}
            className="hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(4,44,83,.1)] transition-all duration-[220ms]"
            style={{ background: "#fff", border: "1px solid #E7E4DB", borderRadius: "14px", padding: "20px" }}
          >
            <div style={{ width: "30px", height: "30px", borderRadius: "9px", background: step.color, color: step.textColor, font: "600 13px 'Space Grotesk',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "13px" }}>{step.num}</div>
            <div style={{ font: "600 14.5px 'IBM Plex Sans',sans-serif", color: "#2C2C2A", marginBottom: "5px" }}>{step.title}</div>
            <div style={{ fontSize: "12.5px", color: "#5F5E5A", lineHeight: 1.55 }}>{step.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
