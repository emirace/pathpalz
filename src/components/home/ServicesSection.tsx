import React from "react";
import Link from "next/link";

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-teal font-bold tracking-widest text-sm uppercase block mb-4">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-manrope text-navy">
            Core Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Custom Software Development */}
          <div className="bg-[#F7F9FC] p-8 md:p-12 rounded-[2.5rem] flex flex-col space-y-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center shadow-lg shadow-navy/20">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold font-manrope text-navy">
                Tech Solutions
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                We architect and build scalable, secure, and user-centric
                software tailored specifically to your business logic and goals.
              </p>
            </div>

            <Link
              href="/#"
              className="inline-flex items-center text-teal font-bold text-lg hover:underline underline-offset-4 group"
            >
              Learn More
              <svg
                className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          {/* Card 2: Training / Bootcamps */}
          <div className="bg-navy p-8 md:p-12 rounded-[2.5rem] flex flex-col space-y-8 transition-all duration-300 hover:shadow-2xl hover:shadow-navy/30 hover:-translate-y-1">
            <div className="w-16 h-16 bg-teal rounded-2xl flex items-center justify-center shadow-lg shadow-teal/20">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>

            <div className="space-y-4">
              {/* Optional Title like "Tech Training & Bootcamps" could be added if needed, 
                  but following the image's implicit structure which focuses on text directly. 
                  However, "Custom Software Development" has a title, so I'll add one here for consistency. */}
              <h3 className="text-2xl md:text-3xl font-bold font-manrope text-white">
                Tech Training & Bootcamps
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Practical, industry-led programmes designed to turn beginners
                into job-ready developers and professionals.
              </p>
            </div>

            <Link
              href="/training"
              className="inline-flex items-center text-teal font-bold text-lg hover:underline underline-offset-4 group"
            >
              View Bootcamps
              <svg
                className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
