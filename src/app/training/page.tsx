"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TrainingHero from "@/components/training/TrainingHero";
import WhyPathPalz from "@/components/training/WhyPathPalz";
import LearningTracks from "@/components/training/LearningTracks";
import PathToMastery from "@/components/training/PathToMastery";
import HighPerformanceRhythm from "@/components/training/HighPerformanceRhythm";
import SupportSystem from "@/components/training/SupportSystem";
import TransparentPricing from "@/components/training/TransparentPricing";
import ReadyToStart from "@/components/training/ReadyToStart";
import FAQ from "@/components/training/FAQ";
import { useTraining } from "@/context/TrainingContext";
import { useGetUser } from "@/query/auth";

export default function TrainingPage() {
  const router = useRouter();
  const { openModal } = useTraining();
  const { data: user } = useGetUser();

  const handleAuthRedirect = (
    type: "apply" | "waitlist",
    trackId?: string | number,
  ) => {
    // if (user) {
    openModal(type, trackId);
    // } else {
    // router.push("/login");
    // }
  };

  return (
    <div className="flex flex-col">
      <TrainingHero
        onApply={() => handleAuthRedirect("apply")}
        onWaitlist={() => handleAuthRedirect("waitlist")}
      />
      <WhyPathPalz />
      <LearningTracks />
      <PathToMastery />
      <HighPerformanceRhythm />
      <SupportSystem />
      <TransparentPricing
        onApply={(trackId) => handleAuthRedirect("apply", trackId)}
        onWaitlist={(trackId) => handleAuthRedirect("waitlist", trackId)}
      />
      <ReadyToStart onApply={() => handleAuthRedirect("apply")} />
      <FAQ />
    </div>
  );
}
