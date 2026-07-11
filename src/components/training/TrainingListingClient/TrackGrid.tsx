"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { useGetTracks } from "@/query/training/tracks";
import { useTraining } from "@/context/TrainingContext";
import { COHORT_NAME } from "./constants";

interface ITrackVisuals {
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  level: string;
}

const STATIC_TRACK_VISUALS: Record<string, ITrackVisuals> = {
  "software-development": {
    icon: <span style={{ fontSize: "16px" }}>{"{ }"}</span>,
    iconBg: "#E6F1FB",
    iconColor: "#185FA5",
    level: "beginner welcome",
  },
  "data-ai": {
    icon: <span style={{ fontSize: "16px" }}>∑</span>,
    iconBg: "#F1EFE8",
    iconColor: "#5F5E5A",
    level: "beginner welcome",
  },
  devops: {
    icon: <span style={{ fontSize: "16px" }}>⚙</span>,
    iconBg: "#EAF3DE",
    iconColor: "#3B6D11",
    level: "beginner welcome",
  },
};

const DEFAULT_VISUALS: ITrackVisuals = {
  icon: <span style={{ fontSize: "16px" }}>◆</span>,
  iconBg: "#EEEDFE",
  iconColor: "#534AB7",
  level: "beginner welcome",
};

export default function TrackGrid() {
  const { data: tracks, isLoading } = useGetTracks();
  const { openModal } = useTraining();

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "3px solid #E7E4DB",
            borderTopColor: "#185FA5",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
        gap: "14px",
      }}
    >
      {tracks?.map((track) => {
        const visuals = STATIC_TRACK_VISUALS[track.slug] || DEFAULT_VISUALS;
        const isOpen = track.status === "open";

        return (
          <div
            key={track.id}
            style={{
              background: isOpen ? "#fff" : "#FBFAF6",
              border: "1px solid #E7E4DB",
              borderRadius: "14px",
              overflow: "hidden",
              opacity: isOpen ? 1 : 0.75,
              transition: "transform .2s, box-shadow .2s, border-color .18s",
            }}
            className={isOpen ? "hover:-translate-y-1 hover:shadow-lg" : ""}
          >
            <div style={{ padding: "18px 18px 14px" }}>
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "9px",
                  background: isOpen ? visuals.iconBg : "#F1EFE8",
                  color: isOpen ? visuals.iconColor : "#5F5E5A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "12px",
                }}
              >
                {visuals.icon}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: isOpen ? "#0F6E56" : "#888780",
                    animation: isOpen ? "dotBlink 1.4s ease-in-out infinite" : "none",
                  }}
                />
                <span
                  style={{
                    font: "500 10px 'IBM Plex Mono',monospace",
                    color: isOpen ? "#0F6E56" : "#5F5E5A",
                    textTransform: "uppercase",
                    letterSpacing: ".05em",
                  }}
                >
                  {isOpen ? `Open — ${COHORT_NAME}` : "Coming soon"}
                </span>
              </div>
              <Link
                href={`/training/${track.slug}`}
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#042C53",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                {track.title}
              </Link>
              <div style={{ fontSize: "12.5px", color: "#5F5E5A", lineHeight: 1.55 }}>
                {track.description}
              </div>
            </div>
            <div
              style={{
                padding: "11px 18px",
                borderTop: "1px solid #E7E4DB",
                background: "#FBFAF6",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "11px", color: "#8A8981" }}>
                {track.duration_weeks} weeks · {visuals.level}
              </span>
              {isOpen ? (
                <Link
                  href={`/training/${track.slug}`}
                  style={{
                    font: "600 12px 'IBM Plex Sans',sans-serif",
                    color: visuals.iconColor,
                    whiteSpace: "nowrap",
                  }}
                >
                  View track →
                </Link>
              ) : (
                <button
                  onClick={() => openModal("waitlist", track.id)}
                  style={{
                    font: "600 12px 'IBM Plex Sans',sans-serif",
                    color: "#5F5E5A",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    padding: 0,
                  }}
                >
                  Join waitlist →
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
