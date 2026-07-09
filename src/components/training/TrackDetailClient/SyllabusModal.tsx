"use client";

import React from "react";
import { useGetSubTypeModuleHeaders } from "@/query/admin/course-module-headers";
import { useGetHeaderModules } from "@/query/admin/course-modules";
import { ISubType } from "@/types/admin/admin";

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  subType: ISubType | null;
  onApply: (type: "training_track" | "type" | "sub_type", id: number) => void;
}

const ModuleList = ({ headerId }: { headerId: string }) => {
  const { data: modulesRes, isLoading } = useGetHeaderModules({
    header_id: headerId,
  });
  const modules = modulesRes?.data || [];

  if (isLoading) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px 16px", paddingLeft: "38px" }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse" style={{ height: "14px", background: "#F1EFE8", borderRadius: "4px" }} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px 16px", paddingLeft: "38px" }}>
      {modules.map((mod: any) => (
        <div key={mod.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4FB79A", flexShrink: 0 }}></span>
          <span style={{ fontSize: "12.5px", color: "#5F5E5A", lineHeight: 1.4 }}>{mod.title}</span>
        </div>
      ))}
      {modules.length === 0 && (
        <span style={{ fontStyle: "italic", fontSize: "11px", color: "#8A8981" }}>No modules listed</span>
      )}
    </div>
  );
};

const SyllabusModal = ({
  isOpen,
  onClose,
  subType,
  onApply,
}: SyllabusModalProps) => {
  const { data: headersRes, isLoading } = useGetSubTypeModuleHeaders({
    sub_type_id: String(subType?.id || ""),
  });
  const headers = headersRes?.data || [];

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(2, 16, 33, 0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "overlayIn 0.2s ease both",
      }}
      onClick={handleOverlayClick}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "580px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 40px 90px rgba(0,0,0,0.4)",
          animation: "scaleIn 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) both 0.06s",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #EDEBE3",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            background: "#fff",
            borderRadius: "16px 16px 0 0",
            zIndex: 10,
          }}
        >
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", color: "#2C2C2A" }}>
            {subType?.title || "Track"} Syllabus Modules
          </div>
          <button
            onClick={onClose}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "#F1EFE8",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              color: "#8A8981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "20px", flex: 1, overflowY: "auto" }}>
          <p style={{ fontSize: "13px", color: "#5F5E5A", lineHeight: 1.6, marginBottom: "20px" }}>
            {subType?.description ||
              "Entry by completion of Foundational tracks, or by instructor recommendation after Foundation. This is not a beginner track."}
          </p>

          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }} className="animate-pulse">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    background: "#F8F7F1",
                    border: "1px solid #EAE8DF",
                    borderRadius: "14px",
                    padding: "18px",
                    height: "100px",
                  }}
                />
              ))}
            </div>
          ) : headers.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {headers.map((header, index) => (
                <div
                  key={header.id}
                  style={{
                    background: "#F8F7F1",
                    border: "1px solid #EAE8DF",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "rgba(24,95,165,.1)",
                        color: "#185FA5",
                        font: "600 12.5px 'Space Grotesk',sans-serif",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "14.5px", color: "#042C53" }}>
                      {header.title}
                    </div>
                  </div>

                  <ModuleList headerId={String(header.id)} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#8A8981" }}>
              <div style={{ fontSize: "13px" }}>Curriculum details are being finalized.</div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid #EDEBE3",
            display: "flex",
            justifyContent: "flex-end",
            position: "sticky",
            bottom: 0,
            background: "#fff",
            borderRadius: "0 0 16px 16px",
          }}
        >
          <button
            onClick={() => {
              if (subType) onApply("sub_type", subType.id);
              onClose();
            }}
            style={{
              width: "100%",
              font: "600 13px 'IBM Plex Sans', sans-serif",
              background: "#185FA5",
              color: "#fff",
              padding: "11px 14px",
              borderRadius: "9px",
              border: "none",
              cursor: "pointer",
              transition: "background .15s",
            }}
          >
            Apply for {subType?.title || "this Track"} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SyllabusModal;
