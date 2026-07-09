"use client";

interface Props {
  onOpenModal: () => void;
}

export function HomeAnnouncementBar({ onOpenModal }: Props) {
  return (
    <div
      style={{
        background: "#0C447C",
        color: "#fff",
        padding: "10px clamp(14px, 2.5vw, 22px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "12.5px",
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#4FB79A",
            boxShadow: "0 0 0 3px rgba(79, 183, 154, 0.25)",
            animation: "dotBlink 1.4s ease-in-out infinite",
            flexShrink: 0,
          }}
        />
        <span>
          August cohort now enrolling — Software Development &amp; DevOps.{" "}
          <span style={{ color: "#B5D4F4" }}>30 seats per cohort · closes 28 July.</span>
        </span>
      </div>
      <button
        onClick={onOpenModal}
        className="hover:scale-95 transition-transform"
        style={{
          font: "600 11.5px 'IBM Plex Sans', sans-serif",
          background: "#fff",
          color: "#0C447C",
          padding: "5px 14px",
          borderRadius: "20px",
          border: "none",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Reserve my seat →
      </button>
    </div>
  );
}
