"use client";

interface Props {
  seatsRemaining: number;
  onOpenModal: () => void;
}

export function StickySeatsBar({ seatsRemaining, onOpenModal }: Props) {
  return (
    <div
      data-sticky=""
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 40,
        opacity: 0,
        transform: "translateY(20px)",
        pointerEvents: "none",
        transition: "opacity .4s ease, transform .4s ease",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#042C53",
        border: "1px solid rgba(133,183,235,.3)",
        borderRadius: "14px",
        padding: "11px 14px",
        boxShadow: "0 18px 44px rgba(4,44,83,.4)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1D9E75", animation: "dotBlink 1.4s infinite" }} />
        <span style={{ font: "600 12px 'IBM Plex Sans',sans-serif", color: "#fff" }}>{seatsRemaining} seats left in August</span>
      </div>
      <button onClick={onOpenModal} className="hover:bg-[#2E74BE] transition-colors duration-150" style={{ font: "600 12.5px 'IBM Plex Sans',sans-serif", background: "#185FA5", color: "#fff", padding: "9px 16px", borderRadius: "9px", border: "none", cursor: "pointer" }}>Secure my seat →</button>
    </div>
  );
}
