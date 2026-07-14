"use client";

import { useGetAllTrackTypes } from "@/query/admin/types";
import TypeCard from "./TypeCard";

interface TrainingPathsProps {
  trackId: string;
  trackTitle: string;
  slug: string;
  onApply: (type: "training_track" | "type" | "sub_type", id: number) => void;
  isOpen: boolean;
  onJoinWaitlist: () => void;
}
const TypeCardSkeleton = () => (
  <div
    className="animate-pulse"
    style={{
      background: "#fff",
      border: "1px solid #E7E4DB",
      borderRadius: "14px",
      padding: "24px",
      height: "280px",
    }}
  />
);

export default function TrainingPaths({
  trackId,
  trackTitle,
  onApply,
  slug,
  isOpen,
  onJoinWaitlist,
}: TrainingPathsProps) {
  const { data: typesRes, isLoading: loadingTypes } = useGetAllTrackTypes({
    track_id: trackId,
  });
  const types = typesRes?.data || [];

  if (!types || types.length === 0) return null;

  return (
    <div
      id="types"
      style={{
        background: "#F7F6F1",
        backgroundImage: "radial-gradient(rgba(44, 44, 42, 0.06) 1.2px, transparent 1.2px)",
        backgroundSize: "24px 24px",
        padding: "clamp(48px,6vw,72px) clamp(20px,4vw,52px)",
        borderBottom: "1px solid #E7E4DB",
      }}
    >
      <div
        data-reveal=""
        style={{
          textAlign: "center",
          maxWidth: "680px",
          margin: "0 auto 48px",
        }}
      >
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontWeight: 500,
            fontSize: "12.5px",
            color: "#8B8982",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          // TRAINING PATHS
        </div>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(27px, 3.6vw, 40px)",
            color: "#2C2C2A",
            letterSpacing: "-.02em",
            marginBottom: "16px",
            marginTop: 0,
          }}
        >
          {trackTitle} training paths
        </h2>
        <div style={{ fontSize: "17px", color: "#5F5E5A", lineHeight: 1.6 }}>
          Our curriculum is split into two rigorous phases designed to
          take you from core logic to professional deployment.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        {loadingTypes
          ? [1, 2].map((i) => <TypeCardSkeleton key={i} />)
          : types.map((type, index) => (
            <TypeCard
              key={type.id}
              type={type}
              index={index}
              onApply={onApply}
              slug={slug}
              isOpen={isOpen}
              onJoinWaitlist={onJoinWaitlist}
            />
          ))}
      </div>
    </div>
  );
}
