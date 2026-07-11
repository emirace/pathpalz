"use client";

import { SECTION_MAX_WIDTH } from "@/utils/layout";

interface Props {
  onOpenModal: () => void;
}

export function BottomCTA({ onOpenModal }: Props) {
  return (
    <div style={{ background: "#F5F3EC", padding: "clamp(26px,3.5vw,44px) clamp(20px,4vw,52px)", borderBottom: "1px solid #E7E4DB" }}>
      <div data-reveal="" style={{ background: "#fff", border: "1px solid #E7E4DB", borderRadius: "14px", padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "18px", flexWrap: "wrap", maxWidth: SECTION_MAX_WIDTH, marginInline: "auto" }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "18px", color: "#2C2C2A", marginBottom: "4px" }}>Ready to see tracks, pricing and the full curriculum?</div>
          <div style={{ fontSize: "14.5px", color: "#5F5E5A", lineHeight: 1.55, maxWidth: "560px" }}>Every track broken down — modules, courses, professional and student pricing, and the August enrolment form.</div>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={onOpenModal} className="hover:bg-[#0B5A46] transition-colors duration-150" style={{ font: "600 14.5px 'IBM Plex Sans',sans-serif", background: "#0F6E56", color: "#fff", padding: "11px 20px", borderRadius: "9px", border: "none", cursor: "pointer" }}>Go to training page</button>
          <button className="hover:bg-[#F1EFE8] transition-colors duration-150" style={{ font: "600 14.5px 'IBM Plex Sans',sans-serif", background: "none", color: "#2C2C2A", padding: "11px 20px", borderRadius: "9px", border: "1px solid #D3D1C7", cursor: "pointer" }}>Download curriculum PDF</button>
        </div>
      </div>
    </div>
  );
}
