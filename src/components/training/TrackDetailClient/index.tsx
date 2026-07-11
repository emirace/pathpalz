"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useGetTracks, useGetTrackById } from "@/query/training/tracks";
import { useCheckout } from "@/query/training/payments";
import { useGetUser } from "@/query/auth";
import PaymentGatewayModal from "@/components/training/PaymentGatewayModal";
import WaitlistModal from "@/components/training/WaitlistModal";
import TrainingTopBar from "@/components/layout/SiteTopBar";
import TrainingPageFooter from "@/components/layout/SiteFooterBar";
import Link from "next/link";
import TrainingPaths from "./TrainingPaths";
import SpecializedTracks from "./SpecializedTracks";
import { useGetAllTrackTypes } from "@/query/admin/types";
import { useGetTypeSubTypes } from "@/query/admin/type-subs";
import { useSetting } from "@/states/setting";
import DiscountGenerateForm from "@/components/training/DiscountGenerateForm";
import { getApiErrorMessage, notify } from "@/utils/notify";
import { useGetDiscountCodeRule } from "@/query/training/discount";
import { getCurrencySymbol } from "@/utils/currency";

export default function TrackDetailClient() {
  const { slug } = useParams();
  const country = useSetting((state) => state.country);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discountView, setDiscountView] = useState<"enter" | "generate">(
    "enter",
  );
  const [discountCode, setDiscountCode] = useState("");

  const [guestData, setGuestData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    country: "",
    state: "",
    street: "",
    house_number: "",
    apartment_number: "",
  });
  const [selectedItem, setSelectedItem] = useState<{
    type: "training_track" | "type" | "sub_type";
    id: number;
  } | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const trainingPathsSectionRef = useRef<HTMLDivElement>(null);

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
    blobA: off ? "none" : "blobDrift 9s ease-in-out infinite",
    badgeA: off ? "none" : "floatYbig 5s ease-in-out infinite 0.3s",
    badgeB: off ? "none" : "floatY 5.6s ease-in-out infinite 0.8s",
  };

  const { data: discountRule } = useGetDiscountCodeRule(discountCode);
  const { data: user } = useGetUser();
  const { data: tracks, isLoading: isTracksLoading } = useGetTracks();

  const foundTrack = useMemo(() => {
    return tracks?.find((t) => t.slug === slug);
  }, [tracks, slug]);

  const { data: track, isLoading: isTrackLoading } = useGetTrackById(
    foundTrack?.slug || "",
  );

  const { data: typesRes } = useGetAllTrackTypes({
    track_id: String(track?.id || ""),
  });
  const types = typesRes?.data || [];

  const specializedType = types.find((t) =>
    t.title.toLowerCase().includes("specialized"),
  );

  const { data: subTypesRes } = useGetTypeSubTypes({
    type_id: String(specializedType?.id || ""),
  });
  const specializedSubTypes = subTypesRes?.data || [];

  const checkoutMutation = useCheckout();

  const selectedItemPrice = useMemo(() => {
    if (!selectedItem || !track) return null;

    if (selectedItem.type === "training_track") {
      const price = Number(track.price || 0);
      return Number.isFinite(price) ? price : 0;
    }

    if (selectedItem.type === "type") {
      const selectedType = types.find((type) => type.id === selectedItem.id);
      const price =
        country?.currency === "NGN"
          ? selectedType?.price_ngn
          : selectedType?.price_gbp;
      return Number(price || 0);
    }

    const selectedSubType = specializedSubTypes.find(
      (subType) => subType.id === selectedItem.id,
    );
    const price =
      country?.currency === "NGN"
        ? selectedSubType?.price_ngn
        : selectedSubType?.price_gbp;
    return Number(price || 0);
  }, [country?.currency, selectedItem, specializedSubTypes, track, types]);

  const discountPercentage = Number(discountRule?.rule?.percentage || 0);
  const discountedAmount =
    selectedItemPrice !== null && discountPercentage > 0
      ? Math.max(
          0,
          selectedItemPrice - (selectedItemPrice * discountPercentage) / 100,
        )
      : selectedItemPrice;
  const hasDiscountSummary = Boolean(
    discountCode.trim() && discountRule?.rule && selectedItemPrice !== null,
  );

  if (isTracksLoading || (foundTrack && isTrackLoading)) {
    return (
      <div className="min-h-screen bg-[#F3F3F8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen bg-[#F3F3F8] flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-[#00284F] mb-4">
          Track not found
        </h1>
        <Link href="/training" className="text-teal hover:underline">
          Return to training overview
        </Link>
      </div>
    );
  }

  const handleApply = (
    itemType: "training_track" | "type" | "sub_type",
    itemId: number,
  ) => {
    setSelectedItem({ type: itemType, id: itemId });
    if (user) {
      setDiscountView("enter");
      setDiscountCode("");
      setIsDiscountModalOpen(true);
    } else {
      setIsGuestModalOpen(true);
    }
  };

  const scrollToType = () => {
    requestAnimationFrame(() => {
      trainingPathsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestData.fullName || !guestData.email) return;
    setIsGuestModalOpen(false);
    setDiscountView("enter");
    setDiscountCode("");
    setIsDiscountModalOpen(true);
  };

  const handleDiscountContinue = () => {
    setIsDiscountModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handleGatewaySelect = (gateway: "stripe" | "paystack") => {
    if (!selectedItem) return;
    checkoutMutation.mutate(
      {
        track_id: track.id,
        item_type: selectedItem.type,
        item_id: selectedItem.id,
        gateway,
        priceType: country.code === "NG" ? "price_ngn" : "price_gbp",
        ...(discountCode.trim() ? { discount_code: discountCode.trim() } : {}),
        ...(!user
          ? {
              email: guestData.email,
              full_name: guestData.fullName,
              phoneNumber: guestData.phoneNumber,
              city: guestData.city,
              country: guestData.country,
              state: guestData.state,
              street: guestData.street,
              house_number: guestData.house_number,
              apartment_number: guestData.apartment_number,
            }
          : {}),
      },
      {
        onSuccess: (data) => {
          if (data.checkout_url) {
            window.location.href = data.checkout_url;
          }
        },
        onError: (error) => {
          notify.error(
            getApiErrorMessage(
              error,
              "Failed to initialize checkout. Please try again.",
            ),
          );
        },
      },
    );
  };

  const isOpen = track.status === "open";

  return (
    <div
      ref={rootRef}
      style={{ width: "100%", fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        <div>
          <TrainingTopBar
            mode="detail"
            track={{ id: track.id, title: track.title }}
            onReserveSeat={() => handleApply("training_track", track.id)}
          />

          {/* 3. Hero Section */}
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
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "clamp(22px,4vw,44px)",
                padding: "clamp(24px,4vw,44px) clamp(20px,4vw,52px)",
              }}
            >
              {/* Left column */}
              <div style={{ flex: "1 1 340px", minWidth: "min(100%,320px)" }}>
                <Link
                  href="/training"
                  className="hover:text-[#B5D4F4] transition-colors"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    font: "500 12px 'IBM Plex Mono',monospace",
                    color: "#85B7EB",
                    marginBottom: "16px",
                    opacity: 0,
                    animation: "fadeIn .5s ease both .1s",
                  }}
                >
                  ← Back to tracks
                </Link>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    font: "600 10px 'IBM Plex Mono',monospace",
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
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#4FB79A",
                      animation: "dotBlink 1.4s infinite",
                    }}
                  />
                  {isOpen ? "Enrolment open" : "Coming soon"}
                </div>
                <h1
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(30px,4.6vw,46px)",
                    lineHeight: 1.06,
                    letterSpacing: "-.022em",
                    color: "#fff",
                    marginBottom: "16px",
                    opacity: 0,
                    animation:
                      "fadeSlideUp .6s cubic-bezier(.22,1,.36,1) both .22s",
                  }}
                >
                  {track.title}
                </h1>
                <p
                  style={{
                    fontSize: "clamp(13px,1.5vw,15px)",
                    color: "#B5D4F4",
                    lineHeight: 1.65,
                    maxWidth: "460px",
                    marginBottom: "22px",
                    opacity: 0,
                    animation:
                      "fadeSlideUp .6s cubic-bezier(.22,1,.36,1) both .3s",
                  }}
                >
                  {track.description}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
                    gap: "12px 18px",
                    marginBottom: "24px",
                    opacity: 0,
                    animation: "fadeSlideUp .6s ease both .4s",
                  }}
                >
                  {[
                    "Lifetime access to content",
                    "Certificate of completion",
                    "Discord community access",
                    "Weekly live sessions",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "8px",
                          background: "rgba(133,183,235,.14)",
                          border: "1px solid rgba(133,183,235,.22)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          font: "600 13px 'IBM Plex Mono',monospace",
                          color: i === 3 ? "#4FB79A" : "#85B7EB",
                          flexShrink: 0,
                        }}
                      >
                        {i === 0 ? "∞" : i === 1 ? "✓" : i === 2 ? "◇" : "●"}
                      </span>
                      <span style={{ fontSize: "13px", color: "#DCEAF9" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    opacity: 0,
                    animation: "fadeSlideUp .6s ease both .5s",
                  }}
                >
                  {isOpen ? (
                    <button
                      onClick={() => scrollToType()}
                      className="hover:bg-[#2E74BE] hover:-translate-y-0.5 transition-all duration-150"
                      style={{
                        display: "inline-block",
                        font: "600 13.5px 'IBM Plex Sans',sans-serif",
                        background: "#185FA5",
                        color: "#fff",
                        padding: "12px 24px",
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 8px 22px rgba(24,95,165,.38)",
                      }}
                    >
                      Apply for this path
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsWaitlistModalOpen(true)}
                      className="hover:bg-[#2E74BE] hover:-translate-y-0.5 transition-all duration-150"
                      style={{
                        display: "inline-block",
                        font: "600 13.5px 'IBM Plex Sans',sans-serif",
                        background: "#185FA5",
                        color: "#fff",
                        padding: "12px 24px",
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 8px 22px rgba(24,95,165,.38)",
                      }}
                    >
                      Join waitlist
                    </button>
                  )}
                  <div
                    style={{
                      font: "500 11.5px 'IBM Plex Mono',monospace",
                      color: "#85B7EB",
                      marginTop: "10px",
                    }}
                  >
                    Application process takes under 2 minutes
                  </div>
                </div>
              </div>

              {/* Right column — matches design exactly */}
              <div
                style={{
                  flex: "1 1 320px",
                  minWidth: "min(100%,300px)",
                  position: "relative",
                  opacity: 0,
                  animation: "fadeIn .7s ease both .4s",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "clamp(140px,40%,200px)",
                    height: "clamp(140px,40%,200px)",
                    top: "-6%",
                    right: "2%",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle,rgba(79,183,154,.4),transparent 68%)",
                    filter: "blur(18px)",
                    animation: motionStyles.blobA,
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    animation: motionStyles.floatMain,
                  }}
                >
                  <div
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,.14)",
                      boxShadow:
                        "0 22px 60px rgba(0,0,0,.35),0 0 0 1px rgba(255,255,255,.07)",
                      animation: motionStyles.glowMain,
                      aspectRatio: "16/10",
                      background: "#08192B",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        animation: motionStyles.kenBurns,
                      }}
                    >
                      <img
                        src="/track.png"
                        alt="PathPalz Mockup"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  {/* Badge A — dark bg "npm run deploy" (matches design) */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-14px",
                      left: "-16px",
                      background: "#042C53",
                      border: "1px solid rgba(133,183,235,.3)",
                      borderRadius: "11px",
                      padding: "8px 12px",
                      boxShadow: "0 12px 28px rgba(0,0,0,.32)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      animation: motionStyles.badgeA,
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#1D9E75",
                        animation: "dotBlink 1.4s infinite",
                      }}
                    />
                    <span
                      style={{
                        font: "600 11px 'IBM Plex Mono',monospace",
                        color: "#DCEAF9",
                      }}
                    >
                      npm run deploy
                    </span>
                  </div>

                  {/* Badge B — white bg "Zero → job-ready / 16 weeks live" (matches design) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-14px",
                      right: "-14px",
                      background: "#fff",
                      borderRadius: "11px",
                      padding: "8px 13px",
                      boxShadow: "0 12px 28px rgba(0,0,0,.3)",
                      animation: motionStyles.badgeB,
                    }}
                  >
                    <div
                      style={{
                        font: "500 9px 'IBM Plex Mono',monospace",
                        color: "#8A8981",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        marginBottom: "2px",
                      }}
                    >
                      Zero → job-ready
                    </div>
                    <div
                      style={{
                        font: "600 14px 'Space Grotesk',sans-serif",
                        color: "#042C53",
                      }}
                    >
                      16 weeks live
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Training Paths (Types) — API data */}
          <div
            ref={trainingPathsSectionRef}
            style={{ scrollMarginTop: "90px" }}
          >
            <TrainingPaths
              trackId={String(track.id)}
              trackTitle={track.title}
              onApply={handleApply}
              slug={slug as string}
              isOpen={isOpen}
              onJoinWaitlist={() => setIsWaitlistModalOpen(true)}
            />
          </div>

          {/* 5. Specialized Tracks Deep Dive — API data */}
          <div id="sub_types" style={{ scrollMarginTop: "20px" }}>
            <SpecializedTracks
              trackId={String(track.id)}
              onApply={handleApply}
              isOpen={isOpen}
              onJoinWaitlist={() => setIsWaitlistModalOpen(true)}
            />
          </div>

          {/* 6. What you'll achieve + Prerequisites */}
          <div
            style={{
              background: "#F5F3EC",
              backgroundImage:
                "radial-gradient(rgba(15,110,86,.05) 1px,transparent 1px),radial-gradient(circle at 0% 0%,rgba(15,110,86,.06),transparent 44%)",
              backgroundSize: "22px 22px,100% 100%",
              padding: "clamp(32px,4vw,54px) clamp(20px,4vw,52px)",
              borderBottom: "1px solid #E7E4DB",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                gap: "28px",
              }}
            >
              <div data-reveal="">
                <div
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(18px,2.4vw,24px)",
                    color: "#2C2C2A",
                    marginBottom: "18px",
                  }}
                >
                  What you'll achieve
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {[
                    {
                      icon: "◆",
                      title: "Industry Readiness",
                      body: "Exit with the skills to immediately contribute to real production codebases.",
                    },
                    {
                      icon: "▸",
                      title: "Production Portfolio",
                      body: "Ship a real, working full-stack application deployed live on the internet.",
                    },
                    {
                      icon: "◎",
                      title: "Network & Community",
                      body: "Connect with peers and mentors in our dedicated Discord channels.",
                    },
                    {
                      icon: "↗",
                      title: "Career Velocity",
                      body: "Position yourself for developer roles with a portfolio that proves what you can build.",
                    },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "13px" }}>
                      <span
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          background: "#E6F1FB",
                          color: "#0C447C",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          font: "600 15px 'IBM Plex Mono',monospace",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <div
                          style={{
                            font: "600 14px 'IBM Plex Sans',sans-serif",
                            color: "#2C2C2A",
                            marginBottom: "2px",
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontSize: "12.5px",
                            color: "#5F5E5A",
                            lineHeight: 1.5,
                          }}
                        >
                          {item.body}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div data-reveal="" data-reveal-delay="0.1">
                <div
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(18px,2.4vw,24px)",
                    color: "#2C2C2A",
                    marginBottom: "18px",
                  }}
                >
                  Prerequisites
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "13px",
                    marginBottom: "22px",
                  }}
                >
                  {[
                    "Basic computer literacy",
                    "Standard laptop or desktop",
                    "Reliable internet access",
                    "12+ hours per week commitment",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "11px",
                        fontSize: "13.5px",
                        color: "#2C2C2A",
                      }}
                    >
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          background: "#E1F5EE",
                          color: "#0F6E56",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #E7E4DB",
                    borderRadius: "12px",
                    padding: "18px",
                  }}
                >
                  <div
                    style={{
                      font: "600 13.5px 'IBM Plex Sans',sans-serif",
                      color: "#2C2C2A",
                      marginBottom: "12px",
                    }}
                  >
                    Questions about this track?
                  </div>
                  <button
                    onClick={() => handleApply("training_track", track.id)}
                    className="hover:bg-[#F1EFE8] transition-colors duration-150"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      font: "600 12.5px 'IBM Plex Sans',sans-serif",
                      background: "#fff",
                      color: "#042C53",
                      padding: "11px",
                      borderRadius: "9px",
                      border: "1px solid #C9CFD6",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    ◇ Speak to an Advisor
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 7. CTA */}
          <div
            style={{
              background: "#185FA5",
              padding: "clamp(30px,4vw,48px) clamp(20px,4vw,52px)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,.28) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                opacity: 0.14,
                pointerEvents: "none",
              }}
            />
            <div data-reveal="" style={{ position: "relative" }}>
              <div
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(20px,2.8vw,28px)",
                  color: "#fff",
                  marginBottom: "16px",
                  letterSpacing: "-.01em",
                }}
              >
                Ready to build your first real application?
              </div>
              {isOpen ? (
                <button
                  onClick={() => scrollToType()}
                  className="hover:-translate-y-0.5 transition-all duration-150"
                  style={{
                    display: "inline-block",
                    font: "600 13.5px 'IBM Plex Sans',sans-serif",
                    background: "#fff",
                    color: "#0C447C",
                    padding: "12px 26px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 10px 26px rgba(0,0,0,.18)",
                  }}
                >
                  Apply for this path
                </button>
              ) : (
                <button
                  onClick={() => setIsWaitlistModalOpen(true)}
                  className="hover:-translate-y-0.5 transition-all duration-150"
                  style={{
                    display: "inline-block",
                    font: "600 13.5px 'IBM Plex Sans',sans-serif",
                    background: "#fff",
                    color: "#0C447C",
                    padding: "12px 26px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 10px 26px rgba(0,0,0,.18)",
                  }}
                >
                  Join waitlist
                </button>
              )}
            </div>
          </div>

          <TrainingPageFooter />
        </div>
      </div>

      <PaymentGatewayModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSelect={handleGatewaySelect}
        isSubmitting={checkoutMutation.isPending}
      />

      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
        trackId={track.id}
        trackTitle={track.title}
      />

      {/* Discount Code Modal */}
      {isDiscountModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            background: "rgba(2, 16, 33, 0.72)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "overlayIn 0.2s ease both",
          }}
          onClick={() => setIsDiscountModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "440px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 40px 90px rgba(0,0,0,0.4)",
              animation:
                "scaleIn 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) both 0.06s",
            }}
          >
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
              <div
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#2C2C2A",
                }}
              >
                {discountView === "enter"
                  ? "Apply a discount code"
                  : "Generate a discount code"}
              </div>
              <button
                onClick={() => setIsDiscountModalOpen(false)}
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

            <div style={{ padding: "20px" }}>
              <div
                style={{
                  background: "#F4F9FE",
                  border: "1px solid #DCE9F6",
                  borderRadius: "9px",
                  padding: "11px 14px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    font: "600 13.5px 'IBM Plex Sans',sans-serif",
                    color: "#0C447C",
                  }}
                >
                  {track.title}
                </div>
                <div
                  style={{
                    font: "500 11px 'IBM Plex Mono',monospace",
                    color: "#5F7C99",
                    marginTop: "3px",
                  }}
                >
                  August 2025 · {track.duration_weeks} weeks · Original:{" "}
                  {getCurrencySymbol(country?.currency)}
                  {selectedItemPrice?.toLocaleString()}
                </div>
              </div>

              {discountView === "enter" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        font: "600 12px 'IBM Plex Sans',sans-serif",
                        color: "#5F5E5A",
                        marginBottom: "6px",
                        display: "block",
                      }}
                    >
                      Discount code (if you already have one)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. STUDENT-2025-XXXX"
                      value={discountCode}
                      onChange={(e) =>
                        setDiscountCode(e.target.value.toUpperCase())
                      }
                      style={{
                        width: "100%",
                        font: "400 13px 'IBM Plex Mono',monospace",
                        padding: "10px 12px",
                        borderRadius: "9px",
                        border: "1px solid #D3D1C7",
                        background: "#fff",
                        color: "#2C2C2A",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      margin: "8px 0",
                      color: "#8A8981",
                    }}
                  >
                    <div
                      style={{ flex: 1, height: "1px", background: "#EDEBE3" }}
                    />
                    <div
                      style={{
                        font: "500 11.5px 'IBM Plex Mono',monospace",
                      }}
                    >
                      or generate a new code
                    </div>
                    <div
                      style={{ flex: 1, height: "1px", background: "#EDEBE3" }}
                    />
                  </div>
                  <div
                    onClick={() => setDiscountView("generate")}
                    style={{
                      border: "1px solid #E4E2DA",
                      background: "#fff",
                      borderRadius: "10px",
                      padding: "11px 13px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        font: "600 13.5px 'IBM Plex Sans',sans-serif",
                        color: "#2C2C2A",
                      }}
                    >
                      Generate Student/School/Bespoke Code
                    </div>
                    <div
                      style={{
                        fontSize: "11.5px",
                        color: "#8A8981",
                        lineHeight: 1.45,
                        marginTop: "3px",
                      }}
                    >
                      Secondary school, college or university students, school
                      groups, and occasion campaigns. Click here to verify and
                      generate.
                    </div>
                  </div>
                  {hasDiscountSummary && (
                    <div
                      style={{
                        background: "#E1F5EE",
                        border: "1px solid #9FE1CB",
                        borderRadius: "10px",
                        padding: "12px 14px",
                        marginTop: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "13px",
                          color: "#085041",
                          marginBottom: "4px",
                        }}
                      >
                        <span>Original Price</span>
                        <span style={{ fontWeight: 600 }}>
                          {getCurrencySymbol(country?.currency)}
                          {selectedItemPrice?.toLocaleString()}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "13px",
                          color: "#085041",
                          marginBottom: "4px",
                        }}
                      >
                        <span>Discount</span>
                        <span style={{ fontWeight: 600 }}>
                          -{discountPercentage}%
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "14px",
                          color: "#04342C",
                          borderTop: "1px dashed #9FE1CB",
                          paddingTop: "6px",
                          marginTop: "6px",
                          fontWeight: 700,
                        }}
                      >
                        <span>Discounted Price</span>
                        <span>
                          {getCurrencySymbol(country?.currency)}
                          {discountedAmount?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <DiscountGenerateForm
                    defaultEmail={user?.email ?? guestData.email ?? ""}
                    onSuccess={(code) => {
                      setDiscountCode(code);
                      setDiscountView("enter");
                    }}
                  />
                </div>
              )}
            </div>

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
              }}
            >
              {discountView === "generate" ? (
                <button
                  onClick={() => setDiscountView("enter")}
                  style={{
                    font: "500 12px 'IBM Plex Sans',sans-serif",
                    color: "#185FA5",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "9px",
                  }}
                >
                  ← Back to enter code
                </button>
              ) : (
                <button
                  onClick={handleDiscountContinue}
                  style={{
                    font: "500 12px 'IBM Plex Sans',sans-serif",
                    color: "#8A8981",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "9px",
                  }}
                >
                  No discount — continue
                </button>
              )}
              {discountView === "enter" && (
                <button
                  onClick={handleDiscountContinue}
                  style={{
                    flex: "1 1 auto",
                    font: "600 13px 'IBM Plex Sans',sans-serif",
                    background: "#185FA5",
                    color: "#fff",
                    padding: "11px 14px",
                    borderRadius: "9px",
                    border: "none",
                    cursor: "pointer",
                    transition: "background .15s",
                  }}
                >
                  {discountCode.trim() ? "Apply & Continue →" : "Continue →"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Guest Checkout Modal */}
      {isGuestModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            background: "rgba(2, 16, 33, 0.72)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "overlayIn 0.2s ease both",
          }}
          onClick={() => setIsGuestModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "440px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 40px 90px rgba(0,0,0,0.4)",
              animation:
                "scaleIn 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) both 0.06s",
            }}
          >
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
              <div
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#2C2C2A",
                }}
              >
                Guest Checkout
              </div>
              <button
                onClick={() => setIsGuestModalOpen(false)}
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

            <form
              onSubmit={handleGuestSubmit}
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {[
                {
                  label: "Full Name",
                  field: "fullName",
                  type: "text",
                  placeholder: "John Doe",
                  required: true,
                },
                {
                  label: "Email Address",
                  field: "email",
                  type: "email",
                  placeholder: "john@example.com",
                  required: true,
                },
                {
                  label: "Phone Number",
                  field: "phoneNumber",
                  type: "tel",
                  placeholder: "e.g. +44 7123 456789 or +234 80 1234 5678",
                  required: true,
                },
              ].map(({ label, field, type, placeholder, required }) => (
                <div key={field}>
                  <label
                    style={{
                      font: "600 12px 'IBM Plex Sans',sans-serif",
                      color: "#5F5E5A",
                      marginBottom: "6px",
                      display: "block",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    value={(guestData as any)[field]}
                    onChange={(e) =>
                      setGuestData({ ...guestData, [field]: e.target.value })
                    }
                    style={{
                      width: "100%",
                      font: "400 13px 'IBM Plex Sans', sans-serif",
                      padding: "10px 12px",
                      borderRadius: "9px",
                      border: "1px solid #D3D1C7",
                      background: "#fff",
                      color: "#2C2C2A",
                    }}
                  />
                </div>
              ))}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                {[
                  {
                    label: "Country",
                    field: "country",
                    placeholder: "e.g. United Kingdom",
                  },
                  {
                    label: "State / Region",
                    field: "state",
                    placeholder: "e.g. London",
                  },
                  { label: "City", field: "city", placeholder: "e.g. London" },
                  {
                    label: "Street Address",
                    field: "street",
                    placeholder: "e.g. High Street",
                  },
                  {
                    label: "House Number",
                    field: "house_number",
                    placeholder: "e.g. 42",
                  },
                  {
                    label: "Apartment (Optional)",
                    field: "apartment_number",
                    placeholder: "e.g. Flat 4",
                    optional: true,
                  },
                ].map(({ label, field, placeholder, optional }) => (
                  <div key={field}>
                    <label
                      style={{
                        font: "600 12px 'IBM Plex Sans',sans-serif",
                        color: "#5F5E5A",
                        marginBottom: "6px",
                        display: "block",
                      }}
                    >
                      {label}
                    </label>
                    <input
                      type="text"
                      required={!optional}
                      placeholder={placeholder}
                      value={(guestData as any)[field]}
                      onChange={(e) =>
                        setGuestData({ ...guestData, [field]: e.target.value })
                      }
                      style={{
                        width: "100%",
                        font: "400 13px 'IBM Plex Sans', sans-serif",
                        padding: "10px 12px",
                        borderRadius: "9px",
                        border: "1px solid #D3D1C7",
                        background: "#fff",
                        color: "#2C2C2A",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: "14px 0 0 0",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="submit"
                  style={{
                    flex: "1 1 auto",
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
                  Continue to Discount Selection →
                </button>
              </div>

              <div style={{ textAlign: "center", paddingTop: "8px" }}>
                <p style={{ fontSize: "13px", color: "#8A8981" }}>
                  Already have an account?{" "}
                  <Link
                    href={`/login?redirect=/training/${slug}`}
                    style={{
                      textDecoration: "none",
                      color: "#185FA5",
                      fontWeight: 600,
                    }}
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
