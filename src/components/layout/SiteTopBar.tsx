"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SiteTopBarProps {
  mode: "listing" | "detail";
  track?: { id: number; title: string };
  onReserveSeat: () => void;
}

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Training", href: "/training" },
  { name: "Contact", href: "/contact" },
];

export default function SiteTopBar({
  mode,
  track,
  onReserveSeat,
}: SiteTopBarProps) {
  const pathname = usePathname();

  return (
    <div>
      {/* Announcement bar */}
      <div
        style={{
          background: "#0C447C",
          color: "#fff",
          padding: "10px clamp(14px,2.5vw,22px)",
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
              boxShadow: "0 0 0 3px rgba(79,183,154,.25)",
              animation: "dotBlink 1.4s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <span style={{ whiteSpace: "nowrap" }}>
            {mode === "detail" && track
              ? `August cohort now enrolling — ${track.title}.`
              : "August cohort enrolling now."}{" "}
            <span style={{ color: "#B5D4F4" }}>30 seats · closes 28 July.</span>
          </span>
        </div>
        <button
          onClick={onReserveSeat}
          className="hover:-translate-y-0.5 transition-transform duration-150"
          style={{
            font: "600 11.5px 'IBM Plex Sans', sans-serif",
            background: "#fff",
            color: "#0C447C",
            padding: "5px 14px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Reserve my seat →
        </button>
      </div>

      {/* Navbar */}
      <div
        style={{
          background: "#042C53",
          padding: "14px clamp(14px,2.5vw,26px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
          borderBottom: "1px solid rgba(133,183,235,.14)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "26px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="PathPalz Logo"
              width={180}
              height={40}
              className="h-10 object-contain"
              style={{ height: "auto" }}
            />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:bg-white/8 transition-colors duration-150"
                  style={{
                    fontSize: "13px",
                    color: isActive ? "#fff" : "#B5D4F4",
                    padding: "5px 11px",
                    borderRadius: "8px",
                    background: isActive ? "rgba(133,183,235,.14)" : "none",
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
        <button
          onClick={onReserveSeat}
          className="hover:bg-[#2E74BE] transition-colors duration-150"
          style={{
            font: "600 13px 'IBM Plex Sans', sans-serif",
            padding: "8px 17px",
            borderRadius: "9px",
            border: "none",
            cursor: "pointer",
            background: "#185FA5",
            color: "#fff",
            boxShadow: "0 8px 20px rgba(24,95,165,.35)",
            whiteSpace: "nowrap",
          }}
        >
          {mode === "detail" ? "Get Started" : "August cohort"}
        </button>
      </div>
    </div>
  );
}
