import Image from "next/image";
import React from "react";
import { Users, ClipboardCheck } from "lucide-react";

const features = [
  {
    title: "The Peer Partner",
    description:
      "Someone at your level. You'll review each other's code, debug together, and celebrate wins. It's the \"Partner\" in PathPalz.",
    icon: <Users className="w-5 h-5 text-[#00677D]" strokeWidth={2} />,
  },
  {
    title: "The Accountability Manager",
    description:
      "Your personal coach who monitors your progress. If you slip behind, they're there with a plan to get you back on track. No one gets left behind.",
    icon: <ClipboardCheck className="w-5 h-5 text-[#00677D]" strokeWidth={2} />,
  },
  {
    title: "Absorption section",
    description:
      "High-performing trainees may be considered for a paid role or freelance opportunity with Pathpalz directly. This is not guaranteed — it is earned. We look at commitment, growth, and attitude over the full 16 weeks.",
    icon: <ClipboardCheck className="w-5 h-5 text-[#00677D]" strokeWidth={2} />,
  },
];

const SupportSystem = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold font-manrope text-[#00284F] leading-tight tracking-tight">
                Built-in Support System
              </h2>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-lg">
                Self-learning is hard. That's why every PathPalz student is
                flanked by two dedicated supporters from day one.
              </p>
            </div>

            <div className="flex flex-col space-y-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="mt-1 shrink-0 w-12 h-12 rounded-lg bg-[#00677D1A]/10 flex items-center justify-center mr-5">
                    {feature.icon}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-[22px] font-bold font-manrope text-[#101828] leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-[15px] leading-relaxed max-w-md">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Images Layout */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {/* Left Image Column */}
            <div className="flex flex-col gap-4 lg:gap-6 pt-0 lg:pt-10">
              {/* Image 1 */}
              <div className="relative w-full aspect-4/5 rounded-[20px] overflow-hidden shadow-md">
                <Image
                  src="/support_1.png"
                  alt="PathPalz peer partner"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              {/* Image 2 */}
              <div className="relative w-full aspect-square md:aspect-4/3 rounded-[20px] overflow-hidden shadow-md">
                <Image
                  src="/support_3.png"
                  alt="PathPalz code review"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>

            {/* Right Image Column */}
            <div className="flex flex-col gap-4 lg:gap-6 pb-0 lg:pb-10">
              {/* Image 3 */}
              <div className="relative w-full aspect-square md:aspect-4/3 rounded-[20px] overflow-hidden shadow-md">
                <Image
                  src="/support_2.png"
                  alt="PathPalz accountability manager"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              {/* Image 4 */}
              <div className="relative w-full aspect-4/5 rounded-[20px] overflow-hidden shadow-md">
                <Image
                  src="/support_4.png"
                  alt="PathPalz support success"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSystem;
