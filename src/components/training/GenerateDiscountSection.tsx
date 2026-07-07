"use client";

import React, { useState } from "react";
import { Tag } from "lucide-react";
import GenerateDiscountModal from "./GenerateDiscountModal";
import { useGetUser } from "@/query/auth";

export default function GenerateDiscountSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user } = useGetUser();

  return (
    <>
      <section className="py-8 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-r from-[#00284F] via-[#00456f] to-[#00677D] px-6 py-6 shadow-[0_20px_60px_rgba(0,40,79,0.22)] sm:px-8 sm:py-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.25),_transparent_45%)]" />
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-teal-300/20 blur-3xl" />
            <div className="absolute -bottom-10 left-1/3 h-24 w-24 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4 min-w-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                  <Tag className="h-5 w-5 text-teal-200" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-200/90">
                    Exclusive access
                  </p>
                  <p className="mt-1 text-white font-bold font-manrope text-lg sm:text-xl leading-snug">
                    Generate a discount code
                  </p>
                  <p className="mt-2 max-w-2xl text-sm sm:text-[15px] text-blue-100/80 leading-relaxed">
                    Students, teachers, and promo recipients can create a code
                    and apply it during enrolment for instant savings.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:items-center">
                <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-left backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-100/80">
                    Fast & simple
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Create your code in seconds
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group shrink-0 h-12 px-6 rounded-xl bg-white text-[#00284F] font-bold text-sm shadow-lg shadow-[#00284F]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-xl"
                >
                  <span className="inline-flex items-center gap-2">
                    Get Code
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GenerateDiscountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultEmail={user?.email ?? ""}
      />
    </>
  );
}
