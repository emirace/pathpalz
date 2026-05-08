"use client";

import React from "react";
import Image from "next/image";
import { Link2, ShieldCheck } from "lucide-react";

const tutors = [
  {
    name: "Sarah Chen",
    role: "PRINCIPAL ENGINEER",
    bio: "Ex-Google Senior Architect with 12+ years experience in distributed systems and cloud infrastructure.",
    image: "/tutor1.png",
  },
  {
    name: "Marcus Rodriguez",
    role: "MOBILE DEVELOPER",
    bio: "Passionate about design systems and frontend performance. Contributor to major open-source UI libraries.",
    image: "/tutor2.png",
  },
];

export default function TutorSection() {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 space-y-10">
      <h3 className="text-2xl font-bold text-[#00284F] font-manrope">
        Meet Your Tutors
      </h3>

      <div className="space-y-12">
        {tutors.map((tutor, index) => (
          <div key={index} className="space-y-6">
            <div className="relative w-24 h-24">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm">
                <Image
                  src={tutor.image}
                  alt={tutor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-lg">
                <div className="bg-[#00677D] rounded-full p-1">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold text-[#00284F]">{tutor.name}</h4>
              <p className="text-[#00677D] text-xs font-black tracking-widest uppercase">
                {tutor.role}
              </p>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              {tutor.bio}
            </p>

            <button className="flex items-center gap-2 text-[#00677D] text-sm font-bold hover:gap-3 transition-all">
              View LinkedIn <Link2 className="w-4 h-4" />
            </button>

            {index < tutors.length - 1 && (
              <div className="h-px bg-gray-50 w-full pt-4" />
            )}
          </div>
        ))}
      </div>

      <div className="pt-6 space-y-4 text-center">
        <p className="text-xs text-gray-400 font-bold">
          Ready to learn from the best?
        </p>
        <button className="w-full py-4 bg-[#00284F] text-white rounded-xl font-bold hover:bg-[#00284F]/90 transition-all shadow-xl shadow-[#00284F]/20 active:scale-[0.98]">
          Apply for a track
        </button>
      </div>
    </div>
  );
}
