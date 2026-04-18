import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Industry-Relevant Expertise",
      description:
        "Our curriculum and development standards are set by current tech industry leaders.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#008C9E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 15l-2 5L9 9l11 4-5 2z" />
          <path d="M7.21 15H2L9 3l1.91 3.42" />
        </svg>
      ),
    },
    {
      title: "Real-World Learning",
      description:
        "No theory without practice. Every lesson is anchored in real project challenges.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#008C9E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="9" r="2" />
          <circle cx="15" cy="15" r="2" />
          <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
          <path d="M8 12h.01M16 12h.01" />
        </svg>
      ),
    },
    {
      title: "Tailored Solutions",
      description:
        "We don't do one-size-fits-all. Every solution is custom-built for your specific context.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#008C9E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      ),
    },
    {
      title: "Innovation Focused",
      description:
        "Staying ahead of the curve is our default setting, from AI to modern cloud architecture.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#008C9E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 bg-[#F7F9FC] border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-manrope text-navy">
            Why Choose PathPalz?
          </h2>
        </div>

        {/* Features Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 md:p-12 flex flex-col items-start space-y-6 lg:border-l border-gray-100 first:border-l-0 ${
                index >= 2 ? "md:border-t md:lg:border-t-0" : ""
              } ${
                index % 2 !== 0 ? "md:border-l lg:border-l" : ""
              } first:md:border-l-0`}
            >
              <div className="shrink-0">{feature.icon}</div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold font-manrope text-navy leading-snug">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
