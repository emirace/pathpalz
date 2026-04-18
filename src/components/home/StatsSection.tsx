import React from "react";

const StatsSection = () => {
  const stats = [
    {
      value: "150+",
      label: "SOLUTIONS BUILT",
      bg: "bg-white",
      text: "text-navy",
      border: "border border-gray-100 shadow-sm",
    },
    {
      value: "2.5k",
      label: "STUDENTS TRAINED",
      bg: "bg-navy",
      text: "text-white",
    },
    {
      value: "98%",
      label: "SUCCESS RATE",
      bg: "bg-teal",
      text: "text-white",
    },
    {
      value: "24/7",
      label: "EXPERT SUPPORT",
      bg: "bg-[#F8FAFC]",
      text: "text-navy",
    },
  ];

  return (
    <section id="stats" className="py-24 bg-[#F7F9FC] overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-navy leading-tight max-w-xl font-manrope">
              Your Partner in Technology and Growth
            </h2>

            <div className="space-y-6 text-gray-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              <p>
                We bridge the gap between technical complexity and human
                potential. Our dual-mission approach ensures that we aren't just
                delivering code, but fostering ecosystems where businesses and
                individuals can thrive simultaneously.
              </p>
              <p>
                Whether you're looking for enterprise-grade software development
                or looking to pivot your career through our intensive tech
                bootcamps, PathPalz provides the roadmap, the tools, and the
                expertise to get to there.
              </p>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bg} ${stat.text} ${stat.border || ""} p-10 rounded-[2.5rem] flex flex-col justify-center min-h-[220px] transition-transform hover:scale-[1.02] duration-300 shadow-md sm:shadow-lg`}
              >
                <span className="text-5xl font-bold mb-2 font-manrope">
                  {stat.value}
                </span>
                <span className="text-sm font-bold tracking-widest opacity-80 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
