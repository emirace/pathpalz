"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useTraining } from "@/context/TrainingContext";
import SiteTopBar from "@/components/layout/SiteTopBar";
import SiteFooterBar from "@/components/layout/SiteFooterBar";
import { SECTION_MAX_WIDTH } from "@/utils/layout";

type RevealEl = HTMLElement & { _shown?: boolean };

const CAPABILITIES = [
  {
    icon: "</>",
    bg: "#E6F1FB",
    fg: "#0C447C",
    title: "Web applications",
    desc: "Full-stack web applications from product design through to production deployment. React frontends, Python or Node backends, PostgreSQL or MongoDB data layers.",
    tags: ["React", "Python", "Node.js", "PostgreSQL"],
  },
  {
    icon: "⇄",
    bg: "#E1F5EE",
    fg: "#085041",
    title: "APIs and integrations",
    desc: "REST and GraphQL APIs built to scale. Third-party integrations, payment systems, authentication, and webhook infrastructure. Documented and tested before delivery.",
    tags: ["REST APIs", "GraphQL", "Stripe", "OAuth2"],
  },
  {
    icon: "☁",
    bg: "#FAEEDA",
    fg: "#854F0B",
    title: "Cloud infrastructure",
    desc: "AWS and Azure architecture, CI/CD pipelines, containerisation with Docker and Kubernetes, Infrastructure as Code with Terraform. Built to grow without breaking.",
    tags: ["AWS", "Terraform", "Docker", "Kubernetes"],
  },
  {
    icon: "▦",
    bg: "#EEEDFE",
    fg: "#534AB7",
    title: "Mobile applications",
    desc: "Cross-platform mobile apps with React Native and Flutter. iOS and Android from a single codebase. App Store and Google Play submission included.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
  },
];

const STEPS = [
  {
    n: 1,
    title: "Discovery call",
    desc: "Free 30-minute consultation. We understand your goals, your constraints, and what good looks like for your business.",
  },
  {
    n: 2,
    title: "Scoping and proposal",
    desc: "We deliver a written scope, timeline, and fixed-fee proposal within 5 business days. No surprises mid-project.",
  },
  {
    n: 3,
    title: "Build and iterate",
    desc: "We ship in two-week sprints with a review at the end of each. You see progress continuously — not just at the end.",
  },
  {
    n: 4,
    title: "Handover and support",
    desc: "Full codebase, documentation, and 30 days of post-launch support included. Your IP, your codebase — always.",
  },
];

export default function TechSolutionsClient() {
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
            "radial-gradient(circle at 86% 14%, rgba(24,95,165,.5), transparent 44%)",
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
              color: "#85B7EB",
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
              color: "#5FA8E8",
              marginBottom: "12px",
            }}
          >
            Tech solutions
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
            Software built for your business — not adapted from someone
            else&apos;s.
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
            We architect and build scalable, secure, and user-centric
            digital products from the ground up. Our development standards
            are set by the same practitioners who teach our cohorts — which
            means the code we ship is built to the same precision we teach.
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
              Book a consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Capabilities */}
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
            What we build
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(19px,2.6vw,26px)", color: "#2C2C2A", letterSpacing: "-.01em" }}>
            Our technical capabilities
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "16px", maxWidth: SECTION_MAX_WIDTH, marginInline: "auto" }}>
          {CAPABILITIES.map((c, i) => (
            <div
              key={c.title}
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
                  background: c.bg,
                  color: c.fg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "600 15px 'IBM Plex Mono',monospace",
                  marginBottom: "14px",
                }}
              >
                {c.icon}
              </span>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "16px", color: "#042C53", marginBottom: "8px" }}>
                {c.title}
              </div>
              <div style={{ fontSize: "12.5px", color: "#5F5E5A", lineHeight: 1.65, marginBottom: "12px" }}>
                {c.desc}
              </div>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {c.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      font: "500 10px 'IBM Plex Mono',monospace",
                      background: c.bg,
                      color: c.fg,
                      padding: "3px 9px",
                      borderRadius: "20px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: "#fff", padding: "clamp(32px,4vw,52px) clamp(20px,4vw,52px)", borderTop: "1px solid #E7E4DB" }}>
        <div data-reveal="" style={{ maxWidth: "560px", margin: "0 auto 24px" }}>
          <div style={{ font: "500 11px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#8A8981", textTransform: "uppercase", marginBottom: "10px" }}>
            How it works
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(19px,2.6vw,26px)", color: "#2C2C2A", letterSpacing: "-.01em" }}>
            From brief to live product
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "14px", maxWidth: SECTION_MAX_WIDTH, marginInline: "auto" }}>
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              data-reveal=""
              data-reveal-delay={(i * 0.08).toFixed(2)}
              style={{ background: "#FBFAF6", border: "1px solid #E7E4DB", borderRadius: "14px", padding: "22px" }}
            >
              <span
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: "#E6F1FB",
                  color: "#185FA5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "600 13px 'IBM Plex Sans',sans-serif",
                  marginBottom: "14px",
                }}
              >
                {s.n}
              </span>
              <div style={{ font: "600 14px 'IBM Plex Sans',sans-serif", color: "#042C53", marginBottom: "6px" }}>
                {s.title}
              </div>
              <div style={{ fontSize: "12.5px", color: "#5F5E5A", lineHeight: 1.6 }}>
                {s.desc}
              </div>
            </div>
          ))}
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
              Ready to talk about your project?
            </div>
            <div style={{ fontSize: "13px", color: "#DCEAF9", lineHeight: 1.5 }}>
              Book a free discovery call. No commitment, no sales pressure —
              just an honest conversation about what you need.
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
            Book a discovery call
          </Link>
        </div>
      </div>

      <SiteFooterBar />
    </div>
  );
}
