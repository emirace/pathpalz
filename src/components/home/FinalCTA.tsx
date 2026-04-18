import React from "react";
import Link from "next/link";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-[#F7F9FC]">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-linear-to-br from-navy via-navy to-[#00254D] px-8 py-20 md:px-16 md:py-24 rounded-[3rem] shadow-2xl text-center">
          {/* Subtle Background Glow/Effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 flex flex-col items-center space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-manrope text-white max-w-4xl leading-tight">
              Let's Build the Future Together
            </h2>

            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Whether you have a groundbreaking app idea or you're ready to
              master a new tech stack, PathPalz is your partner in progress.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-14 px-10 font-bold text-white transition-all duration-300 rounded-xl shadow-lg bg-teal hover:bg-teal/90 hover:shadow-cyan-900/40 hover:-translate-y-0.5 active:translate-y-0 min-w-[200px]"
              >
                Contact Us
              </Link>

              <Link
                href="/#services"
                className="inline-flex items-center justify-center h-14 px-10 font-bold text-white transition-all duration-300 border-2 border-white/20 rounded-xl hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0 min-w-[200px]"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
