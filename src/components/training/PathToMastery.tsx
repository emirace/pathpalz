const steps = [
  {
    number: "01",
    title: "Apply in 5 minutes",
    description:
      "Tell us about your goals. No coding test required for entry—we value motivation over existing knowledge.",
  },
  {
    number: "02",
    title: "Get matched",
    description:
      "We pair you with a peer partner and an accountability manager to ensure you never walk alone.",
  },
  {
    number: "03",
    title: "Build real projects",
    description:
      "Every week, you'll ship code. From web apps to internal tools, you learn by doing, not just watching.",
  },
  {
    number: "04",
    title: "Graduate with power",
    description:
      "Walk away with a professional portfolio that proves your skills to top-tier hiring managers.",
  },
];

const PathToMastery = () => {
  return (
    <div
      style={{
        background: "#F5F3EC",
        padding: "clamp(28px,4vw,44px) clamp(20px,4vw,52px)",
        borderTop: "1px solid #E7E4DB",
        borderBottom: "1px solid #E7E4DB",
      }}
    >
      <div
        data-reveal=""
        style={{
          textAlign: "center",
          maxWidth: "520px",
          margin: "0 auto 28px",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 600,
            fontSize: "clamp(19px,2.6vw,25px)",
            color: "#042C53",
            marginBottom: "6px",
          }}
        >
          The Path to Mastery
        </div>
        <div style={{ fontSize: "13.5px", color: "#5F5E5A" }}>
          Four simple steps to transform your professional trajectory.
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
        }}
      >
        {steps.map((step, i) => (
          <div
            key={step.number}
            data-reveal=""
            data-reveal-delay={(i * 0.1).toFixed(1)}
            style={{ position: "relative" }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontWeight: 700,
                fontSize: "44px",
                color: "#DAD8CE",
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              {step.number}
            </div>
            <div
              style={{
                font: "600 14px 'IBM Plex Sans',sans-serif",
                color: "#042C53",
                marginBottom: "6px",
              }}
            >
              {step.title}
            </div>
            <div style={{ fontSize: "12.5px", color: "#5F5E5A", lineHeight: 1.6 }}>
              {step.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathToMastery;
