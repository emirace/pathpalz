import Image from "next/image";
import Link from "next/link";

interface TrainingHeroProps {
  onApply: () => void;
  onWaitlist: () => void;
}

const TrainingHero = ({ onApply, onWaitlist }: TrainingHeroProps) => {
  return (
    <section className="bg-[#F0F6FF] py-16 lg:py-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-8">
            {/* Badge */}
            <div className="inline-flex">
              <span className="bg-teal/15 text-sm font-semibold px-4 py-2 text-black rounded-full border border-teal/20">
                Pathpalz Training
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-extrabold font-manrope text-[#00284F] leading-[1.1] tracking-tight">
              Start your tech
              <br />
              career —{" "}
              <span className="text-teal">
                no
                <br />
                experience
                <br />
                needed.
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              Pathpalz trains complete beginners into job-ready tech
              professionals. Real projects. A learning partner by your side. An
              accountability manager keeping you on track. Available in the UK
              and Nigeria.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href={"/training#learning_tracks"}
                className="inline-flex items-center justify-center h-14 px-8 font-bold text-white transition-all duration-300 rounded-xl bg-[#00284F] hover:bg-[#00284F]/90 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#00284F]/20 cursor-pointer"
              >
                Apply
              </Link>
              <button
                onClick={onWaitlist}
                className="inline-flex items-center justify-center h-14 px-8 font-bold text-[#00284F] transition-all duration-300 rounded-xl border-2 border-[#00284F]/20 hover:border-[#00284F]/40 hover:bg-[#00284F]/5 active:bg-[#00284F]/10 cursor-pointer"
              >
                Join the waiting list
              </button>
            </div>
          </div>

          {/* Right — Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-145 aspect-4/3 rounded-4xl overflow-hidden shadow-2xl shadow-[#00284F]/10">
              <Image
                src="/training_hero.png"
                alt="Students collaborating in a modern tech workspace"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Coming Soon badge */}
              <div className="absolute top-4 right-4 bg-[#00284F]/80 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg">
                Start Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingHero;
