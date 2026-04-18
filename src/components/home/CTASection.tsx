import React from "react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-16 bg-navy">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <h2 className="text-3xl md:text-4xl font-bold font-manrope text-white text-center md:text-left">
            Ready to Start Your Tech Journey?
          </h2>

          <Link
            href="/training"
            className="inline-flex items-center justify-center h-14 px-10 font-bold text-white transition-all duration-300 rounded-xl shadow-lg bg-teal hover:bg-teal/90 hover:shadow-cyan-900/40 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
          >
            View Training Programmes
          </Link>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
