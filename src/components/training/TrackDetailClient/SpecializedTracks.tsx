"use client";

import React from "react";
import { useGetAllTrackTypes } from "@/query/admin/types";
import { useGetTypeSubTypes } from "@/query/admin/type-subs";
import { ISubType, IType } from "@/types/admin/admin";
import SyllabusModal from "./SyllabusModal";
import { useSetting } from "@/states/setting";
import { getCurrencySymbol } from "@/utils/currency";

interface SpecializedTracksProps {
  trackId: string;
  onApply: (type: "training_track" | "type" | "sub_type", id: number) => void;
  isOpen: boolean;
  onJoinWaitlist: () => void;
}

const SubTypeCard = ({
  subType,
  onApply,
  onViewSyllabus,
  isOpen,
  onJoinWaitlist,
}: {
  subType: ISubType;
  onApply: (type: "training_track" | "type" | "sub_type", id: number) => void;
  onViewSyllabus: (subType: ISubType) => void;
  isOpen: boolean;
  onJoinWaitlist: () => void;
}) => {
  const { country } = useSetting();

  const getTags = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("front")) return ["React", "TypeScript", "Tailwind"];
    if (t.includes("back")) return ["Python", "PostgreSQL", "Node.js"];
    if (t.includes("mobile")) return ["React Native", "Firebase", "Expo"];
    return ["React", "Node.js", "PostgreSQL"];
  };

  const price = country?.currency === "NGN" ? subType.price_ngn : subType.price_gbp;

  return (
    <div
      data-reveal=""
      className="hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(4,44,83,0.12)] hover:border-[#B5D4F4] transition-all duration-[220ms]"
      style={{
        background: "#fff",
        border: "1px solid #E7E4DB",
        borderRadius: "20px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "8px", marginBottom: "8px" }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "17px", color: "#042C53" }}>
          {subType.title}
        </span>
        {price && parseInt(price) > 0 && (
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "21px", color: "#185FA5" }}>
            {getCurrencySymbol(country?.currency)}{parseInt(price).toLocaleString()}
          </span>
        )}
      </div>
      <div style={{ fontSize: "13.5px", color: "#5F5E5A", lineHeight: 1.55, marginBottom: "14px", flex: 1 }}>
        {subType.description || "Master industry-standard workflows and build production-ready systems."}
      </div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
        {getTags(subType.title).map((tag) => (
          <span
            key={tag}
            style={{
              font: "500 11.5px 'IBM Plex Mono',monospace",
              background: "#F1EFE8",
              color: "#5F5E5A",
              padding: "3px 9px",
              borderRadius: "6px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
        {isOpen ? (
          <button
            onClick={() => onApply("sub_type", subType.id)}
            className="hover:bg-[#0C447C] transition-colors duration-150"
            style={{
              font: "600 14px 'IBM Plex Sans',sans-serif",
              background: "#185FA5",
              color: "#fff",
              padding: "9px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
        ) : (
          <button
            onClick={onJoinWaitlist}
            style={{
              font: "600 14px 'IBM Plex Sans',sans-serif",
              color: "#185FA5",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontStyle: "italic",
            }}
          >
            Join Waitlist
          </button>
        )}
        <span
          onClick={() => onViewSyllabus(subType)}
          style={{
            font: "600 13.5px 'IBM Plex Sans',sans-serif",
            color: "#185FA5",
            cursor: "pointer",
          }}
        >
          View Syllabus →
        </span>
      </div>
    </div>
  );
};

const SpecializedTracksSkeleton = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "14px" }}>
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="animate-pulse"
        style={{
          background: "#fff",
          border: "1px solid #E7E4DB",
          borderRadius: "14px",
          padding: "20px",
          height: "220px",
        }}
      />
    ))}
  </div>
);

export default function SpecializedTracks({
  trackId,
  onApply,
  isOpen,
  onJoinWaitlist,
}: SpecializedTracksProps) {
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = React.useState(false);
  const [selectedSubType, setSelectedSubType] = React.useState<ISubType | null>(
    null,
  );

  const { data: typesRes, isLoading: loadingTypes } = useGetAllTrackTypes({
    track_id: trackId,
  });
  const types = typesRes?.data || [];

  const specializedType = types.find((t: IType) =>
    t.title.toLowerCase().includes("specialized track"),
  );

  const { data: subTypesRes, isLoading: loadingSubTypes } = useGetTypeSubTypes({
    type_id: String(specializedType?.id || ""),
  });
  const subTypes = subTypesRes?.data || [];

  if (loadingTypes || (specializedType && loadingSubTypes)) {
    return <SpecializedTracksSkeleton />;
  }

  if (!specializedType || subTypes.length === 0) return null;

  return (
    <div
      style={{
        background: "#fff",
        backgroundImage: "radial-gradient(rgba(24,95,165,.04) 1px,transparent 1px),radial-gradient(circle at 0% 100%,rgba(24,95,165,.06),transparent 42%)",
        backgroundSize: "24px 24px,100% 100%",
        padding: "clamp(48px,6vw,72px) clamp(20px,4vw,52px)",
        borderBottom: "1px solid #E7E4DB",
      }}
    >
      <div data-reveal="" style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 48px" }}>
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
          // SPECIALIZED DEEP DIVE
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
          Specialized Tracks Deep Dive
        </h2>
        <div style={{ fontSize: "17px", color: "#5F5E5A", lineHeight: 1.6 }}>
          Choose your discipline. Each track is designed for specialized industry readiness.
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "14px", maxWidth: "960px", margin: "0 auto" }}>
        {subTypes.map((subType) => (
          <SubTypeCard
            key={subType.id}
            subType={subType}
            onApply={onApply}
            onViewSyllabus={(sub) => {
              setSelectedSubType(sub);
              setIsSyllabusModalOpen(true);
            }}
            isOpen={isOpen}
            onJoinWaitlist={onJoinWaitlist}
          />
        ))}
      </div>

      <SyllabusModal
        isOpen={isSyllabusModalOpen}
        onClose={() => setIsSyllabusModalOpen(false)}
        subType={selectedSubType}
        onApply={onApply}
      />
    </div>
  );
}
