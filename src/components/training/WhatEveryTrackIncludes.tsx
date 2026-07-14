import React from "react";

const ITEMS = [
  {
    icon: "⇄",
    bg: "#E6F1FB",
    color: "#185FA5",
    title: "Peer partner matched to you",
    body: "Matched on time zone, experience and pace. You review each other's code and hold each other accountable.",
  },
  {
    icon: "✓",
    bg: "#E1F5EE",
    color: "#0F6E56",
    title: "Weekly accountability check-in",
    body: "Your accountability manager checks in every week. If you slip behind, they have a plan.",
  },
  {
    icon: "{ }",
    bg: "#FAEEDA",
    color: "#854F0B",
    title: "Real projects every week",
    body: "Actual projects committed to GitHub and deployed live on your PathPalz subdomain.",
  },
  {
    icon: "★",
    bg: "#EEEDFE",
    color: "#534AB7",
    title: "Graduate with proof, not just a certificate",
    body: "A live portfolio, a public GitHub, a certificate — plus consideration for paid PathPalz roles.",
  },
];

export default function WhatEveryTrackIncludes() {
  return (
    <div style={{ marginBottom: "30px" }}>
      <div
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 600,
          fontSize: "20px",
          color: "#042C53",
          marginBottom: "16px",
        }}
      >
        What every track includes
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
          gap: "12px",
        }}
      >
        {ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              border: "1px solid #E7E4DB",
              borderRadius: "12px",
              padding: "16px 18px",
            }}
          >
            <span
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                background: item.bg,
                color: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "17px",
                marginBottom: "10px",
              }}
            >
              {item.icon}
            </span>
            <div
              style={{
                font: "600 15.5px 'IBM Plex Sans',sans-serif",
                color: "#2C2C2A",
                marginBottom: "4px",
              }}
            >
              {item.title}
            </div>
            <div style={{ fontSize: "13.5px", color: "#5F5E5A", lineHeight: 1.55 }}>
              {item.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
