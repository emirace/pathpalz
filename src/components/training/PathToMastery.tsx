const steps = [
  {
    number: "01",
    title: "Apply in 5 minutes",
    description:
      "Tell us about your goals. No coding test required for entry—we value motivation over existing knowledge.",
  },
  {
    number: "02",
    title: "Get matched",
    description:
      "We pair you with a peer partner and an accountability manager to ensure you never walk alone.",
  },
  {
    number: "03",
    title: "Build real projects",
    description:
      "Every week, you'll ship code. From web apps to internal tools, you learn by doing, not just watching.",
  },
  {
    number: "04",
    title: "Graduate with power",
    description:
      "Walk away with a professional portfolio that proves your skills to top-tier hiring managers.",
  },
];

const PathToMastery = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold font-manrope text-[#00284F]">
            The Path to Mastery
          </h2>
          <p className="text-gray-500 text-base">
            Four simple steps to transform your professional trajectory.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col space-y-4 relative pt-16"
            >
              {/* Step Number (large background) */}
              <span className="absolute top-0 left-0 text-8xl font-extrabold font-manrope text-[#00284F]/10 leading-none select-none">
                {step.number}
              </span>

              {/* Content */}
              <div className="space-y-2 -mt-2">
                <h3 className="text-xl font-bold font-manrope text-[#00284F]">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PathToMastery;
