"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useGetTracks } from "@/query/training/tracks";

interface ITrackStaticMetadata {
  features: string[];
  popular: boolean;
}

const STATIC_METADATA: Record<string, ITrackStaticMetadata> = {
  "software-development": {
    popular: true,
    features: [
      "16-Week Intensive Curriculum",
      "Dedicated Peer Partner",
      "24/7 Access to Learning Platform",
    ],
  },
  "data-ai": {
    popular: false,
    features: [
      "14-Week Specialist Curriculum",
      "AI Model Training Labs",
      "Data Visualization Projects",
    ],
  },
  devops: {
    popular: false,
    features: [
      "14-Week Infrastructure Mastery",
      "Cloud Deployment Workflows",
      "Docker & Kubernetes Basics",
    ],
  },
};

interface TransparentPricingProps {
  onApply: () => void;
  onWaitlist: () => void;
}

const TransparentPricing = ({ onApply, onWaitlist }: TransparentPricingProps) => {
  const { data: tracks, isLoading } = useGetTracks();

  if (isLoading) {
    return (
      <section className="py-24 bg-[#F3F3F8]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#F3F3F8]">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold font-manrope text-[#00284F]">
            Transparent Pricing
          </h2>
          <p className="text-gray-500 text-lg">
            Simple, upfront costs. No hidden subscription traps.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {tracks?.map((track) => {
            const metadata = STATIC_METADATA[track.slug] || {
              popular: false,
              features: [
                `${track.duration_weeks}-Week Specialized Curriculum`,
                "Practical Hands-on Projects",
                "Community Support Access",
              ],
            };
            const isOpen = track.status === "open";

            return (
              <div
                key={track.id}
                className={`relative flex flex-col bg-white rounded-2xl transition-all duration-300 ${
                  metadata.popular
                    ? "border-2 border-[#00677D] shadow-xl shadow-[#00677D]/10 "
                    : "border border-gray-200 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Popular Badge */}
                {metadata.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4">
                    <span className="bg-[#00677D] text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap shadow-sm">
                      POPULAR CHOICE
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col grow">
                  {/* Plan Title */}
                  <h3 className="text-[22px] font-bold font-manrope text-[#00284F] mb-4">
                    {track.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-extrabold font-manrope text-[#00284F] tracking-tight">
                      £{track.price}
                    </span>
                    <span className="text-gray-500 font-medium ml-2">
                      {isOpen ? "total" : "starting"}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-10 grow">
                    {metadata.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2
                          className={`w-5 h-5 mr-3 shrink-0 mt-0.5 ${
                            metadata.popular ? "text-[#00677D]" : "text-gray-400"
                          }`}
                          strokeWidth={2}
                        />
                        <span className="text-[#424750] text-[15px] leading-tight">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <button
                    onClick={isOpen ? onApply : onWaitlist}
                    className={`w-full flex justify-center items-center h-14 rounded-xl font-bold transition-all duration-200 cursor-pointer ${
                      metadata.popular
                        ? "bg-[#032042] text-white hover:bg-[#032042]/90 shadow-md"
                        : "bg-white text-[#00284F] border border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {isOpen ? "Apply Now" : "Join Waitlist"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TransparentPricing;
