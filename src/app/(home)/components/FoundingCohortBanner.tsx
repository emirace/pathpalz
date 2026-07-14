"use client";

import { SECTION_MAX_WIDTH } from "@/utils/layout";

interface Props {
  onOpenModal: () => void;
}

export function FoundingCohortBanner({ onOpenModal }: Props) {
  return (
    <div
      style={{
        background: "#042C53",
        padding: "clamp(30px,4vw,52px) clamp(20px,4vw,52px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(133,183,235,.3) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      />
      <div
        data-reveal=""
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
          maxWidth: SECTION_MAX_WIDTH,
          marginInline: "auto",
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              font: "500 11px 'IBM Plex Mono',monospace",
              color: "#F0C88A",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#F0C88A",
                animation: "dotBlink 1.4s infinite",
              }}
            />
            Founding cohort · one time only
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 600,
              fontSize: "clamp(22px,3vw,30px)",
              color: "#fff",
              marginBottom: "10px",
              lineHeight: 1.2,
              letterSpacing: "-.01em",
            }}
          >
            The August 2025 cohort is PathPalz&apos;s founding cohort.
          </div>
          <div style={{ fontSize: "15px", color: "#B5D4F4", lineHeight: 1.65 }}>
            There is only ever one founding cohort. Founding members get a
            reduced rate, direct access to the instructors who built the
            curriculum, and permanent recognition as a PathPalz founding
            graduate. This cannot be bought again at any price.
          </div>
        </div>
        <button
          onClick={onOpenModal}
          className="hover:bg-[#2E74BE] hover:-translate-y-0.5 transition-all duration-150"
          style={{
            font: "600 15px 'IBM Plex Sans',sans-serif",
            background: "#185FA5",
            color: "#fff",
            padding: "13px 24px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: "0 10px 26px rgba(24,95,165,.4)",
          }}
        >
          Secure a founding seat
        </button>
      </div>
    </div>
  );
}
