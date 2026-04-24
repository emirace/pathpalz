import React from "react";

const CoreValues = () => {
  const values = [
    {
      title: "Passion",
      description: "Commitment and enthusiasm towards our collective pursuits.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.77-8.77 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
    {
      title: "Tenacity",
      description:
        "Holding steadfast to Pathpalz goals and ambitions despite difficulties.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      title: "Accountability",
      description:
        "Taking responsibility for our individual actions and outcomes.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Reward",
      description:
        "Acknowledging and appreciating achievements and efforts among members.",
      icon: (
        <svg
          width="24"
          height="24"
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
      ),
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-teal font-bold tracking-widest text-sm uppercase block mb-4">
            Our Foundation
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-manrope text-navy">
            Core Values
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-6"
            >
              {/* Icon Container */}
              <div className="w-20 h-20 bg-[#F1F5F9] rounded-full flex items-center justify-center text-navy transition-transform duration-300 hover:scale-110">
                {value.icon}
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-manrope text-navy">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed max-w-[250px] mx-auto">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
