"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useGetDiscounts } from "@/query/admin/discount";
import { useGenerateDiscountCode } from "@/query/training/student/student";
import { ICreateDiscountReponse } from "@/types/discount";
import { getApiErrorMessage, notify } from "@/utils/notify";
import { Copy, Check, CheckCircle2 } from "lucide-react";

interface Props {
  modalOpen: boolean;
  dtype: "student" | "school" | "bespoke";
  setDtype: (type: "student" | "school" | "bespoke") => void;
  onCloseModal: () => void;
}

function extractGeneratedCode(data: unknown): string {
  const result = data as Record<string, unknown>;
  const nested = result?.data as Record<string, unknown> | undefined;
  const code = result?.code || nested?.code || result?.discount_code || "";
  return String(code).toUpperCase();
}

export function DiscountModal({ modalOpen, dtype, setDtype, onCloseModal }: Props) {
  const [email, setEmail] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [studentIdCard, setStudentIdCard] = useState<File | null>(null);
  const [beneficiaryEmails, setBeneficiaryEmails] = useState<string[]>([""]);
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const { data: discountsRaw } = useGetDiscounts();
  const { mutate: generateCode, isPending: isGenerating } = useGenerateDiscountCode();

  const discountRules: ICreateDiscountReponse[] = useMemo(() => {
    return (
      Array.isArray(discountsRaw)
        ? discountsRaw
        : ((discountsRaw as { data?: ICreateDiscountReponse[] })?.data ?? [])
    ).filter((d) => d.is_active);
  }, [discountsRaw]);

  const activeRule = useMemo(() => {
    if (dtype === "student") {
      return discountRules.find((r) => r.discount_type === "individual_student") || null;
    }
    if (dtype === "school") {
      return discountRules.find((r) => r.discount_type === "school_based") || null;
    }
    return discountRules.find((r) => r.discount_type === "general") || null;
  }, [discountRules, dtype]);

  useEffect(() => {
    if (activeRule?.discount_type === "school_based") {
      const min = activeRule.min_students ?? 1;
      setBeneficiaryEmails((prev) => {
        if (prev.length < min) {
          return [...prev, ...Array.from({ length: min - prev.length }, () => "")];
        }
        return prev;
      });
    }
  }, [activeRule]);

  const addBeneficiaryEmail = () => {
    if (activeRule?.max_students && beneficiaryEmails.length >= activeRule.max_students) {
      return;
    }
    setBeneficiaryEmails([...beneficiaryEmails, ""]);
  };

  const removeBeneficiaryEmail = (index: number) => {
    const min = activeRule?.min_students ?? 1;
    if (beneficiaryEmails.length <= min) return;
    setBeneficiaryEmails(beneficiaryEmails.filter((_, i) => i !== index));
  };

  const handleCopy = async () => {
    if (!generatedCode) return;
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isSubmitDisabled = () => {
    if (isGenerating) return true;
    if (!activeRule) return true;
    if (!email.trim()) return true;

    if (dtype === "student") {
      if (!institutionName.trim()) return true;
      if (!studentIdCard) return true;
    }
    if (dtype === "school") {
      if (!schoolName.trim()) return true;
      const validEmails = beneficiaryEmails.filter((e) => e.trim());
      const min = activeRule.min_students ?? 1;
      if (validEmails.length < min) return true;
    }
    return false;
  };

  const handleSubmit = () => {
    if (!activeRule) {
      notify.error("No active discount rule found for this selection.");
      return;
    }

    const payload: any = {
      discount_rule_id: String(activeRule.id),
      institution_name: dtype === "student" ? institutionName : dtype === "school" ? schoolName : "PathPalz",
      institution_address: "Remote",
      email: email,
    };

    if (dtype === "student" && studentIdCard) {
      payload.student_id_card = studentIdCard;
    }

    if (dtype === "school") {
      payload.beneficiary_emails = beneficiaryEmails.filter((e) => e.trim());
    }

    generateCode(payload, {
      onSuccess: (data) => {
        setGeneratedCode(extractGeneratedCode(data));
      },
      onError: (err) => {
        notify.error(getApiErrorMessage(err, "Failed to generate code. Please try again."));
      },
    });
  };

  const handleClose = () => {
    setGeneratedCode("");
    setEmail("");
    setInstitutionName("");
    setSchoolName("");
    setStudentIdCard(null);
    setBeneficiaryEmails([""]);
    setCopied(false);
    onCloseModal();
  };

  if (!modalOpen) return null;

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(2,16,33,.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "overlayIn .2s ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "460px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 40px 90px rgba(0,0,0,.4)",
          animation: "scaleIn .38s cubic-bezier(.34,1.56,.64,1) both .06s",
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
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "15px", color: "#2C2C2A" }}>
            {generatedCode ? "Your Discount Code" : "Apply a discount code"}
          </div>
          <button
            onClick={handleClose}
            className="hover:bg-[#DFDDD3] transition-colors duration-150"
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
        {generatedCode ? (
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", backgroundColor: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle2 style={{ width: "28px", height: "28px", color: "#0F6E56" }} />
            </div>
            <div style={{ fontSize: "14px", color: "#5F5E5A" }}>
              Your discount code is ready! Use this code when enrolling in a training track.
            </div>
            <div style={{ position: "relative", width: "100%", margin: "8px 0" }}>
              <div
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "2px dashed #0F6E56",
                  backgroundColor: "#F0FAF6",
                  color: "#04342C",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "18px",
                  letterSpacing: "0.15em",
                  textAlign: "center",
                }}
              >
                {generatedCode}
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", width: "100%", marginTop: "8px" }}>
              <button
                onClick={handleCopy}
                style={{
                  flex: 1,
                  height: "44px",
                  border: "1px solid #D3D1C7",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  color: "#5F5E5A",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {copied ? <Check style={{ width: "16px", height: "16px", color: "#0F6E56" }} /> : <Copy style={{ width: "16px", height: "16px" }} />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
              <button
                onClick={handleClose}
                style={{
                  flex: 1,
                  height: "44px",
                  backgroundColor: "#185FA5",
                  color: "#fff",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div style={{ padding: "20px", flex: 1, overflowY: "auto" }}>
            {/* Email Address */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ font: "600 12px 'IBM Plex Sans',sans-serif", color: "#5F5E5A", marginBottom: "6px", display: "block" }}>
                Email address <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <input
                type="email"
                required
                placeholder="e.g. alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  font: "400 13px 'IBM Plex Sans',sans-serif",
                  padding: "10px 12px",
                  borderRadius: "9px",
                  border: "1px solid #D3D1C7",
                  background: "#fff",
                  color: "#2C2C2A",
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", color: "#8A8981" }}>
              <div style={{ flex: 1, height: "1px", background: "#EDEBE3" }} />
              <div style={{ font: "500 11px 'IBM Plex Mono',monospace" }}>select discount type</div>
              <div style={{ flex: 1, height: "1px", background: "#EDEBE3" }} />
            </div>

            {/* Discount Type Selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
              {([
                [
                  "student",
                  "Student discount",
                  "Secondary school, college or university students. Generate your own code from your institution details below.",
                ],
                ["school", "School discount", "For teachers or administrators enrolling a group — up to 20 places under one code."],
                ["bespoke", "Bespoke occasion discount", "Seasonal campaigns — Black Friday, December, Autumn. Enter the occasion code from our announcements."],
              ] as const).map(([key, title, desc]) => (
                <div
                  key={key}
                  onClick={() => setDtype(key)}
                  style={{
                    border: `1px solid ${dtype === key ? "#185FA5" : "#E4E2DA"}`,
                    background: dtype === key ? "#E6F1FB" : "#fff",
                    borderRadius: "10px",
                    padding: "11px 13px",
                    cursor: "pointer",
                    transition: "border-color .15s, background .15s",
                  }}
                >
                  <div style={{ font: "600 13.5px 'IBM Plex Sans',sans-serif", color: "#2C2C2A" }}>{title}</div>
                  <div style={{ fontSize: "11.5px", color: "#8A8981", lineHeight: 1.45, marginTop: "3px" }}>{desc}</div>
                </div>
              ))}
            </div>

            {/* Dynamic Inputs based on Discount Type */}
            {dtype === "student" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ font: "600 12px 'IBM Plex Sans',sans-serif", color: "#5F5E5A", marginBottom: "6px", display: "block" }}>
                    Institution name <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. University of Lagos, King's College London"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    style={{
                      width: "100%",
                      font: "400 13px 'IBM Plex Sans',sans-serif",
                      padding: "10px 12px",
                      borderRadius: "9px",
                      border: "1px solid #D3D1C7",
                      background: "#fff",
                    }}
                  />
                </div>
                <div>
                  <label style={{ font: "600 12px 'IBM Plex Sans',sans-serif", color: "#5F5E5A", marginBottom: "6px", display: "block" }}>
                    Student ID Card (Image or PDF) <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    type="file"
                    required
                    accept="image/*,application/pdf"
                    onChange={(e) => setStudentIdCard(e.target.files?.[0] || null)}
                    style={{
                      width: "100%",
                      fontSize: "12px",
                      padding: "4px 0",
                    }}
                  />
                </div>
                <div style={{ background: "#F4F9FE", borderRadius: "9px", padding: "11px 13px", fontSize: "12px", color: "#185FA5", lineHeight: 1.5 }}>
                  Your discount code is generated instantly from your institution name. We verify ID card uploads randomly at enrollment.
                </div>
              </div>
            )}

            {dtype === "school" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ font: "600 12px 'IBM Plex Sans',sans-serif", color: "#5F5E5A", marginBottom: "6px", display: "block" }}>
                    School or organisation name <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Greenfield Secondary, TechCorp Ltd"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    style={{
                      width: "100%",
                      font: "400 13px 'IBM Plex Sans',sans-serif",
                      padding: "10px 12px",
                      borderRadius: "9px",
                      border: "1px solid #D3D1C7",
                      background: "#fff",
                    }}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ font: "600 12px 'IBM Plex Sans',sans-serif", color: "#5F5E5A" }}>
                      Beneficiary Emails <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <button
                      type="button"
                      onClick={addBeneficiaryEmail}
                      style={{
                        font: "600 11px 'IBM Plex Sans',sans-serif",
                        color: "#185FA5",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      + Add email
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {beneficiaryEmails.map((email, idx) => (
                      <div key={idx} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <input
                          type="email"
                          required
                          placeholder={`Student ${idx + 1} email`}
                          value={email}
                          onChange={(e) => {
                            const newEmails = [...beneficiaryEmails];
                            newEmails[idx] = e.target.value;
                            setBeneficiaryEmails(newEmails);
                          }}
                          style={{
                            flex: 1,
                            font: "400 13px 'IBM Plex Sans',sans-serif",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "1px solid #D3D1C7",
                            background: "#fff",
                          }}
                        />
                        {beneficiaryEmails.length > (activeRule?.min_students ?? 1) && (
                          <button
                            type="button"
                            onClick={() => removeBeneficiaryEmail(idx)}
                            style={{
                              font: "600 14px 'IBM Plex Sans',sans-serif",
                              color: "#EF4444",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#EAF3DE", borderRadius: "9px", padding: "11px 13px", fontSize: "12px", color: "#3B6D11", lineHeight: 1.5 }}>
                  Group codes cover up to 20 places. Each enrolling person enters the same code; the system tracks remaining slots automatically.
                </div>
              </div>
            )}

            {dtype === "bespoke" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ font: "600 12px 'IBM Plex Sans',sans-serif", color: "#5F5E5A", marginBottom: "6px", display: "block" }}>
                    Occasion code <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BLACKFRIDAY25, AUTUMN25, DEC25"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    style={{
                      width: "100%",
                      font: "400 13px 'IBM Plex Mono',monospace",
                      padding: "10px 12px",
                      borderRadius: "9px",
                      border: "1px solid #D3D1C7",
                      background: "#fff",
                    }}
                  />
                </div>
                <div style={{ background: "#FAEEDA", borderRadius: "9px", padding: "11px 13px", fontSize: "12px", color: "#633806", lineHeight: 1.5 }}>
                  <strong style={{ display: "block", marginBottom: "2px", color: "#412402" }}>Where to find your code</strong>
                  Bespoke codes are published in PathPalz announcements, newsletters and social posts for each campaign.
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        {!generatedCode && (
          <div
            style={{
              padding: "14px 20px",
              borderTop: "1px solid #EDEBE3",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
              position: "sticky",
              bottom: 0,
              background: "#fff",
              borderRadius: "0 0 16px 16px",
              zIndex: 10,
            }}
          >
            <button
              onClick={handleClose}
              style={{ font: "500 12px 'IBM Plex Sans',sans-serif", color: "#8A8981", background: "none", border: "none", cursor: "pointer", padding: "9px" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitDisabled()}
              className="hover:bg-[#0C447C] transition-colors duration-150"
              style={{
                flex: "1 1 auto",
                font: "600 13px 'IBM Plex Sans',sans-serif",
                background: isSubmitDisabled() ? "#A1A09A" : "#185FA5",
                color: "#fff",
                padding: "11px 14px",
                borderRadius: "9px",
                border: "none",
                cursor: isSubmitDisabled() ? "not-allowed" : "pointer",
              }}
            >
              {isGenerating ? "Generating..." : "Generate my code & continue →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
