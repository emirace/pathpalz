"use client";

interface MotionStyles {
  floatMain: string;
  glowMain: string;
  kenBurns: string;
  orbit: string;
  blobA: string;
  blobB: string;
  badgeA: string;
  badgeB: string;
  termFloat: string;
}

interface Props {
  typedWord: string;
  seatsRemaining: number;
  motionStyles: MotionStyles;
  onOpenModal: () => void;
}

export function HeroSection({ typedWord, seatsRemaining, motionStyles, onOpenModal }: Props) {
  return (
    <div
      style={{
        background: "#042C53",
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          "radial-gradient(circle at 84% 12%, rgba(24,95,165,0.5), transparent 44%), radial-gradient(circle at 4% 96%, rgba(29,110,90,0.26), transparent 40%)",
      }}
    >
      {/* Animated Grid Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(133,183,235,0.35) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.13,
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
          gap: "clamp(22px, 4vw, 48px)",
          padding: "clamp(28px, 4.5vw, 52px) clamp(20px, 4vw, 52px) clamp(20px, 3vw, 34px)",
        }}
      >
        {/* Left side content */}
        <div style={{ flex: "1 1 340px", minWidth: "min(100%, 320px)" }}>
          <div
            style={{
              font: "500 11px 'IBM Plex Mono', monospace",
              color: "#85B7EB",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              marginBottom: "18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              opacity: 0,
              animation: "slideDown .5s ease both .1s",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4FB79A",
                boxShadow: "0 0 0 3px rgba(79,183,154,0.28)",
                animation: "dotBlink 1.4s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            PathPalz · August 2025 cohort
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 5.4vw, 56px)",
              lineHeight: 1.04,
              letterSpacing: "-.024em",
              color: "#fff",
              marginBottom: "18px",
            }}
          >
            <span
              style={{
                display: "block",
                color: "#fff",
                opacity: 0,
                animation: "fadeSlideUp .6s cubic-bezier(.22,1,.36,1) both .18s",
              }}
            >
              Zero experience.
            </span>
            <span
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                opacity: 0,
                animation: "fadeSlideUp .7s cubic-bezier(.22,1,.36,1) both .3s",
              }}
            >
              <span>Real&nbsp;</span>
              <span
                style={{
                  background: "linear-gradient(100deg, #85B7EB, #fff 45%, #4FB79A)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  whiteSpace: "pre",
                }}
              >
                {typedWord}
              </span>
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: ".05em",
                  height: ".9em",
                  margin: "0 .02em 0 .05em",
                  transform: "translateY(.08em)",
                  background: "#5FA8E8",
                  borderRadius: "1px",
                  animation: "caret 1s step-end infinite",
                }}
              />
              <span style={{ color: "#4FB79A" }}>.</span>
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(13px, 1.55vw, 15.5px)",
              color: "#B5D4F4",
              lineHeight: 1.65,
              maxWidth: "600px",
              marginBottom: "22px",
              opacity: 0,
              animation: "cascadeUp .7s cubic-bezier(.22,1,.36,1) both .6s",
            }}
          >
            Live cohort training that turns complete beginners and career-changers into job-ready
            developers and DevOps engineers — with a dedicated peer partner, weekly
            accountability, and a real project shipped every single week.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "16px",
              opacity: 0,
              animation: "cascadeUp .6s ease both .72s",
            }}
          >
            <button
              onClick={onOpenModal}
              className="hover:bg-[#2E74BE] hover:-translate-y-0.5 transition-all duration-150"
              style={{
                font: "600 13.5px 'IBM Plex Sans', sans-serif",
                background: "#185FA5",
                color: "#fff",
                padding: "12px 22px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 22px rgba(24,95,165,.38)",
              }}
            >
              Secure my August seat
            </button>
            <button
              className="hover:bg-white/8 transition-colors duration-150"
              style={{
                font: "600 13.5px 'IBM Plex Sans', sans-serif",
                color: "#DCEAF9",
                padding: "12px 22px",
                borderRadius: "10px",
                border: "1px solid rgba(133,183,235,0.4)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Download curriculum
            </button>
          </div>

          <div
            style={{
              font: "500 12px 'IBM Plex Mono', monospace",
              color: "#85B7EB",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              opacity: 0,
              animation: "fadeIn .6s ease both .9s",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#1D9E75",
                boxShadow: "0 0 0 3px rgba(29,158,117,0.25)",
                animation: "dotBlink 1.4s ease-in-out infinite",
              }}
            />
            30 seats per cohort — {seatsRemaining} remaining · enrolment closes 28 July
          </div>
        </div>

        {/* Right side animated graphics */}
        <div
          style={{
            flex: "1 1 300px",
            minWidth: "min(100%, 290px)",
            position: "relative",
            minHeight: "clamp(280px, 32vw, 380px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            animation: "fadeIn .8s ease both .45s",
          }}
        >
          {/* Blur Blobs */}
          <div
            style={{
              position: "absolute",
              width: "clamp(150px, 42%, 220px)",
              height: "clamp(150px, 42%, 220px)",
              top: 0,
              right: "4%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(79,183,154,0.5), transparent 68%)",
              filter: "blur(16px)",
              animation: motionStyles.blobA,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "clamp(120px, 34%, 180px)",
              height: "clamp(120px, 34%, 180px)",
              bottom: 0,
              left: 0,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(24,95,165,0.6), transparent 66%)",
              filter: "blur(18px)",
              animation: motionStyles.blobB,
              pointerEvents: "none",
            }}
          />

          {/* Orbiting dashed circle */}
          <div
            style={{
              position: "absolute",
              width: "clamp(260px, 92%, 340px)",
              height: "clamp(260px, 92%, 340px)",
              border: "1px dashed rgba(133,183,235,0.26)",
              borderRadius: "50%",
              animation: motionStyles.orbit,
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "-4px",
                left: "50%",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#85B7EB",
                boxShadow: "0 0 10px rgba(133,183,235,0.9)",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: "15%",
                right: "-3px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#4FB79A",
                boxShadow: "0 0 10px rgba(79,183,154,0.9)",
              }}
            />
          </div>

          {/* Central Floating Image Frame */}
          <div
            style={{
              position: "relative",
              width: "clamp(210px, 80%, 400px)",
              animation: motionStyles.floatMain,
            }}
          >
            <div
              style={{
                borderRadius: "18px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 22px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07)",
                animation: motionStyles.glowMain,
                aspectRatio: "4/3",
                background: "#0A3763",
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", inset: 0, animation: motionStyles.kenBurns }}>
                <img
                  src="/new-hero.png"
                  alt="PathPalz Cohort"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Floating Badges */}
            <div
              style={{
                position: "absolute",
                top: "-16px",
                left: "-20px",
                background: "#fff",
                borderRadius: "11px",
                padding: "8px 12px",
                boxShadow: "0 12px 28px rgba(0,0,0,0.3)",
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
              <span style={{ font: "600 11px 'IBM Plex Sans', sans-serif", color: "#2C2C2A" }}>
                Live cohort
              </span>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "-18px",
                right: "-18px",
                background: "#042C53",
                border: "1px solid rgba(133,183,235,0.3)",
                borderRadius: "11px",
                padding: "9px 13px",
                boxShadow: "0 12px 28px rgba(0,0,0,0.34)",
                animation: motionStyles.badgeB,
              }}
            >
              <div
                style={{
                  font: "500 9px 'IBM Plex Mono', monospace",
                  color: "#85B7EB",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  marginBottom: "2px",
                }}
              >
                Shipped to GitHub
              </div>
              <div
                style={{
                  font: "600 15px 'Space Grotesk', sans-serif",
                  color: "#fff",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "5px",
                }}
              >
                1,200+{" "}
                <span style={{ font: "500 10px 'IBM Plex Mono', monospace", color: "#4FB79A" }}>
                  projects
                </span>
              </div>
            </div>

            {/* Floating Terminal Code box */}
            <div
              style={{
                position: "absolute",
                bottom: "24%",
                left: "-28px",
                background: "#0A2B4D",
                border: "1px solid rgba(133,183,235,0.25)",
                borderRadius: "9px",
                padding: "7px 10px",
                font: "500 10px 'IBM Plex Mono', monospace",
                color: "#9FD0C4",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                animation: motionStyles.termFloat,
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <span style={{ color: "#5FA8E8" }}>$</span>{" "}
              <span
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  verticalAlign: "bottom",
                  borderRight: "1.5px solid #4FB79A",
                  animation: "typing 2.4s steps(18) 1.2s both, caret .8s step-end infinite",
                }}
              >
                git push origin main
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Student/Professional quick info cards */}
      <div
        style={{
          position: "relative",
          padding: "0 clamp(20px, 4vw, 52px) clamp(28px, 4vw, 44px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "14px",
        }}
      >
        {[
          {
            label: "For students",
            labelColor: "#F0C88A",
            title: "Up to 40% off every track",
            body: "Secondary school, college or university students get a significantly reduced price. Same curriculum, same cohort, same certificate.",
            cta: "Check my student price →",
            delay: "1s",
          },
          {
            label: "For professionals",
            labelColor: "#8FD3C3",
            title: "16 weeks to change what you do",
            body: "Career-change training, not a course library. Live cohorts, real projects, weekly accountability, and a portfolio that proves what you can build.",
            cta: "See the full curriculum →",
            delay: "1.1s",
          },
        ].map((card) => (
          <div
            key={card.label}
            onClick={onOpenModal}
            className="hover:bg-white/12 hover:-translate-y-1 hover:border-[#85B7EB]/50 transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(133,183,235,0.22)",
              borderRadius: "13px",
              padding: "18px",
              cursor: "pointer",
              opacity: 0,
              animation: `cascadeUp .6s ease both ${card.delay}`,
            }}
          >
            <div
              style={{
                font: "500 10px 'IBM Plex Mono', monospace",
                color: card.labelColor,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              {card.label}
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                color: "#fff",
                marginBottom: "6px",
              }}
            >
              {card.title}
            </div>
            <div style={{ fontSize: "12.5px", color: "#B5D4F4", lineHeight: 1.55, marginBottom: "10px" }}>
              {card.body}
            </div>
            <div
              style={{
                font: "600 12px 'IBM Plex Sans', sans-serif",
                color: "#85B7EB",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              {card.cta}
            </div>
          </div>
        ))}
      </div>

      <span data-hero-end="" style={{ position: "absolute", bottom: 0, left: 0, width: "1px", height: "1px" }} />
    </div>
  );
}
