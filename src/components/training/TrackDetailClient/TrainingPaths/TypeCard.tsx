import React, { useState } from "react";
import { useGetTypeSubTypes } from "@/query/admin/type-subs";
import { useGetTypeModules } from "@/query/training/instructor";
import { IType } from "@/types/admin/admin";
import { useSetting } from "@/states/setting";
import { getCurrencySymbol } from "@/utils/currency";
import Link from "next/link";

const TypeCard = ({
  type,
  index,
  onApply,
  slug,
  isOpen,
  onJoinWaitlist,
}: {
  type: IType;
  index: number;
  onApply: (type: "training_track" | "type" | "sub_type", id: number) => void;
  slug: string;
  isOpen: boolean;
  onJoinWaitlist: () => void;
}) => {
  const { country } = useSetting();
  const [showModal, setShowModal] = useState(false);
  const { data: subTypesRes, isLoading: loadingSubTypes } = useGetTypeSubTypes({
    type_id: String(type.id),
  });
  const subTypes = subTypesRes?.data || [];

  const showPrice =
    (type.price_ngn || type.price_gbp) &&
    (parseInt(type.price_ngn) > 0 || parseInt(type.price_gbp) > 0);

  const priceVal = country?.currency === "NGN" ? type.price_ngn : type.price_gbp;

  // Custom colors matching mockup: Index 0 (Foundational) is Green, Index 1 (Specialized) is Blue
  const isFoundational = index === 0;
  const priceColor = isFoundational ? "#0F6E56" : "#185FA5";
  const btnBg = isFoundational ? "#0F6E56" : "#185FA5";

  const isSpecialized = type.title.toLowerCase().includes("specialized");
  const { data: modulesRes, isLoading: loadingModules } = useGetTypeModules(type.id);
  const modules = modulesRes || [];

  const items = isSpecialized ? subTypes : modules;
  const isLoading = isSpecialized ? loadingSubTypes : loadingModules;

  return (
    <div
      data-reveal=""
      className="hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(4,44,83,0.12)] hover:border-[#B5D4F4] transition-all duration-[220ms]"
      style={{
        background: "#fff",
        border: "1px solid #E7E4DB",
        borderRadius: "24px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Card Header: Icon & Title */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: isSpecialized ? "#E6F7ED" : "#EBF4FF",
                color: isSpecialized ? "#107B43" : "#185FA5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              {isSpecialized ? "</>" : "{ }"}
            </div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "21px",
                color: "#042C53",
              }}
            >
              {type.title}
            </span>
          </div>
          {showPrice && priceVal && (
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "21px",
                color: isSpecialized ? "#107B43" : "#185FA5",
              }}
            >
              {getCurrencySymbol(country?.currency)}{parseInt(priceVal).toLocaleString()}
            </span>
          )}
        </div>

        {/* Card Description */}
        <div
          style={{
            fontSize: "15.5px",
            color: "#5F5E5A",
            lineHeight: 1.6,
            marginBottom: "24px",
            minHeight: "48px",
          }}
        >
          {type.description || (isSpecialized
            ? "Niche down into specific industry domains after completing the fundamentals."
            : "Start from zero and finish with a real, working application deployed on the internet.")}
        </div>

        {/* Inner Sub-box (Modules / Tracks list) */}
        <div
          style={{
            backgroundColor: "#FBFBFA",
            border: "1px solid #F1EFE8",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "28px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "12.5px",
              color: "#8B8982",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {isSpecialized ? "TRACKS" : "MODULES"}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {isLoading ? (
              [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="animate-pulse"
                  style={{
                    height: "14px",
                    background: "#F1EFE8",
                    width: "70%",
                    borderRadius: "4px",
                  }}
                />
              ))
            ) : items.length === 0 ? (
              <div style={{ fontSize: "14.5px", color: "#8A8981", fontStyle: "italic" }}>
                No items available
              </div>
            ) : (
              items.slice(0, 4).map((item: any, idx: number) => (
                <div
                  key={item.id || idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: isSpecialized ? "#107B43" : "#185FA5",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      color: "#2C2C2A",
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          width: "100%",
        }}
      >
        {isSpecialized ? (
          <Link
            href={`/training/${slug}#sub_types`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 600,
              fontSize: "14.5px",
              color: "#185FA5",
              backgroundColor: "transparent",
              border: "1px solid #B5D4F4",
              borderRadius: "12px",
              padding: "12px 16px",
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            className="hover:bg-[#F3F8FC] hover:border-[#185FA5]"
          >
            View Track Info
          </Link>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 600,
              fontSize: "14.5px",
              color: "#185FA5",
              backgroundColor: "transparent",
              border: "1px solid #B5D4F4",
              borderRadius: "12px",
              padding: "12px 16px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            className="hover:bg-[#F3F8FC] hover:border-[#185FA5]"
          >
            View Modules
          </button>
        )}

        {isOpen ? (
          <button
            onClick={() => onApply("type", type.id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 600,
              fontSize: "14.5px",
              backgroundColor: "#185FA5",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "12px 16px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            className="hover:bg-[#0C447C]"
          >
            Apply
          </button>
        ) : (
          <button
            onClick={onJoinWaitlist}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 600,
              fontSize: "14.5px",
              backgroundColor: "#185FA5",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "12px 16px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            className="hover:bg-[#0C447C]"
          >
            Join Waitlist
          </button>
        )}
      </div>

      {showModal && (
        <TypeModulesModal
          typeId={type.id}
          title={type.title}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const TypeModulesModal = ({
  typeId,
  title,
  onClose,
}: {
  typeId: number;
  title: string;
  onClose: () => void;
}) => {
  const { data: modulesRes, isLoading } = useGetTypeModules(typeId);
  const modules = modulesRes || [];

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
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "480px",
          maxHeight: "80vh",
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
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "17px", color: "#2C2C2A" }}>
            {title} Modules
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
          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }} className="animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ height: "40px", background: "#F1EFE8", borderRadius: "8px" }} />
              ))}
            </div>
          ) : modules.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 0", color: "#8A8981", fontSize: "14.5px" }}>
              No modules found.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {modules.map((m: any) => (
                <div
                  key={m.id}
                  style={{
                    background: "#F8F7F1",
                    border: "1px solid #EAE8DF",
                    borderRadius: "10px",
                    padding: "12px 14px",
                    fontSize: "14.5px",
                    fontWeight: 500,
                    color: "#2C2C2A",
                  }}
                >
                  {m.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
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
            onClick={onClose}
            style={{
              font: "600 14.5px 'IBM Plex Sans', sans-serif",
              background: "#F1EFE8",
              color: "#2C2C2A",
              padding: "9px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypeCard;
