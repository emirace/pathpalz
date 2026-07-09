"use client";

import { useGetTracks } from "@/query/training/tracks";
import Link from "next/link";

interface Props {
  onOpenModal: () => void;
}

interface TrackTheme {
  background: string;
  badgeBg: string;
  badgeText: string;
  titleColor: string;
  descColor: string;
  borderColor: string;
  bottomBg: string;
  bottomText: string;
  btnColor: string;
}

const DEFAULT_THEME: TrackTheme = {
  background: "#F1EFE8",
  badgeBg: "#D3D1C7",
  badgeText: "#444441",
  titleColor: "#2C2C2A",
  descColor: "#5F5E5A",
  borderColor: "#E0DED4",
  bottomBg: "#F8F7F1",
  bottomText: "#7A7970",
  btnColor: "#5F5E5A",
};

const TRACK_THEMES: Record<string, TrackTheme> = {
  "software-development": {
    background: "#E6F1FB",
    badgeBg: "#B5D4F4",
    badgeText: "#0C447C",
    titleColor: "#042C53",
    descColor: "#185FA5",
    borderColor: "#DCE9F6",
    bottomBg: "#F4F9FE",
    bottomText: "#5F7C99",
    btnColor: "#185FA5",
  },
  "devops-engineering": {
    background: "#EAF3DE",
    badgeBg: "#C0DD97",
    badgeText: "#27500A",
    titleColor: "#173404",
    descColor: "#3B6D11",
    borderColor: "#D9E7C5",
    bottomBg: "#F6FAEF",
    bottomText: "#5F7A44",
    btnColor: "#3B6D11",
  },
  "data-science-ai": {
    background: "#F1EFE8",
    badgeBg: "#D3D1C7",
    badgeText: "#444441",
    titleColor: "#2C2C2A",
    descColor: "#5F5E5A",
    borderColor: "#E0DED4",
    bottomBg: "#F8F7F1",
    bottomText: "#7A7970",
    btnColor: "#5F5E5A",
  },
};

const THEME_LIST = [
  TRACK_THEMES["software-development"],
  TRACK_THEMES["devops-engineering"],
  TRACK_THEMES["data-science-ai"],
];

const getTrackTheme = (slug: string, index: number): TrackTheme => {
  if (TRACK_THEMES[slug]) return TRACK_THEMES[slug];
  return THEME_LIST[index % THEME_LIST.length] || DEFAULT_THEME;
};

const SkeletonCard = () => (
  <div
    className="animate-pulse"
    style={{
      borderRadius: "14px",
      border: "1px solid #E7E4DB",
      height: "170px",
      background: "#F1EFE8",
    }}
  />
);

export function TrainingTracks({ onOpenModal }: Props) {
  const { data: tracks, isLoading } = useGetTracks();

  return (
    <div
      style={{
        background: "#fff",
        backgroundImage: "radial-gradient(rgba(24,95,165,.04) 1px,transparent 1px),radial-gradient(circle at 0% 100%,rgba(24,95,165,.07),transparent 42%)",
        backgroundSize: "24px 24px,100% 100%",
        padding: "clamp(30px,4vw,52px) clamp(20px,4vw,52px)",
        borderBottom: "1px solid #E7E4DB",
      }}
    >
      <div data-reveal="" style={{ font: "500 11px 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#8A8981", textTransform: "uppercase", marginBottom: "8px" }}>// Training tracks</div>
      <div data-reveal="" data-reveal-delay="0.05" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(20px,2.8vw,28px)", color: "#2C2C2A", marginBottom: "6px", letterSpacing: "-.01em" }}>Choose your path. Start in August.</div>
      <div data-reveal="" data-reveal-delay="0.1" style={{ fontSize: "14px", color: "#5F5E5A", lineHeight: 1.6, maxWidth: "540px", marginBottom: "24px" }}>Two tracks open for August. Data Science &amp; AI opens September — join the waitlist to lock in early-access pricing.</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "14px" }}>
        {isLoading
          ? [1, 2, 3].map((i) => <SkeletonCard key={i} />)
          : tracks?.map((track, index) => {
              const isOpen = track.status === "open";
              const theme = getTrackTheme(track.slug, index);
              const badgeLabel = isOpen
                ? "OPEN NOW"
                : track.slug === "data-science-ai"
                ? "SEPTEMBER"
                : "COMING SOON";

              return (
                <div
                  key={track.id}
                  data-reveal=""
                  className="hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(4,44,83,.14)] transition-all duration-[220ms]"
                  style={{
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid #E7E4DB",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ padding: "18px", background: theme.background, flex: 1 }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        font: "600 10px 'IBM Plex Mono',monospace",
                        background: theme.badgeBg,
                        color: theme.badgeText,
                        padding: "3px 9px",
                        borderRadius: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: isOpen ? "#0F6E56" : "#8A8981",
                        }}
                      />
                      {badgeLabel}
                    </div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "17px", color: theme.titleColor, marginBottom: "5px" }}>
                      {track.title}
                    </div>
                    <div style={{ fontSize: "12.5px", color: theme.descColor, lineHeight: 1.55 }}>
                      {track.description}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "12px 18px",
                      borderTop: `1px solid ${theme.borderColor}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: theme.bottomBg,
                    }}
                  >
                    <span style={{ font: "500 11px 'IBM Plex Mono',monospace", color: theme.bottomText }}>
                      {track.duration_weeks} weeks · beginner
                    </span>
                    <Link
                      href={`/training/${track.slug}`}
                      style={{
                        font: "600 12px 'IBM Plex Sans',sans-serif",
                        color: theme.btnColor,
                        textDecoration: "none",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {isOpen ? "View track →" : "Join waitlist →"}
                    </Link>
                  </div>
                </div>
              );
            })}
      </div>

      {/* Discount Banner */}
      <div data-reveal="" style={{ marginTop: "20px", background: "#E1F5EE", border: "1px solid #9FE1CB", borderRadius: "13px", padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ maxWidth: "600px" }}>
          <div style={{ font: "600 14px 'IBM Plex Sans',sans-serif", color: "#04342C", marginBottom: "3px" }}>Student, school, or occasion discount?</div>
          <div style={{ fontSize: "12.5px", color: "#085041", lineHeight: 1.55 }}>Three discount types — student, school group, and bespoke occasion codes. Generate yours in seconds at checkout.</div>
        </div>
        <button onClick={onOpenModal} className="hover:bg-[#0B5A46] hover:-translate-y-0.5 transition-all duration-150" style={{ font: "600 12.5px 'IBM Plex Sans',sans-serif", background: "#0F6E56", color: "#fff", padding: "10px 18px", borderRadius: "9px", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>See how discounts work →</button>
      </div>
    </div>
  );
}
