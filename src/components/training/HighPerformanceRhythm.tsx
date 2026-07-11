import React from "react";

const scheduleCards = [
  {
    id: "1",
    day: "Tuesday",
    title: "Pair Lab Challenge",
    description: "Build something with your partner",
    highlight: false,
  },
  {
    id: "2",
    day: "Thursday",
    title: "Peer Code Review",
    description: "Critique and be critiqued — building communication via code",
    highlight: false,
  },
  {
    id: "3",
    day: "Saturday",
    title: "Core Lesson",
    description: "Concept + worked example",
    highlight: false,
  },
  {
    id: "4",
    day: "Sunday",
    title: "Core Lesson",
    description: "Concept + worked example",
    highlight: true,
  },
];

const HighPerformanceRhythm = () => {
  return (
    <div
      style={{
        background: "#042C53",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(28px,4vw,44px) clamp(20px,4vw,52px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(133,183,235,.3) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.1,
          animation: "gridPulse 6s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "24px",
          alignItems: "center",
        }}
      >
        <div data-reveal="">
          <div
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 600,
              fontSize: "clamp(19px,2.6vw,25px)",
              color: "#fff",
              marginBottom: "10px",
            }}
          >
            A High-Performance Rhythm
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "#B5D4F4",
              lineHeight: 1.65,
              marginBottom: "18px",
            }}
          >
            Our schedule is designed to maximize cognitive load during peak
            hours while ensuring deep rest for long-term retention.
          </div>
          <div
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid #0C3057",
              borderRadius: "10px",
              padding: "12px 14px",
            }}
          >
            <div
              style={{
                font: "600 10px 'IBM Plex Mono',monospace",
                color: "#85B7EB",
                letterSpacing: ".06em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Key performance indicator
            </div>
            <div
              style={{
                font: "600 14px 'IBM Plex Sans',sans-serif",
                color: "#fff",
                marginBottom: "8px",
              }}
            >
              12+ Hours/Week Commitment
            </div>
            <div
              style={{
                height: "5px",
                background: "#0C3057",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "5px",
                  width: "80%",
                  background: "#4FB79A",
                  borderRadius: "3px",
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          {scheduleCards.map((card, i) => (
            <div
              key={card.id}
              style={{
                background: card.highlight ? "#0F6E56" : "rgba(255,255,255,.05)",
                border: `1px solid ${card.highlight ? "#0F6E56" : "#0C3057"}`,
                borderRadius: "10px",
                padding: "14px",
                animation: `floatY 6s ease-in-out infinite ${i * 0.3}s`,
              }}
            >
              <div
                style={{
                  font: "600 9px 'IBM Plex Mono',monospace",
                  color: card.highlight ? "#B7EAD9" : "#5DCAA5",
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                {card.day}
              </div>
              <div
                style={{
                  font: "600 13px 'IBM Plex Sans',sans-serif",
                  color: "#fff",
                  marginBottom: "3px",
                }}
              >
                {card.title}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: card.highlight ? "#DDF5EC" : "#85B7EB",
                  lineHeight: 1.5,
                }}
              >
                {card.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighPerformanceRhythm;
