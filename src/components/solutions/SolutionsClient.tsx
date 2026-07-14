"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTraining } from "@/context/TrainingContext";
import SiteTopBar from "@/components/layout/SiteTopBar";
import SiteFooterBar from "@/components/layout/SiteFooterBar";
import { SECTION_MAX_WIDTH } from "@/utils/layout";

type RevealEl = HTMLElement & { _shown?: boolean };

const PILLARS = [
  {
    id: "tech",
    href: "/solutions/tech",
    accentBg: "#E6F1FB",
    accentFg: "#0C447C",
    icon: "</>",
    eyebrow: "For businesses & founders",
    title: "Tech solutions",
    desc: "Custom-engineered software — web apps, APIs, and cloud infrastructure built for your business logic, not retrofitted from a template.",
    tags: ["Web apps", "APIs", "Cloud infra"],
    cta: "Explore tech solutions",
  },
  {
    id: "training",
    href: "/training",
    accentBg: "#E1F5EE",
    accentFg: "#085041",
    icon: "{ }",
    eyebrow: "For individuals & career-changers",
    title: "Individual training",
    desc: "Live cohorts of 30. A peer partner and weekly accountability manager. Real projects, a public portfolio, and a certificate.",
    tags: ["Software Dev", "DevOps", "Data & AI"],
    cta: "View training tracks",
  },
  {
    id: "corporate",
    href: "/solutions/corporate",
    accentBg: "#FAEEDA",
    accentFg: "#854F0B",
    icon: "⬢",
    eyebrow: "For HR, L&D & engineering leads",
    title: "Corporate training",
    desc: "PathPalz training inside your organisation — your stack, your pace, your outcomes. From a single squad to a full talent pipeline.",
    tags: ["Team cohorts", "Custom curriculum", "On-site or remote"],
    cta: "See corporate packages",
  },
];

const DETAILS = [
  {
    id: "tech",
    imageSide: "left" as const,
    eyebrow: "Tech solutions",
    eyebrowColor: "#185FA5",
    heading: "Software built for your business — not adapted from someone else's.",
    body: "We architect and build scalable, secure, user-centric products from the ground up. Our engineering standards are set by the same practitioners who teach our cohorts.",
    checklist: [
      "Discovery call within 48 hours",
      "Fixed-fee proposal in 5 business days",
      "30 days of post-launch support",
    ],
    ctaLabel: "View tech solutions page →",
    ctaHref: "/solutions/tech",
    ctaBg: "#185FA5",
    bg: "#fff",
    image: {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80",
      alt: "Engineers collaborating on a tech solutions project",
      credit: "Photo by Marvin Meyer on Unsplash",
      creditHref: "https://unsplash.com/@marvelous",
    },
  },
  {
    id: "training",
    imageSide: "right" as const,
    eyebrow: "Individual training — B2C",
    eyebrowColor: "#0F6E56",
    heading: "For individuals, students, and career-changers.",
    body: "Live cohorts of 30. A peer partner matched to you and a weekly accountability manager. Real projects, a public portfolio, and a certificate that proves it.",
    checklist: [
      "August cohort — 30 seats, closes 28 July",
      "Software Dev, DevOps, Data & AI tracks",
      "7-day money-back guarantee",
    ],
    ctaLabel: "View training tracks →",
    ctaHref: "/training",
    ctaBg: "#0F6E56",
    bg: "#FBFAF6",
    image: {
      src: "https://images.unsplash.com/photo-1723987135977-ae935608939e?w=1200&auto=format&fit=crop&q=80",
      alt: "A training cohort working together",
      credit: "Photo by Anastassia Anufrieva on Unsplash",
      creditHref: "https://unsplash.com/@antoie",
    },
  },
  {
    id: "corporate",
    imageSide: "left" as const,
    eyebrow: "Corporate training — B2B",
    eyebrowColor: "#854F0B",
    heading: "PathPalz training. Inside your organisation.",
    body: "Custom cohorts for your team — your stack, your pace, your outcomes. From upskilling a squad to building a talent pipeline.",
    checklist: [
      "Custom curriculum aligned to your stack",
      "Weekly progress dashboard for HR",
      "Written proposal within 3 business days",
    ],
    ctaLabel: "See corporate packages →",
    ctaHref: "/solutions/corporate",
    ctaBg: "#854F0B",
    bg: "#fff",
    image: {
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80",
      alt: "A corporate training session",
      credit: "Photo by Campaign Creators on Unsplash",
      creditHref: "https://unsplash.com/@campaign_creators",
    },
  },
];

const FAQS = [
  {
    q: "What is the difference between tech solutions and training?",
    a: "Tech solutions is us building your software. Training is us teaching people to build software — as individuals or as your team. Many clients use both.",
  },
  {
    q: "How do I know which solution is right for me?",
    a: "If you need a product built, start with tech solutions. If you or your team need to learn to build, start with training. Not sure? Book a free consultation and we will point you the right way.",
  },
  {
    q: "Can my company get a custom training programme?",
    a: "Yes — that is corporate training. We design curriculum around your stack, your pace, and your team size, from a single squad to a full department.",
  },
  {
    q: "Do you only build software for training graduates' portfolios?",
    a: "No. Tech solutions is a full commercial practice. Our instructors are practising engineers, and the standards we teach are the same ones we build to.",
  },
  {
    q: "What is the cohort format for individual training?",
    a: "Live, cohort-based, capped at 30 students. You get a matched peer partner and a weekly accountability manager — not a self-paced video library.",
  },
  {
    q: "Is there a guarantee?",
    a: "Individual training carries a 7-day money-back guarantee. Corporate and tech solutions engagements are scoped with a written proposal before any commitment.",
  },
];

export default function SolutionsClient() {
  const { openModal } = useTraining();
  const rootRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({});

  const toggleFaq = (i: number) => {
    setOpenFaq((prev) => ({ ...prev, [i]: !prev[i] }));
  };

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
            "radial-gradient(circle at 86% 14%, rgba(24,95,165,.5), transparent 44%),radial-gradient(circle at 2% 96%, rgba(29,110,90,.24), transparent 40%)",
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
            position: "absolute",
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(79,183,154,.5),transparent 68%)",
            filter: "blur(38px)",
            top: "-14%",
            left: "6%",
            animation: "blobDrift 11s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(24,95,165,.55),transparent 68%)",
            filter: "blur(34px)",
            top: "6%",
            right: "8%",
            animation: "blobDrift 13s ease-in-out infinite reverse",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            padding: "clamp(32px,5vw,60px) clamp(20px,4vw,52px) clamp(36px,5.5vw,64px)",
            maxWidth: "680px",
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              font: "600 11px 'IBM Plex Mono',monospace",
              color: "#8FD3C3",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: "14px",
              background: "rgba(79,183,154,.12)",
              border: "1px solid rgba(79,183,154,.25)",
              padding: "5px 11px",
              borderRadius: "20px",
              opacity: 0,
              animation: "fadeSlideUp .5s ease both .16s",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#4FB79A",
                animation: "dotBlink 1.4s infinite",
                flexShrink: 0,
              }}
            />
            Solutions
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 600,
              fontSize: "clamp(28px,4.2vw,42px)",
              lineHeight: 1.14,
              letterSpacing: "-.02em",
              color: "#fff",
              marginBottom: "14px",
              opacity: 0,
              animation: "fadeSlideUp .6s cubic-bezier(.22,1,.36,1) both .22s",
            }}
          >
            Two ways we help. One standard of{" "}
            <span style={{ color: "#4FB79A" }}>precision</span>.
          </h1>
          <p
            style={{
              fontSize: "clamp(13px,1.5vw,15px)",
              color: "#B5D4F4",
              lineHeight: 1.7,
              marginBottom: "26px",
              opacity: 0,
              animation: "fadeSlideUp .6s cubic-bezier(.22,1,.36,1) both .3s",
            }}
          >
            PathPalz builds software for businesses and trains the people who
            build it. Whichever you need — a product shipped or a team that can
            ship one — pick a lane below.
          </p>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              justifyContent: "center",
              opacity: 0,
              animation: "fadeSlideUp .6s ease both .38s",
            }}
          >
            <a
              href="#pillars"
              className="hover:-translate-y-0.5 transition-transform duration-150"
              style={{
                font: "600 13px 'IBM Plex Sans',sans-serif",
                background: "#fff",
                color: "#0C447C",
                padding: "11px 20px",
                borderRadius: "10px",
                whiteSpace: "nowrap",
              }}
            >
              Explore solutions
            </a>
            <Link
              href="/contact"
              style={{
                font: "600 13px 'IBM Plex Sans',sans-serif",
                color: "#fff",
                padding: "11px 20px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,.3)",
                whiteSpace: "nowrap",
              }}
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Three pillars */}
      <div
        id="pillars"
        style={{
          padding: "clamp(32px,4vw,52px) clamp(20px,4vw,52px)",
          background: "#F5F3EC",
          backgroundImage: "radial-gradient(rgba(24,95,165,.05) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div data-reveal="" style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 26px" }}>
          <div style={{ font: "500 11px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#8A8981", textTransform: "uppercase", marginBottom: "10px" }}>
            Three pillars
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(19px,2.6vw,26px)", color: "#2C2C2A", letterSpacing: "-.01em", marginBottom: "8px" }}>
            Choose where you need us
          </div>
          <div style={{ fontSize: "13.5px", color: "#5F5E5A", lineHeight: 1.6 }}>
            Each pillar links out to a full solution page with detail, pricing,
            and how to get started.
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "16px", maxWidth: SECTION_MAX_WIDTH, marginInline: "auto" }}>
          {PILLARS.map((p, i) => (
            <Link
              key={p.id}
              href={p.href}
              data-reveal=""
              data-reveal-delay={(i * 0.1).toFixed(1)}
              className="hover:-translate-y-1 hover:shadow-lg"
              style={{
                display: "block",
                background: "#fff",
                border: "1px solid #E7E4DB",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s",
                color: "inherit",
              }}
            >
              <div style={{ padding: "22px 22px 16px" }}>
                <span
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: p.accentBg,
                    color: p.accentFg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    font: "600 15px 'IBM Plex Mono',monospace",
                    marginBottom: "14px",
                  }}
                >
                  {p.icon}
                </span>
                <div style={{ font: "600 10px 'IBM Plex Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: p.accentFg, marginBottom: "6px" }}>
                  {p.eyebrow}
                </div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "16px", color: "#042C53", marginBottom: "8px" }}>
                  {p.title}
                </div>
                <div style={{ fontSize: "12.5px", color: "#5F5E5A", lineHeight: 1.65, marginBottom: "12px" }}>
                  {p.desc}
                </div>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        font: "500 10px 'IBM Plex Mono',monospace",
                        background: p.accentBg,
                        color: p.accentFg,
                        padding: "3px 9px",
                        borderRadius: "20px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ padding: "12px 22px", borderTop: "1px solid #E7E4DB", background: "#FBFAF6" }}>
                <span style={{ font: "600 12px 'IBM Plex Sans',sans-serif", color: p.accentFg, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  {p.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Detail split-sections */}
      {DETAILS.map((d, i) => (
        <div
          key={d.id}
          data-reveal=""
          data-reveal-delay={i === 0 ? "0" : "0.08"}
          style={{
            background: d.bg,
            padding: "clamp(32px,4vw,52px) clamp(20px,4vw,52px)",
            borderTop: "1px solid #E7E4DB",
            display: "flex",
            flexWrap: d.imageSide === "left" ? "wrap" : "wrap-reverse",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <div style={{ flex: "1 1 260px", minWidth: "240px" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", borderRadius: "18px", overflow: "hidden", background: "#E7E4DB" }}>
              <Image
                src={d.image.src}
                alt={d.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <a
              href={d.image.creditHref}
              target="_blank"
              rel="noreferrer"
              style={{ display: "block", fontSize: "11px", color: "#8A8981", marginTop: "6px" }}
            >
              {d.image.credit}
            </a>
          </div>
          <div style={{ flex: "2 1 340px" }}>
            <div style={{ font: "600 10px 'IBM Plex Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: d.eyebrowColor, marginBottom: "8px" }}>
              {d.eyebrow}
            </div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(18px,2.2vw,23px)", color: "#042C53", marginBottom: "10px" }}>
              {d.heading}
            </div>
            <div style={{ fontSize: "13.5px", color: "#5F5E5A", lineHeight: 1.7, marginBottom: "14px" }}>
              {d.body}
            </div>
            <ul style={{ listStyle: "none", marginBottom: "16px", padding: 0 }}>
              {d.checklist.map((item) => (
                <li key={item} style={{ fontSize: "12.5px", color: "#2C2C2A", padding: "5px 0", display: "flex", gap: "8px" }}>
                  <span style={{ color: "#4FB79A" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={d.ctaHref}
              style={{
                font: "600 13px 'IBM Plex Sans',sans-serif",
                background: d.ctaBg,
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "9px",
                whiteSpace: "nowrap",
                display: "inline-block",
              }}
            >
              {d.ctaLabel}
            </Link>
          </div>
        </div>
      ))}

      {/* FAQ */}
      <div
        style={{
          background: "#031E3E",
          position: "relative",
          overflow: "hidden",
          padding: "clamp(32px,4vw,52px) clamp(20px,4vw,52px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(133,183,235,.3) 1px,transparent 1px)",
            backgroundSize: "26px 26px",
            opacity: 0.08,
            animation: "gridPulse 6s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div data-reveal="" style={{ position: "relative", textAlign: "center", maxWidth: "560px", margin: "0 auto 22px" }}>
          <div style={{ font: "500 11px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#85B7EB", textTransform: "uppercase", marginBottom: "10px" }}>
            FAQ
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(19px,2.6vw,26px)", color: "#fff", letterSpacing: "-.01em" }}>
            Common questions
          </div>
        </div>
        <div data-reveal="" style={{ position: "relative", maxWidth: "680px", margin: "0 auto", background: "rgba(255,255,255,.04)", border: "1px solid #0C3057", borderRadius: "14px", overflow: "hidden" }}>
          {FAQS.map((f, i) => {
            const open = !!openFaq[i];
            return (
              <div key={f.q} style={{ borderBottom: i === FAQS.length - 1 ? "none" : "1px solid #0C3057" }}>
                <button
                  onClick={() => toggleFaq(i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "16px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    font: "600 13.5px 'IBM Plex Sans',sans-serif",
                    color: "#fff",
                  }}
                >
                  <span>{f.q}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", color: "#85B7EB", flexShrink: 0 }}>
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <div style={{ padding: "0 18px 16px", fontSize: "13px", color: "#B5D4F4", lineHeight: 1.7 }}>
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
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
              Not sure which solution fits?
            </div>
            <div style={{ fontSize: "13px", color: "#DCEAF9", lineHeight: 1.5 }}>
              Book a free 30-minute consultation — we&apos;ll tell you exactly
              what PathPalz can do for your situation.
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
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
            <Link
              href="/contact"
              style={{
                font: "600 13px 'IBM Plex Sans',sans-serif",
                color: "#DCEAF9",
                padding: "11px 20px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,.3)",
                whiteSpace: "nowrap",
                display: "inline-block",
              }}
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>

      <SiteFooterBar />
    </div>
  );
}
