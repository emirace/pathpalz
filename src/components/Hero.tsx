import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-linear-to-b from-[#023E74] to-[#00254D]">
      {/* Background Overlay Image */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Image
          src="/hero_bakground.png"
          alt="Technical background pattern"
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-manrope">
              Building Software.
              <br />
              <span className="text-teal underline decoration-teal/30 underline-offset-8">
                Developing Talent.
              </span>
              <br />
              Driving Innovation.
            </h1>

            <p className="max-w-xl text-lg md:text-xl text-gray-200 leading-relaxed font-light font-inter">
              At PathPalz, we help businesses build powerful digital solutions
              and empower individuals with practical tech skills to navigate the
              future of technology with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-14 px-8 font-bold text-white transition-all duration-300 rounded-xl shadow-lg bg-teal hover:bg-teal/90 hover:shadow-cyan-900/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                Book a Consultation
              </Link>
              <Link
                href="/training"
                className="inline-flex items-center justify-center h-14 px-8 font-bold text-white transition-all duration-300 rounded-xl border-2 border-white/20 hover:border-white/40 hover:bg-white/5 active:bg-white/10"
              >
                Explore Training Programmes
              </Link>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full aspect-square max-w-[600px] overflow-hidden group">
              <div className="absolute inset-0 z-10 group-hover:bg-transparent transition-colors duration-500" />
              <Image
                src="/hero_img.png"
                alt="Futuristic digital portal"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle glow effect */}
              <div className="absolute -inset-4 bg-teal/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-1000 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
