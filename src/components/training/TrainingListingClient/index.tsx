"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTraining } from "@/context/TrainingContext";
import { useGetTracks } from "@/query/training/tracks";
import TrainingTopBar from "@/components/layout/SiteTopBar";
import TrainingPageFooter from "@/components/layout/SiteFooterBar";
import TrackGrid from "./TrackGrid";
import PathToMastery from "@/components/training/PathToMastery";
import HighPerformanceRhythm from "@/components/training/HighPerformanceRhythm";
import SupportSystem from "@/components/training/SupportSystem";
import WhatEveryTrackIncludes from "@/components/training/WhatEveryTrackIncludes";
import FAQ from "@/components/training/FAQ";
import {
  COHORT_CLOSE_DATE,
  COHORT_SEATS_LEFT,
  COHORT_SEATS_PCT,
  COHORT_SEATS_TOTAL,
  COHORT_START_DATE,
} from "./constants";

export default function TrainingListingClient() {
  const { openModal } = useTraining();
  const { data: tracks } = useGetTracks();
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

  const footerTracks = (tracks || []).slice(0, 2);

  return (
    <div
      ref={rootRef}
      style={{
        width: "100%",
        fontFamily: "'IBM Plex Sans', sans-serif",
        background: "#fff",
      }}
    >
      <TrainingTopBar mode="listing" onReserveSeat={() => openModal("apply")} />

      {/* Hero band */}
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
            position: "relative",
            padding: "clamp(28px,4.5vw,48px) clamp(20px,4vw,52px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "clamp(20px,4vw,40px)",
          }}
        >
          <div style={{ flex: "1 1 380px", minWidth: "min(100%,320px)" }}>
            <div
              style={{
                font: "600 10px 'IBM Plex Mono',monospace",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "#85B7EB",
                marginBottom: "10px",
                opacity: 0,
                animation: "fadeSlideUp .5s ease both .1s",
              }}
            >
              Training tracks — August 2025
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontWeight: 600,
                fontSize: "clamp(24px,4vw,38px)",
                lineHeight: 1.18,
                color: "#fff",
                marginBottom: "14px",
                opacity: 0,
                animation:
                  "fadeSlideUp .55s cubic-bezier(.22,1,.36,1) both .18s",
              }}
            >
              Choose your track.
              <br />
              Start in August.
            </div>
            <div
              style={{
                fontSize: "clamp(13px,1.4vw,15px)",
                color: "#B5D4F4",
                lineHeight: 1.65,
                maxWidth: "480px",
                marginBottom: "18px",
                opacity: 0,
                animation: "fadeSlideUp .55s ease both .26s",
              }}
            >
              Every track runs as a live cohort of 30 students with a peer
              partner, weekly accountability, and real projects shipped every
              week. Select a track to see the full curriculum and enrol.
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                opacity: 0,
                animation: "fadeSlideUp .55s ease both .34s",
              }}
            >
              {[
                "30 seats per cohort",
                `Enrolment closes ${COHORT_CLOSE_DATE}`,
                "UK and Nigeria",
                "7-day money-back guarantee",
              ].map((chip) => (
                <span
                  key={chip}
                  style={{
                    font: "500 11px 'IBM Plex Mono',monospace",
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
          <div
            style={{
              flex: "1 1 260px",
              minWidth: "min(100%,240px)",
              position: "relative",
              opacity: 0,
              animation: "fadeIn .7s ease both .3s",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "clamp(120px,36%,180px)",
                height: "clamp(120px,36%,180px)",
                top: "-10%",
                right: "4%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(79,183,154,.45),transparent 68%)",
                filter: "blur(20px)",
                animation: "blobDrift 10s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "relative",
                animation: "floatY 6s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,.14)",
                  boxShadow: "0 20px 50px rgba(0,0,0,.32)",
                  aspectRatio: "4/3",
                  background: "#08192B",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    animation: "kenBurns 16s ease-in-out infinite alternate",
                  }}
                >
                  <Image
                    src="/training_hero1.png"
                    alt="Students collaborating in a modern tech workspace"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status strip + track grid */}
      <div style={{ padding: "clamp(20px,3vw,32px) clamp(20px,4vw,52px)" }}>
        <div
          style={{
            background: "#FBFAF6",
            border: "1px solid #E7E4DB",
            borderRadius: "12px",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "26px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#1D9E75",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "13px", color: "#2C2C2A" }}>
              <strong style={{ fontWeight: 600 }}>August cohort</strong> —
              starts {COHORT_START_DATE} · enrolment closes {COHORT_CLOSE_DATE}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "90px",
                height: "5px",
                background: "#E7E4DB",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "5px",
                  background: "#185FA5",
                  borderRadius: "3px",
                  width: `${COHORT_SEATS_PCT}%`,
                }}
              />
            </div>
            <span
              style={{
                fontSize: "12px",
                color: "#5F5E5A",
                whiteSpace: "nowrap",
              }}
            >
              {COHORT_SEATS_LEFT} seats left of {COHORT_SEATS_TOTAL}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 600,
              fontSize: "19px",
              color: "#042C53",
            }}
          >
            Open tracks — August cohort
          </div>
          <div style={{ fontSize: "12.5px", color: "#8A8981" }}>
            Select a track for the full curriculum
          </div>
        </div>

        <div style={{ marginBottom: "6px" }}>
          <TrackGrid />
        </div>
      </div>

      <PathToMastery />
      <HighPerformanceRhythm />
      <SupportSystem />

      <div style={{ padding: "clamp(28px,4vw,44px) clamp(20px,4vw,52px)" }}>
        <div
          style={{ height: "1px", background: "#E7E4DB", marginBottom: "26px" }}
        />
        <WhatEveryTrackIncludes />

        <div
          style={{ height: "1px", background: "#E7E4DB", marginBottom: "26px" }}
        />
        <FAQ />

        <div
          style={{
            background: "#042C53",
            borderRadius: "14px",
            padding: "22px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                font: "600 15px 'IBM Plex Sans',sans-serif",
                color: "#fff",
                marginBottom: "4px",
              }}
            >
              The August cohort is PathPalz's founding cohort.
            </div>
            <div style={{ fontSize: "12.5px", color: "#85B7EB" }}>
              There is only ever one founding cohort — 30 seats, live tracks,
              one start date.
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {footerTracks.map((track, i) => (
              <Link
                key={track.id}
                href={`/training/${track.slug}`}
                style={{
                  font: "600 13px 'IBM Plex Sans',sans-serif",
                  background: i === 0 ? "#fff" : "transparent",
                  color: i === 0 ? "#042C53" : "#B5D4F4",
                  padding: "10px 18px",
                  borderRadius: "9px",
                  border: i === 0 ? "none" : "1px solid rgba(255,255,255,.25)",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
              >
                View {track.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <TrainingPageFooter />
    </div>
  );
}
