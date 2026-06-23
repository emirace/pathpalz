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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-linear-to-r from-[#00284F] to-[#00677D] px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                <Tag className="w-4 h-4 text-teal-200" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold font-manrope text-base sm:text-lg leading-snug">
                  Generate a discount code
                </p>
                <p className="text-blue-100/70 text-xs sm:text-sm mt-0.5">
                  Students, teachers, and promo recipients — apply your code at
                  enrolment.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="shrink-0 h-10 px-5 bg-white text-[#00284F] rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors sm:ml-4"
            >
              Get Code
            </button>
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
