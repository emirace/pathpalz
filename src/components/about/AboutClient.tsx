"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useTraining } from "@/context/TrainingContext";
import SiteTopBar from "@/components/layout/SiteTopBar";
import SiteFooterBar from "@/components/layout/SiteFooterBar";
import { SECTION_MAX_WIDTH } from "@/utils/layout";

const ENGINES = [
  {
    icon: "{ }",
    iconBg: "#E6F1FB",
    iconColor: "#185FA5",
    eyebrow: "Tech training",
    eyebrowColor: "#185FA5",
    title: "From zero to job-ready in weeks, not years",
    body: "Live cohort programmes in Software Development and DevOps Engineering. Small classes. Real projects. A peer partner matched to your level. A weekly accountability manager who makes sure you actually finish. Every graduate leaves with a portfolio deployed on a live subdomain and a GitHub that proves what they can do.",
    tags: [
      { label: "Software Development", bg: "#E6F1FB", color: "#0C447C" },
      { label: "DevOps Engineering", bg: "#EAF3DE", color: "#27500A" },
      { label: "Data and AI — coming soon", bg: "#F1EFE8", color: "#444441" },
    ],
  },
  {
    icon: "</>",
    iconBg: "#E1F5EE",
    iconColor: "#0F6E56",
    eyebrow: "Tech solutions",
    eyebrowColor: "#0F6E56",
    title: "Enterprise software built by engineers who know their craft",
    body: "PathPalz builds scalable, secure, and user-centric digital products for businesses. Every solution is custom-engineered to the client's context — not adapted from a template. Our development standards are set by the same instructors who teach our cohorts, which means our code is built to the same precision we teach.",
    tags: [
      { label: "Web applications", bg: "#E1F5EE", color: "#085041" },
      { label: "APIs and integrations", bg: "#E1F5EE", color: "#085041" },
      { label: "Cloud infrastructure", bg: "#E1F5EE", color: "#085041" },
    ],
  },
];

const MODEL_ITEMS = [
  {
    icon: "◍",
    iconBg: "#0C447C",
    iconColor: "#85B7EB",
    title: "Small Cohorts",
    body: "Intimate learning environments capped at 30 students, ensuring personal attention and mentor feedback.",
  },
  {
    icon: "◑",
    iconBg: "#083D2A",
    iconColor: "#5DCAA5",
    title: "Peer Partners",
    body: "Matched with a partner at your level to build together, debug together, and stay accountable.",
  },
  {
    icon: "◈",
    iconBg: "#412402",
    iconColor: "#FAC775",
    title: "Accountability",
    body: "A dedicated manager checks in weekly, tracking progress and keeping every student on track.",
  },
  {
    icon: "◆",
    iconBg: "#0C3057",
    iconColor: "#B5D4F4",
    title: "Real Projects",
    body: "Learning by doing — shipped, deployed, and public. Production-grade work, not toy examples.",
  },
];

const COUNTRIES = [
  {
    code: "UK",
    iconBg: "#E6F1FB",
    iconColor: "#185FA5",
    title: "United Kingdom",
    body: "Cohorts run in UK time zones with pricing in GBP. Students and professionals across England, Scotland, Wales, and Northern Ireland are welcome. The student discount covers UK university, college, and secondary school students.",
    tagBg: "#E6F1FB",
    tagColor: "#0C447C",
    tags: ["GBP pricing", "UK time zones", "UK student discount"],
  },
  {
    code: "NG",
    iconBg: "#E1F5EE",
    iconColor: "#0F6E56",
    title: "Nigeria",
    body: "Cohorts run in WAT time zones with pricing in NGN. Students and professionals across Lagos, Abuja, Port Harcourt, and beyond. Nigeria pricing reflects local market conditions while maintaining the full PathPalz curriculum and accountability model.",
    tagBg: "#E1F5EE",
    tagColor: "#085041",
    tags: ["NGN pricing", "WAT time zones", "Nigerian student discount"],
  },
];

const VALUES = [
  {
    icon: "♥",
    iconBg: "#E6F1FB",
    iconColor: "#185FA5",
    title: "Passion",
    body: "A deep-rooted enthusiasm for technology and continuous learning.",
  },
  {
    icon: "⇄",
    iconBg: "#E1F5EE",
    iconColor: "#0F6E56",
    title: "Tenacity",
    body: "The grit to push through complex bugs, steep learning curves, and difficult concepts.",
  },
  {
    icon: "🛡",
    iconBg: "#FAEEDA",
    iconColor: "#854F0B",
    title: "Accountability",
    body: "Taking ownership of one's code, team commitments, and professional growth.",
  },
  {
    icon: "★",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
    title: "Reward",
    body: "Celebrating milestones and recognizing the hard work that leads to success.",
  },
];

export default function AboutClient() {
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
    ) as HTMLElement[];

    if (!reduce) {
      revealEls.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.style.willChange = "opacity, transform";
      });
    } else {
      revealEls.forEach((el) => {
        (el as any)._shown = true;
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }

    const showEl = (el: HTMLElement) => {
      if ((el as any)._shown) return;
      (el as any)._shown = true;
      const delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
      el.style.transition = `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`;
      el.style.opacity = "1";
      el.style.transform = "none";
    };

    const checkReveal = () => {
      const h = window.innerHeight || 800;
      revealEls.forEach((el) => {
        if (!(el as any)._shown && el.getBoundingClientRect().top < h * 0.9) {
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
              font: "600 11.5px 'IBM Plex Mono',monospace",
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
            Our story
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 600,
              fontSize: "clamp(32px,4.8vw,50px)",
              lineHeight: 1.12,
              letterSpacing: "-.02em",
              color: "#fff",
              marginBottom: "16px",
              opacity: 0,
              animation: "fadeSlideUp .6s cubic-bezier(.22,1,.36,1) both .22s",
            }}
          >
            We built the training we <span style={{ color: "#4FB79A" }}>wished</span> existed.
          </h1>
          <p
            style={{
              fontSize: "clamp(15px,1.7vw,17px)",
              color: "#B5D4F4",
              lineHeight: 1.7,
              marginBottom: "24px",
              opacity: 0,
              animation: "fadeSlideUp .6s cubic-bezier(.22,1,.36,1) both .3s",
            }}
          >
            PathPalz was founded on a single belief: that the gap between wanting a
            tech career and having one is not a talent problem. It is a support
            problem. The courses exist. The content exists. What was missing was
            the accountability, the community, and the human infrastructure that
            makes people actually finish — and actually get hired.
          </p>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "26px",
              opacity: 0,
              animation: "fadeSlideUp .6s ease both .4s",
            }}
          >
            {[
              "Founded 2025",
              "UK and Nigeria",
              "Tech training and software",
              "Precision in development, human in approach",
            ].map((chip) => (
              <span
                key={chip}
                style={{
                  font: "500 12.5px 'IBM Plex Mono',monospace",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,.2)",
                  color: "#B5D4F4",
                  whiteSpace: "nowrap",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Two sides of one mission */}
      <div
        style={{
          background: "#F5F3EC",
          backgroundImage:
            "radial-gradient(rgba(24,95,165,.05) 1px,transparent 1px),radial-gradient(circle at 100% 0%,rgba(24,95,165,.07),transparent 46%)",
          backgroundSize: "22px 22px,100% 100%",
          padding: "clamp(32px,4vw,54px) clamp(20px,4vw,52px)",
          borderBottom: "1px solid #E7E4DB",
        }}
      >
        <div data-reveal="" style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto 26px" }}>
          <div style={{ font: "500 12.5px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#8A8981", textTransform: "uppercase", marginBottom: "10px" }}>
            // What we do
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(23px,3.1vw,32px)", color: "#2C2C2A", letterSpacing: "-.01em", marginBottom: "8px" }}>
            Two sides of one mission
          </div>
          <div style={{ fontSize: "16px", color: "#5F5E5A", lineHeight: 1.6 }}>
            PathPalz operates two arms that reinforce each other. The training arm
            produces job-ready engineers. The software arm employs the best of
            them — and uses that real-world client work to keep our curriculum
            sharp and current.
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "16px", maxWidth: SECTION_MAX_WIDTH, marginInline: "auto" }}>
          {ENGINES.map((engine, i) => (
            <div
              key={engine.title}
              data-reveal=""
              data-reveal-delay={(i * 0.1).toFixed(1)}
              className="hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: "#fff",
                border: "1px solid #E7E4DB",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s",
              }}
            >
              <div style={{ padding: "24px 24px 18px" }}>
                <span
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: engine.iconBg,
                    color: engine.iconColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    font: "600 17px 'IBM Plex Mono',monospace",
                    marginBottom: "14px",
                  }}
                >
                  {engine.icon}
                </span>
                <div style={{ font: "600 11.5px 'IBM Plex Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: engine.eyebrowColor, marginBottom: "8px" }}>
                  {engine.eyebrow}
                </div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "19px", color: "#042C53", marginBottom: "10px" }}>
                  {engine.title}
                </div>
                <div style={{ fontSize: "14.5px", color: "#5F5E5A", lineHeight: 1.65 }}>
                  {engine.body}
                </div>
              </div>
              <div style={{ padding: "14px 24px", borderTop: "1px solid #E7E4DB", background: "#FBFAF6", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {engine.tags.map((tag) => (
                  <span
                    key={tag.label}
                    style={{
                      font: "500 11.5px 'IBM Plex Mono',monospace",
                      background: tag.bg,
                      color: tag.color,
                      padding: "3px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The PathPalz model */}
      <div
        style={{
          background: "#031E3E",
          position: "relative",
          overflow: "hidden",
          padding: "clamp(32px,4vw,54px) clamp(20px,4vw,52px)",
          borderBottom: "1px solid #0C3057",
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
        <div data-reveal="" style={{ position: "relative", textAlign: "center", maxWidth: "620px", margin: "0 auto 26px" }}>
          <div style={{ font: "500 12.5px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#85B7EB", textTransform: "uppercase", marginBottom: "10px" }}>
            // Methodology
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(22px,3vw,29px)", color: "#fff", letterSpacing: "-.01em" }}>
            The PathPalz model
          </div>
        </div>
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "14px", maxWidth: SECTION_MAX_WIDTH, marginInline: "auto" }}>
          {MODEL_ITEMS.map((item, i) => (
            <div
              key={item.title}
              data-reveal=""
              data-reveal-delay={(i * 0.08).toFixed(2)}
              className="hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid #0C3057",
                borderRadius: "14px",
                padding: "22px",
                transition: "transform .22s cubic-bezier(.22,1,.36,1), background .22s",
              }}
            >
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "9px",
                  background: item.iconBg,
                  color: item.iconColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "600 17px 'IBM Plex Mono',monospace",
                  marginBottom: "14px",
                  animation: `floatY 5s ease-in-out infinite ${i * 0.3}s`,
                }}
              >
                {item.icon}
              </span>
              <div style={{ font: "600 16px 'IBM Plex Sans',sans-serif", color: "#fff", marginBottom: "6px" }}>
                {item.title}
              </div>
              <div style={{ fontSize: "14px", color: "#85B7EB", lineHeight: 1.6 }}>
                {item.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div style={{ background: "#fff", padding: "clamp(32px,4vw,54px) clamp(20px,4vw,52px)", borderBottom: "1px solid #E7E4DB" }}>
        <div
          data-reveal=""
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            background: "#042C53",
            borderRadius: "16px",
            position: "relative",
            overflow: "hidden",
            padding: "clamp(28px,4vw,44px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(rgba(133,183,235,.3) 1px,transparent 1px)",
              backgroundSize: "26px 26px",
              opacity: 0.1,
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "60px", lineHeight: 1, color: "#185FA5", marginBottom: "6px" }}>
            &quot;
          </div>
          <div style={{ position: "relative", fontSize: "19px", color: "#fff", lineHeight: 1.65, fontStyle: "italic", textAlign: "center", marginBottom: "14px" }}>
            &quot;The tech industry doesn&apos;t just need more coders; it needs
            engineers who understand systems, communicate effectively, and take
            ownership. That&apos;s the gap PathPalz fills.&quot;
          </div>
          <div style={{ position: "relative", font: "500 12.5px 'IBM Plex Mono',monospace", color: "#85B7EB", textAlign: "center" }}>
            PathPalz founders
          </div>
        </div>
      </div>

      {/* Where PathPalz came from */}
      <div
        style={{
          background: "#fff",
          backgroundImage:
            "radial-gradient(rgba(24,95,165,.04) 1px,transparent 1px),radial-gradient(circle at 0% 100%,rgba(24,95,165,.06),transparent 42%)",
          backgroundSize: "24px 24px,100% 100%",
          padding: "clamp(32px,4vw,54px) clamp(20px,4vw,52px)",
          borderBottom: "1px solid #E7E4DB",
        }}
      >
        <div data-reveal="" style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto 24px" }}>
          <div style={{ font: "500 12.5px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#8A8981", textTransform: "uppercase", marginBottom: "10px" }}>
            // Our story
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(22px,3vw,29px)", color: "#2C2C2A", letterSpacing: "-.01em" }}>
            Where PathPalz came from
          </div>
        </div>

        <div data-reveal="" style={{ display: "flex", flexWrap: "wrap", border: "1px solid #E7E4DB", borderRadius: "14px", overflow: "hidden", maxWidth: SECTION_MAX_WIDTH, marginInline: "auto" }}>
          <div style={{ flex: "2 1 340px", padding: "26px", background: "#FBFAF6" }}>
            <div style={{ font: "600 15px 'IBM Plex Sans',sans-serif", color: "#2C2C2A", marginBottom: "10px" }}>
              The problem we kept seeing
            </div>
            <div style={{ fontSize: "14.5px", color: "#5F5E5A", lineHeight: 1.75, marginBottom: "16px" }}>
              Bootcamps that were too expensive. YouTube tutorials that went
              nowhere. LinkedIn posts from people who had been &quot;learning to
              code for two years&quot; and had nothing to show for it. Online
              courses with 90% dropout rates. A skills gap in Nigeria and the UK
              that was widening while the tools to close it were sitting unused
              because nobody had built the right structure around them.
            </div>
            <div style={{ fontSize: "14.5px", color: "#5F5E5A", lineHeight: 1.75 }}>
              So we built that structure. Live cohorts. Peer partners.
              Accountability managers. Real deadlines. Real projects. A subdomain
              that belongs to you when you graduate. And a pathway — for the best
              graduates — into the company that trained them.
            </div>
          </div>
          <div style={{ flex: "1 1 220px", background: "#042C53", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ font: "600 11.5px 'IBM Plex Mono',monospace", color: "#85B7EB", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "14px" }}>
              Operating in
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#5FA8E8" }} />
              <div>
                <div style={{ font: "600 15px 'IBM Plex Sans',sans-serif", color: "#fff" }}>United Kingdom</div>
                <div style={{ fontSize: "12.5px", color: "#85B7EB" }}>Training and software</div>
              </div>
            </div>
            <div style={{ width: "100%", height: "1px", background: "#0C3057", margin: "6px 0 12px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4FB79A" }} />
              <div>
                <div style={{ font: "600 15px 'IBM Plex Sans',sans-serif", color: "#fff" }}>Nigeria</div>
                <div style={{ fontSize: "12.5px", color: "#85B7EB" }}>Training and software</div>
              </div>
            </div>
            <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid #0C3057", fontSize: "12.5px", color: "#85B7EB", lineHeight: 1.6 }}>
              Built for the UK. Built for Nigeria. Built for anyone in both
              countries who is serious about building a tech career.
            </div>
          </div>
        </div>
      </div>

      {/* Two countries, one standard */}
      <div
        style={{
          background: "#F5F3EC",
          backgroundImage:
            "radial-gradient(rgba(15,110,86,.05) 1px,transparent 1px),radial-gradient(circle at 100% 0%,rgba(15,110,86,.06),transparent 44%)",
          backgroundSize: "22px 22px,100% 100%",
          padding: "clamp(32px,4vw,54px) clamp(20px,4vw,52px)",
          borderBottom: "1px solid #E7E4DB",
        }}
      >
        <div data-reveal="" style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto 24px" }}>
          <div style={{ font: "500 12.5px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#8A8981", textTransform: "uppercase", marginBottom: "10px" }}>
            // Geographic presence
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(22px,3vw,29px)", color: "#2C2C2A", letterSpacing: "-.01em", marginBottom: "8px" }}>
            Two countries, one standard
          </div>
          <div style={{ fontSize: "16px", color: "#5F5E5A", lineHeight: 1.6 }}>
            Every PathPalz cohort runs to the same curriculum, the same
            accountability model, and the same graduation standard regardless of
            location.
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "16px", maxWidth: SECTION_MAX_WIDTH, marginInline: "auto" }}>
          {COUNTRIES.map((country, i) => (
            <div
              key={country.code}
              data-reveal=""
              data-reveal-delay={(i * 0.1).toFixed(1)}
              className="hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: "#fff",
                border: "1px solid #E7E4DB",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s",
              }}
            >
              <div style={{ padding: "22px 22px 16px" }}>
                <span
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: country.iconBg,
                    color: country.iconColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    font: "600 16px 'IBM Plex Mono',monospace",
                    marginBottom: "12px",
                  }}
                >
                  {country.code}
                </span>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "18px", color: "#042C53", marginBottom: "6px" }}>
                  {country.title}
                </div>
                <div style={{ fontSize: "14.5px", color: "#5F5E5A", lineHeight: 1.65 }}>
                  {country.body}
                </div>
              </div>
              <div style={{ padding: "12px 22px", borderTop: "1px solid #E7E4DB", background: "#FBFAF6", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {country.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      font: "500 11.5px 'IBM Plex Mono',monospace",
                      background: country.tagBg,
                      color: country.tagColor,
                      padding: "3px 9px",
                      borderRadius: "6px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Four values */}
      <div
        style={{
          background: "#F5F3EC",
          backgroundImage:
            "radial-gradient(rgba(24,95,165,.05) 1px,transparent 1px),radial-gradient(circle at 0% 100%,rgba(24,95,165,.06),transparent 44%)",
          backgroundSize: "22px 22px,100% 100%",
          padding: "clamp(32px,4vw,54px) clamp(20px,4vw,52px)",
          borderBottom: "1px solid #E7E4DB",
        }}
      >
        <div data-reveal="" style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto 24px" }}>
          <div style={{ font: "500 12.5px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#8A8981", textTransform: "uppercase", marginBottom: "10px" }}>
            // What we stand for
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(22px,3vw,29px)", color: "#2C2C2A", letterSpacing: "-.01em", marginBottom: "8px" }}>
            Four values. All operational.
          </div>
          <div style={{ fontSize: "16px", color: "#5F5E5A", lineHeight: 1.6 }}>
            These are not wall decorations. Each one has a specific implication
            for how PathPalz is run.
          </div>
        </div>
        <div data-reveal="" style={{ maxWidth: "820px", margin: "0 auto", borderTop: "1px solid #E7E4DB" }} />
        <div style={{ maxWidth: "820px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "24px 40px", paddingTop: "28px" }}>
          {VALUES.map((value, i) => (
            <div key={value.title} data-reveal="" data-reveal-delay={(i * 0.08).toFixed(2)} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "9px",
                  background: value.iconBg,
                  color: value.iconColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "17px",
                  flexShrink: 0,
                  animation: `floatY 5s ease-in-out infinite ${i * 0.2}s`,
                }}
              >
                {value.icon}
              </span>
              <div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "17px", color: "#042C53", marginBottom: "4px" }}>
                  {value.title}
                </div>
                <div style={{ fontSize: "14px", color: "#5F5E5A", lineHeight: 1.6 }}>
                  {value.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div style={{ background: "#185FA5", padding: "clamp(30px,4vw,48px) clamp(20px,4vw,52px)", position: "relative", overflow: "hidden" }}>
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
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(21px,2.8vw,27px)", color: "#fff", marginBottom: "6px", letterSpacing: "-.01em" }}>
              Ready to be part of what PathPalz is building?
            </div>
            <div style={{ fontSize: "14.5px", color: "#DCEAF9", lineHeight: 1.5 }}>
              August 2025 cohort — 30 seats. Two tracks open now. Enrolment closes
              28 July.
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => openModal("apply")}
              className="hover:-translate-y-0.5 transition-transform duration-150"
              style={{
                font: "600 15px 'IBM Plex Sans',sans-serif",
                background: "#fff",
                color: "#0C447C",
                padding: "12px 22px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 26px rgba(0,0,0,.18)",
                whiteSpace: "nowrap",
              }}
            >
              Secure my August seat
            </button>
            <Link
              href="/contact"
              style={{
                font: "600 15px 'IBM Plex Sans',sans-serif",
                color: "#DCEAF9",
                padding: "12px 22px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,.3)",
                whiteSpace: "nowrap",
                display: "inline-block",
              }}
            >
              Talk to the team
            </Link>
          </div>
        </div>
      </div>

      <SiteFooterBar />
    </div>
  );
}
