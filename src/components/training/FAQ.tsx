"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Do I really need zero experience?",
    answer:
      "Yes. Our Software Development track is meticulously designed starting from the literal basics. We teach you how to think like a developer before we even write our first line of code.",
  },
  {
    question: "How are peer partners selected?",
    answer:
      "We match you based on your time zone, previous experience level (or lack thereof), and learning style. Our goal is to pair you with someone who will challenge you while remaining at a similar pace.",
  },
  {
    question: "Is this a full-time commitment?",
    answer:
      "No, but it is a consistent one. We recommend at least 12-15 hours per week. Most of our students balance the training with a part-time job or other studies, but you must be able to attend the core live sessions.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#F3F3F8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-manrope text-[#00284F] leading-tight">
            Frequently Asked <br className="hidden sm:block" /> Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden transition-all duration-300 shadow-sm border border-gray-100"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left hover:bg-gray-50/50 transition-colors focus:outline-none"
                >
                  <span className="text-lg md:text-xl font-bold font-manrope text-[#00284F]">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-6 h-6 text-[#00284F] shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-[#00284F] shrink-0 ml-4" />
                  )}
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 sm:p-8 pt-0 sm:pt-0">
                    <p className="text-[#424750] text-base md:text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
