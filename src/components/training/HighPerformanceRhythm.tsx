import React from "react";

const scheduleCards = [
  {
    id: "1",
    title: "Pair Lab challenge",
    description: "build something with your partner",
    highlight: false,
  },
  {
    id: "2",
    title: "Peer Code Review",
    description: "Critique and be critiqued. Building communication via code.",
    highlight: false,
  },
  {
    id: "3",
    title: "Core Lesson",
    description: "concept + worked example",
    highlight: false,
  },
  {
    id: "4",
    title: "Core Lesson",
    description: "concept + worked example",
    highlight: true,
  },
];

const HighPerformanceRhythm = () => {
  return (
    <section className="bg-[#00254D] py-20 lg:py-28 text-white select-none">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-5 flex flex-col space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold font-manrope text-white leading-[1.15]">
                A High-Performance Rhythm
              </h2>
              <p className="text-[#8E9DB0] text-lg leading-relaxed max-w-lg">
                Our schedule is designed to maximize cognitive load during peak
                hours while ensuring deep rest for long-term retention.
              </p>
            </div>

            {/* KPI Card */}
            <div className="bg-[#102B4F] rounded-[20px] p-8 ">
              <span className="text-[#0094B2] text-xs font-bold tracking-widest uppercase mb-4 block">
                KEY PERFORMANCE INDICATOR
              </span>
              <h3 className="text-[26px] font-bold font-manrope text-white mb-8 tracking-tight">
                12+ Hours/Week Commitment
              </h3>

              {/* Progress Bar container */}
              <div className="h-2.5 w-full bg-[#00254D] rounded-full overflow-hidden shrink-0">
                {/* Progress fill */}
                <div className="h-full bg-[#0094B2] w-[80%] rounded-full relative shadow-[0_0_10px_rgba(0,140,158,0.5)]">
                  {/* Subtle right glow to indicate progress */}
                  <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-r from-transparent to-white/20 rounded-r-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Content - Grid of Cards */}
          <div className="lg:col-span-7 h-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {scheduleCards.map((card) => (
              <div
                key={card.id}
                className={`flex flex-col p-8 rounded-[20px] transition-all duration-300 ${
                  card.highlight
                    ? "bg-[#0094B2] text-white hover:-translate-y-1"
                    : "bg-[#0D3B6E80]/50 hover:bg-[#0D3B6E80]/70"
                }`}
              >
                {/* <span
                  className={`text-xs font-medium tracking-[0.05em] uppercase mb-4 ${
                    card.highlight ? "text-white/90" : "text-[#7B8B9E]"
                  }`}
                >
                  {card.day}
                </span> */}
                <h4 className="text-xl font-bold font-manrope mb-2">
                  {card.title}
                </h4>
                <p
                  className={`text-sm md:text-base leading-relaxed ${
                    card.highlight ? "text-white/90" : "text-[#7B8B9E]"
                  }`}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighPerformanceRhythm;
