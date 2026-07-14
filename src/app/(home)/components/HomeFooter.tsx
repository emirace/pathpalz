"use client";

import Link from "next/link";
import { SECTION_MAX_WIDTH } from "@/utils/layout";

const COLUMNS = [
  {
    heading: "Training",
    links: [
      { label: "Software Development", href: "/training" },
      { label: "DevOps Engineering", href: "/training" },
      { label: "Data Science & AI", href: "/training" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Tech Solutions", href: "/solutions" },
      { label: "Partner Programme", href: "/contact" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/privacy" },
      { label: "Cookie Policy", href: "/privacy" },
      { label: "Discount Policy", href: "/privacy" },
    ],
  },
];

export function HomeFooter() {
  return (
    <div
      style={{
        background: "#0A2036",
        padding: "clamp(28px,3.5vw,44px) clamp(20px,4vw,52px)",
      }}
    >
      <div style={{ maxWidth: SECTION_MAX_WIDTH, marginInline: "auto" }}>
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 600,
              fontSize: "20px",
              color: "#fff",
              marginBottom: "8px",
            }}
          >
            Path<span style={{ color: "#5FA8E8" }}>Palz</span>
          </div>
          <div style={{ fontSize: "14px", color: "#7E9BB8", lineHeight: 1.6 }}>
            Precision in Development, Human in Approach. Training the next
            generation of tech professionals across the UK and Nigeria.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
            gap: "24px",
            marginBottom: "24px",
            borderTop: "1px solid rgba(133,183,235,.14)",
            paddingTop: "22px",
          }}
        >
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <div
                style={{
                  font: "600 11.5px 'IBM Plex Mono',monospace",
                  color: "#5FA8E8",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                {col.heading}
              </div>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors duration-150"
                  style={{
                    fontSize: "14px",
                    color: "#9FB6CE",
                    display: "block",
                    marginBottom: "8px",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(133,183,235,.14)",
            paddingTop: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              font: "500 12.5px 'IBM Plex Mono',monospace",
              color: "#5F7C99",
            }}
          >
            © 2025 PathPalz Limited · Precision in Development, Human in
            Approach.
          </div>
          <div />
          {/* <div style={{ display: "flex", gap: "16px" }}>
          {["LinkedIn", "GitHub", "Instagram"].map((s) => (
            <span
              key={s}
              className="hover:text-white transition-colors duration-150"
              style={{ fontSize: "12px", color: "#9FB6CE", cursor: "pointer" }}
            >
              {s}
            </span>
          ))}
        </div> */}
        </div>
      </div>
    </div>
  );
}
