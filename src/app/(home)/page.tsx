"use client";

import React, { useState, useEffect, useRef } from "react";
import { HomeAnnouncementBar } from "./components/HomeAnnouncementBar";
import { HomeNavbar } from "./components/HomeNavbar";
import { HeroSection } from "./components/HeroSection";
import { TechMarquee } from "./components/TechMarquee";
import { StatsBar } from "./components/StatsBar";
import { HowItWorks } from "./components/HowItWorks";
import { TrainingTracks } from "./components/TrainingTracks";
import { BuiltInSupport } from "./components/BuiltInSupport";
import { WhyPathPalz } from "./components/WhyPathPalz";
import { FoundingCohortBanner } from "./components/FoundingCohortBanner";
import { BottomCTA } from "./components/BottomCTA";
import { HomeFooter } from "./components/HomeFooter";
import { StickySeatsBar } from "./components/StickySeatsBar";
import { DiscountModal } from "./components/DiscountModal";
import { useRouter } from "next/navigation";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dtype, setDtype] = useState<"student" | "school" | "bespoke">(
    "student",
  );
  const [seatsRemaining] = useState(8);
  const [typedWord, setTypedWord] = useState("career");

  const rootRef = useRef<HTMLDivElement>(null);

  // Dynamic typing loop
  useEffect(() => {
    const words = [
      "career",
      "developer",
      "portfolio",
      "future",
      "income",
      "skill",
    ];
    let wordIndex = 0;
    let charIndex = words[0].length;
    let isDeleting = true;
    let timer: NodeJS.Timeout;

    const tick = () => {
      const currentWord = words[wordIndex];
      if (!isDeleting) {
        charIndex++;
        setTypedWord(currentWord.slice(0, charIndex));
        if (charIndex >= currentWord.length) {
          isDeleting = true;
          timer = setTimeout(tick, 1400);
          return;
        }
        timer = setTimeout(tick, 55);
      } else {
        charIndex--;
        setTypedWord(currentWord.slice(0, charIndex));
        if (charIndex <= 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timer = setTimeout(tick, 300);
          return;
        }
        timer = setTimeout(tick, 30);
      }
    };
    timer = setTimeout(tick, 420);
    return () => clearTimeout(timer);
  }, []);

  // Scroll reveal, counters, and sticky bar handler
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealEls = Array.from(
      root.querySelectorAll("[data-reveal]"),
    ) as HTMLElement[];
    const countEls = Array.from(
      root.querySelectorAll("[data-count]"),
    ) as HTMLElement[];
    const stickyBar = root.querySelector("[data-sticky]") as HTMLElement;
    const heroEnd = root.querySelector("[data-hero-end]") as HTMLElement;

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
      countEls.forEach((el) => {
        (el as any)._counted = true;
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

    const animateCount = (el: HTMLElement) => {
      const to = parseFloat(el.getAttribute("data-count") || "0");
      const pre = el.getAttribute("data-pre") || "";
      const suf = el.getAttribute("data-suf") || "";
      const duration = 1100;
      const start = performance.now();
      const ease = (p: number) => 1 - Math.pow(1 - p, 3);

      const step = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        el.textContent = pre + Math.round(ease(p) * to) + suf;
        if (p < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };

    const checkReveal = () => {
      const h = window.innerHeight || 800;
      revealEls.forEach((el) => {
        if (!(el as any)._shown && el.getBoundingClientRect().top < h * 0.9) {
          showEl(el);
        }
      });
      if (!reduce) {
        countEls.forEach((el) => {
          if (
            !(el as any)._counted &&
            el.getBoundingClientRect().top < h * 0.85
          ) {
            (el as any)._counted = true;
            animateCount(el);
          }
        });
      }
      if (stickyBar && heroEnd) {
        const past = heroEnd.getBoundingClientRect().top < 0;
        stickyBar.style.opacity = past ? "1" : "0";
        stickyBar.style.transform = past ? "none" : "translateY(20px)";
        stickyBar.style.pointerEvents = past ? "auto" : "none";
      }
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

  const ambientMotion: any = "Full";
  const off = ambientMotion === "Off";
  const sub = ambientMotion === "Subtle";

  const motionStyles = {
    floatMain: off
      ? "none"
      : sub
        ? "floatY 9s ease-in-out infinite"
        : "floatY 6.5s ease-in-out infinite",
    glowMain: off ? "none" : "glowPulse 6s ease-in-out infinite",
    kenBurns: off ? "none" : "kenBurns 16s ease-in-out infinite alternate",
    orbit: off ? "none" : "spin 26s linear infinite",
    blobA: off ? "none" : "blobDrift 9s ease-in-out infinite",
    blobB: off ? "none" : "blobDrift 11s ease-in-out infinite reverse",
    badgeA: off ? "none" : "floatYbig 5s ease-in-out infinite 0.3s",
    badgeB: off ? "none" : "floatY 5.6s ease-in-out infinite 0.8s",
    termFloat: off ? "none" : "floatY 6s ease-in-out infinite 1.1s",
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const router = useRouter();

  return (
    <div
      ref={rootRef}
      style={{
        width: "100%",
        fontFamily: "'IBM Plex Sans', sans-serif",
        background: "#ffffff",
      }}
    >
      <div>
        <HomeAnnouncementBar onOpenModal={() => router.push("/training")} />
        <HomeNavbar />
        <HeroSection
          typedWord={typedWord}
          seatsRemaining={seatsRemaining}
          motionStyles={motionStyles}
          onOpenModal={openModal}
        />
        <TechMarquee />
        <StatsBar />
        <HowItWorks />
        <TrainingTracks onOpenModal={openModal} />
        <BuiltInSupport />
        <WhyPathPalz />
        <FoundingCohortBanner onOpenModal={() => router.push("/training")} />
        <BottomCTA onOpenModal={() => router.push("/training")} />
        <HomeFooter />
      </div>

      <StickySeatsBar
        seatsRemaining={seatsRemaining}
        onOpenModal={() => router.push("/training")}
      />
      <DiscountModal
        modalOpen={modalOpen}
        dtype={dtype}
        setDtype={setDtype}
        onCloseModal={closeModal}
      />
    </div>
  );
}
