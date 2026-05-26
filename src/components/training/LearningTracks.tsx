"use client";

import { useGetTracks } from "@/query/training/tracks";
import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface ITrackStaticData {
  icon: ReactNode;
  level: string;
}

const STATIC_TRACK_DATA: Record<string, ITrackStaticData> = {
  "software-development": {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-teal"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    level: "Beginner to advanced",
  },
  "data-ai": {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-400"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M12 12v4" />
        <path d="M8 21a4 4 0 018 0" />
        <path d="M9 9.5A3 3 0 0115 9" />
      </svg>
    ),
    level: "Beginner welcome",
  },
  devops: {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-400"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <polyline points="7 8 10 11 7 14" />
      </svg>
    ),
    level: "Beginner welcome",
  },
};

const DEFAULT_ICON = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-teal"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

interface LearningTracksProps {}

const LearningTracks = ({}: LearningTracksProps) => {
  const { data: tracks, isLoading } = useGetTracks();

  if (isLoading) {
    return (
      <section className="py-20 bg-[#F3F3F8]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="learning_tracks" className="py-20 bg-[#F3F3F8]">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold font-manrope text-[#00284F]">
              Learning Tracks
            </h2>
            <p className="text-[#424750] text-base">
              Precision-engineered curricula for the modern industry.
            </p>
          </div>
          <div className="hidden sm:block w-24 h-1 bg-teal rounded-full mt-3 shrink-0" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks?.map((track) => {
            const isOpen = track.status === "open";
            const staticData = STATIC_TRACK_DATA[track.slug] || {
              icon: DEFAULT_ICON,
              level: "Beginner welcome",
            };

            return (
              <div
                key={track.id}
                className="bg-white rounded-2xl p-7 flex flex-col space-y-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                {/* Status Badge */}
                <div
                  className={`absolute top-5 right-5 text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full ${
                    isOpen
                      ? "bg-[#00677D] text-white"
                      : "bg-[#023A6E] text-white"
                  }`}
                >
                  {isOpen ? "Open Now" : "Coming Soon"}
                </div>

                {/* Icon */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                    isOpen ? "bg-teal/10" : "bg-gray-100"
                  }`}
                >
                  {staticData.icon}
                </div>

                <div className="space-y-3 flex-1">
                  <Link
                    href={`/training/${track.slug}`}
                    className={`text-xl font-bold font-manrope hover:text-teal transition-colors flex items-center gap-2 ${
                      isOpen ? "text-[#00284F]" : "text-[#424750]"
                    }`}
                  >
                    {track.title}
                    {/* <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" /> */}
                  </Link>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2 text-sm text-[#424750]">
                      <svg
                        className="w-4 h-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {track.duration_weeks} weeks
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#424750]">
                      <svg
                        className="w-4 h-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                      {staticData.level}
                    </li>
                  </ul>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  {parseInt(track.price) > 0 ? (
                    <span
                      className={`text-2xl font-extrabold font-manrope ${
                        isOpen ? "text-[#00284F]" : "text-[#737781]"
                      }`}
                    >
                      £{parseInt(track.price)}
                    </span>
                  ) : (
                    <span
                      className={` font-extrabold font-manrope ${
                        isOpen ? "text-[#00284F]" : "text-[#737781]"
                      }`}
                    >
                      View details
                    </span>
                  )}

                  <Link
                    href={`/training/${track.slug}`}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00284F]/5 hover:bg-[#00284F]/10 transition-colors text-[#00284F]"
                    aria-label={`${isOpen ? "Apply" : "Join Waitlist"} for ${track.title}`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LearningTracks;
