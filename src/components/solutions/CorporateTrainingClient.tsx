"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useTraining } from "@/context/TrainingContext";
import SiteTopBar from "@/components/layout/SiteTopBar";
import SiteFooterBar from "@/components/layout/SiteFooterBar";
import { SECTION_MAX_WIDTH } from "@/utils/layout";

type RevealEl = HTMLElement & { _shown?: boolean };

const PERSONAS = [
  {
    icon: "⬢",
    bg: "#FAEEDA",
    fg: "#854F0B",
    title: "HR and L&D teams",
    desc: "You have a skills gap in your engineering team and need a structured, accountable training programme with assessment and reporting. We handle delivery — you own the outcome.",
    who: "HR directors · L&D managers",
  },
  {
    icon: "⌘",
    bg: "#E6F1FB",
    fg: "#0C447C",
    title: "Engineering leadership",
    desc: "Your team needs to adopt a new stack, migrate to cloud, or add DevOps capability. PathPalz delivers custom training aligned to your actual technical environment.",
    who: "CTOs · Engineering managers",
  },
  {
    icon: "✎",
    bg: "#E1F5EE",
    fg: "#085041",
    title: "Schools and universities",
    desc: "Supplement your CS or IT curriculum with live PathPalz instruction. Group school discounts available. Students graduate with a PathPalz certificate alongside their academic qualification.",
    who: "Teachers · Heads of department",
  },
];

const PACKAGES = [
  {
    badge: "Team upskill",
    name: "Squad training",
    meta: "Up to 10 staff · 4–12 weeks · remote or on-site",
    price: "Custom",
    sub: "Priced per head based on curriculum scope and duration. Minimum 4 staff.",
    feats: [
      "Aligned to your tech stack",
      "Live instruction by PathPalz instructors",
      "Progress reporting to line manager",
      "PathPalz completion certificate per staff member",
    ],
    highlighted: false,
    cta: "Request a quote",
  },
  {
    badge: "Most popular",
    name: "Department programme",
    meta: "10–30 staff · 8–16 weeks · structured cohort",
    price: "Custom",
    sub: "Full PathPalz cohort model deployed inside your organisation. Includes accountability infrastructure.",
    feats: [
      "Custom curriculum design",
      "Internal peer partner pairing",
      "Dedicated PathPalz accountability manager",
      "Weekly progress dashboard for HR",
      "Certificates and assessment reports",
    ],
    highlighted: true,
    cta: "Request a proposal",
  },
  {
    badge: "Enterprise",
    name: "Talent pipeline",
    meta: "30+ staff or ongoing · partnership model",
    price: "Partnership",
    sub: "An ongoing relationship where PathPalz becomes your organisation's technical training partner across multiple cohorts and departments.",
    feats: [
      "All department programme features",
      "Dedicated account manager",
      "Volume pricing across cohorts",
      "Co-branded training materials",
      "SLA-backed delivery",
    ],
    highlighted: false,
    cta: "Talk to the team",
  },
];

const COMPARISON = [
  {
    label: "Who enrols",
    b2c: "Individuals — students, career-changers, professionals",
    b2b: "Organisations — HR, L&D, engineering teams",
  },
  {
    label: "Curriculum",
    b2c: "PathPalz standard tracks",
    b2b: "Custom-built to your stack and goals",
  },
  {
    label: "Cohort size",
    b2c: "Max 30 students per public cohort",
    b2b: "4–30+ per private organisational cohort",
  },
  {
    label: "Pricing",
    b2c: "Published per-student rates",
    b2b: "Custom proposal — per-head or fixed",
  },
  {
    label: "Invoicing",
    b2c: "Individual payment or instalment plan",
    b2b: "Corporate invoice with PO number",
  },
  {
    label: "Reporting",
    b2c: "Student-facing progress tracker",
    b2b: "Weekly dashboard for HR and line managers",
  },
];

export default function CorporateTrainingClient() {
  const { openModal } = useTraining();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealEls = Array.from(
      root.querySelectorAll("[data-reveal]"),
    ) as RevealEl[];

    if (!reduce) {
      revealEls.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.style.willChange = "opacity, transform";
      });
    } else {
      revealEls.forEach((el) => {
        el._shown = true;
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }

    const showEl = (el: RevealEl) => {
      if (el._shown) return;
      el._shown = true;
      const delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
      el.style.transition = `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`;
      el.style.opacity = "1";
      el.style.transform = "none";
    };

    const checkReveal = () => {
      const h = window.innerHeight || 800;
      revealEls.forEach((el) => {
        if (!el._shown && el.getBoundingClientRect().top < h * 0.9) {
          showEl(el);
        }
      });
    };

    checkReveal();
    const t1 = setTimeout(checkReveal, 120);
    const t2 = setTimeout(checkReveal, 500);

    const onScroll = () => checkReveal();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, true);

    const safety = setTimeout(() => {
      revealEls.forEach((el) => showEl(el));
    }, 3000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("scroll", onScroll, true);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(safety);
    };
  }, []);

  return (
    <div ref={rootRef} style={{ width: "100%", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <SiteTopBar mode="listing" onReserveSeat={() => openModal("apply")} />

      {/* Hero */}
      <div
        style={{
          background: "#042C53",
          position: "relative",
          overflow: "hidden",
          backgroundImage:
            "radial-gradient(circle at 86% 14%, rgba(133,90,10,.3), transparent 44%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(133,183,235,.35) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.12,
            animation: "gridPulse 5s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            padding: "clamp(32px,5vw,56px) clamp(20px,4vw,52px) clamp(36px,5vw,60px)",
            maxWidth: "720px",
          }}
        >
          <Link
            href="/solutions"
            data-reveal=""
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              font: "600 12px 'IBM Plex Sans',sans-serif",
              color: "#F5C97F",
              marginBottom: "16px",
            }}
          >
            ← Back to all solutions
          </Link>
          <div
            data-reveal=""
            data-reveal-delay="0.06"
            style={{
              font: "600 10px 'IBM Plex Mono',monospace",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "#F5C97F",
              marginBottom: "12px",
            }}
          >
            Corporate training — B2B
          </div>
          <h1
            data-reveal=""
            data-reveal-delay="0.12"
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 600,
              fontSize: "clamp(26px,3.6vw,38px)",
              lineHeight: 1.16,
              letterSpacing: "-.02em",
              color: "#fff",
              marginBottom: "14px",
            }}
          >
            PathPalz training. Inside your organisation.
          </h1>
          <p
            data-reveal=""
            data-reveal-delay="0.18"
            style={{
              fontSize: "clamp(13px,1.4vw,15px)",
              color: "#B5D4F4",
              lineHeight: 1.7,
              marginBottom: "24px",
            }}
          >
            We bring structured, live tech training into your business —
            for teams that need to upskill, departments switching to new
            technologies, or organisations building an internal talent
            pipeline. Your curriculum, your stack, your schedule. PathPalz
            delivers the instruction, the accountability infrastructure,
            and the assessment.
          </p>
          <div data-reveal="" data-reveal-delay="0.24" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="hover:-translate-y-0.5 transition-transform duration-150"
              style={{
                font: "600 13px 'IBM Plex Sans',sans-serif",
                background: "#fff",
                color: "#0C447C",
                padding: "11px 20px",
                borderRadius: "10px",
                whiteSpace: "nowrap",
                display: "inline-block",
              }}
            >
              Request a proposal
            </Link>
          </div>
        </div>
      </div>

      {/* Who this is for */}
      <div
        style={{
          padding: "clamp(32px,4vw,52px) clamp(20px,4vw,52px)",
          background: "#F5F3EC",
          backgroundImage: "radial-gradient(rgba(24,95,165,.05) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div data-reveal="" style={{ maxWidth: "560px", margin: "0 auto 24px" }}>
          <div style={{ font: "500 11px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#8A8981", textTransform: "uppercase", marginBottom: "10px" }}>
            Who this is for
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(19px,2.6vw,26px)", color: "#2C2C2A", letterSpacing: "-.01em" }}>
            Built for three kinds of organisation
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "16px", maxWidth: SECTION_MAX_WIDTH, marginInline: "auto" }}>
          {PERSONAS.map((p, i) => (
            <div
              key={p.title}
              data-reveal=""
              data-reveal-delay={(i * 0.08).toFixed(2)}
              className="hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: "#fff",
                border: "1px solid #E7E4DB",
                borderRadius: "16px",
                padding: "22px",
                transition: "transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s",
              }}
            >
              <span
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: p.bg,
                  color: p.fg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "600 15px 'IBM Plex Mono',monospace",
                  marginBottom: "14px",
                }}
              >
                {p.icon}
              </span>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "16px", color: "#042C53", marginBottom: "8px" }}>
                {p.title}
              </div>
              <div style={{ fontSize: "12.5px", color: "#5F5E5A", lineHeight: 1.65, marginBottom: "10px" }}>
                {p.desc}
              </div>
              <div style={{ fontSize: "11px", color: "#8A8981" }}>{p.who}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate packages */}
      <div style={{ background: "#fff", padding: "clamp(32px,4vw,52px) clamp(20px,4vw,52px)", borderTop: "1px solid #E7E4DB" }}>
        <div data-reveal="" style={{ maxWidth: "560px", margin: "0 auto 24px" }}>
          <div style={{ font: "500 11px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#8A8981", textTransform: "uppercase", marginBottom: "10px" }}>
            Corporate packages
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(19px,2.6vw,26px)", color: "#2C2C2A", letterSpacing: "-.01em" }}>
            Three ways to engage
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "16px", maxWidth: SECTION_MAX_WIDTH, marginInline: "auto" }}>
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.name}
              data-reveal=""
              data-reveal-delay={(i * 0.08).toFixed(2)}
              style={{
                background: "#FBFAF6",
                border: pkg.highlighted ? "1.5px solid #854F0B" : "1px solid #E7E4DB",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ padding: "20px 20px 12px" }}>
                <span
                  style={{
                    font: "600 10px 'IBM Plex Mono',monospace",
                    background: "#FAEEDA",
                    color: "#854F0B",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    display: "inline-block",
                    marginBottom: "10px",
                  }}
                >
                  {pkg.badge}
                </span>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "16px", color: "#042C53", marginBottom: "4px" }}>
                  {pkg.name}
                </div>
                <div style={{ fontSize: "11px", color: "#8A8981", marginBottom: "12px" }}>{pkg.meta}</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "19px", color: "#042C53", marginBottom: "4px" }}>
                  {pkg.price}
                </div>
                <div style={{ fontSize: "11.5px", color: "#5F5E5A", lineHeight: 1.6, marginBottom: "14px" }}>{pkg.sub}</div>
              </div>
              <ul style={{ listStyle: "none", padding: "0 20px", flex: 1, margin: 0 }}>
                {pkg.feats.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: "12px",
                      color: "#2C2C2A",
                      padding: "6px 0",
                      borderBottom: "1px solid #E7E4DB",
                      display: "flex",
                      gap: "7px",
                    }}
                  >
                    <span style={{ color: "#4FB79A", flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div style={{ padding: "16px 20px" }}>
                <Link
                  href="/contact"
                  className="hover:-translate-y-0.5 transition-transform duration-150"
                  style={{
                    display: "block",
                    textAlign: "center",
                    font: "600 13px 'IBM Plex Sans',sans-serif",
                    background: pkg.highlighted ? "#854F0B" : "#fff",
                    color: pkg.highlighted ? "#fff" : "#042C53",
                    padding: "10px",
                    borderRadius: "9px",
                  }}
                >
                  {pkg.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* B2C vs B2B comparison */}
      <div style={{ background: "#F5F3EC", padding: "clamp(32px,4vw,52px) clamp(20px,4vw,52px)", borderTop: "1px solid #E7E4DB" }}>
        <div data-reveal="" style={{ maxWidth: "560px", margin: "0 auto 24px" }}>
          <div style={{ font: "500 11px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#8A8981", textTransform: "uppercase", marginBottom: "10px" }}>
            B2C vs B2B comparison
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(19px,2.6vw,26px)", color: "#2C2C2A", letterSpacing: "-.01em" }}>
            How individual and corporate training differ
          </div>
        </div>
        <div data-reveal="" style={{ overflowX: "auto", maxWidth: SECTION_MAX_WIDTH, marginInline: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr 1fr",
              minWidth: "560px",
              border: "1px solid #E7E4DB",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <div style={{ background: "#FBFAF6", padding: "12px 14px" }} />
            <div style={{ background: "#E1F5EE", color: "#085041", font: "600 13px 'IBM Plex Sans',sans-serif", padding: "12px 14px" }}>
              Individual (B2C)
            </div>
            <div style={{ background: "#FAEEDA", color: "#854F0B", font: "600 13px 'IBM Plex Sans',sans-serif", padding: "12px 14px" }}>
              Corporate (B2B)
            </div>
            {COMPARISON.map((row) => (
              <React.Fragment key={row.label}>
                <div style={{ background: "#FBFAF6", padding: "11px 14px", fontSize: "12px", color: "#5F5E5A", borderTop: "1px solid #E7E4DB" }}>
                  {row.label}
                </div>
                <div style={{ padding: "11px 14px", fontSize: "12px", color: "#2C2C2A", borderTop: "1px solid #E7E4DB", background: "#fff" }}>
                  {row.b2c}
                </div>
                <div style={{ padding: "11px 14px", fontSize: "12px", color: "#2C2C2A", borderTop: "1px solid #E7E4DB", background: "#fff" }}>
                  {row.b2b}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* CTA banner */}
      <div style={{ background: "#185FA5", padding: "clamp(28px,4vw,44px) clamp(20px,4vw,52px)", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,.28) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            opacity: 0.14,
            pointerEvents: "none",
          }}
        />
        <div data-reveal="" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", maxWidth: SECTION_MAX_WIDTH, marginInline: "auto" }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(17px,2.2vw,22px)", color: "#fff", marginBottom: "6px" }}>
              Ready to train your team?
            </div>
            <div style={{ fontSize: "13px", color: "#DCEAF9", lineHeight: 1.5 }}>
              Tell us about your organisation and we will come back with a
              structured proposal within 3 business days.
            </div>
          </div>
          <Link
            href="/contact"
            className="hover:-translate-y-0.5 transition-transform duration-150"
            style={{
              font: "600 13px 'IBM Plex Sans',sans-serif",
              background: "#fff",
              color: "#0C447C",
              padding: "11px 20px",
              borderRadius: "10px",
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
          >
            Request a proposal
          </Link>
        </div>
      </div>

      <SiteFooterBar />
    </div>
  );
}
