import React from "react";
import Link from "next/link";

export default function SiteFooterBar() {
  return (
    <div
      style={{
        background: "#0A2036",
        padding: "clamp(24px,3vw,36px) clamp(20px,4vw,52px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 600,
          fontSize: "18px",
          color: "#fff",
        }}
      >
        Path<span style={{ color: "#5FA8E8" }}>Palz</span>
      </Link>
      <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
        <Link
          href={"/privacy"}
          style={{ fontSize: "12px", color: "#9FB6CE", cursor: "pointer" }}
        >
          Privacy Policy
        </Link>
        <span style={{ fontSize: "12px", color: "#9FB6CE", cursor: "pointer" }}>
          Terms of Service
        </span>
      </div>
      <div
        style={{
          font: "500 11px 'IBM Plex Mono',monospace",
          color: "#5F7C99",
        }}
      >
        © 2025 PathPalz · Precision in Development, Human in Approach.
      </div>
    </div>
  );
}
