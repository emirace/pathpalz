import Image from "next/image";
import React from "react";

const features = [
  {
    icon: "⇄",
    color: "#185FA5",
    title: "The Peer Partner",
    description:
      "Someone at your level. You'll review each other's code, debug together, and celebrate wins. It's the \"Palz\" in PathPalz.",
  },
  {
    icon: "✓",
    color: "#0F6E56",
    title: "The Accountability Manager",
    description:
      "Your personal coach who monitors your progress. If you slip behind, they're there with a plan to get you back on track.",
  },
  {
    icon: "★",
    color: "#854F0B",
    title: "Absorption into PathPalz",
    description:
      "High-performing graduates may be considered for a paid role or freelance opportunity with PathPalz directly. Not guaranteed — it's earned.",
  },
];

const photos = [
  { src: "/support_1.png", alt: "PathPalz peer partner", aspect: "3/4" },
  { src: "/support_2.png", alt: "PathPalz accountability manager", aspect: "4/3" },
  { src: "/support_3.png", alt: "PathPalz code review", aspect: "4/3" },
  { src: "/support_4.png", alt: "PathPalz support success", aspect: "4/3" },
];

const SupportSystem = () => {
  return (
    <div
      style={{
        padding: "clamp(28px,4vw,44px) clamp(20px,4vw,52px)",
        borderBottom: "1px solid #E7E4DB",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "32px",
          alignItems: "center",
        }}
      >
        <div data-reveal="">
          <div
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 600,
              fontSize: "clamp(19px,2.6vw,25px)",
              color: "#042C53",
              marginBottom: "8px",
            }}
          >
            Built-in Support System
          </div>
          <div
            style={{
              fontSize: "13.5px",
              color: "#5F5E5A",
              lineHeight: 1.6,
              marginBottom: "20px",
            }}
          >
            Self-learning is hard. That's why every PathPalz student is
            flanked by two dedicated supporters from day one.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {features.map((feature, idx) => (
              <div key={idx} style={{ display: "flex", gap: "10px" }}>
                <span
                  style={{
                    color: feature.color,
                    flexShrink: 0,
                    marginTop: "1px",
                    fontSize: "13px",
                  }}
                >
                  {feature.icon}
                </span>
                <div>
                  <div
                    style={{
                      font: "600 13px 'IBM Plex Sans',sans-serif",
                      color: "#2C2C2A",
                      marginBottom: "2px",
                    }}
                  >
                    {feature.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "#5F5E5A", lineHeight: 1.4 }}>
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              style={{
                position: "relative",
                aspectRatio: photo.aspect,
                borderRadius: "12px",
                overflow: "hidden",
                alignSelf: i % 2 === 1 ? "start" : undefined,
                animation: `floatY 7s ease-in-out infinite ${i * 0.3}s`,
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportSystem;
