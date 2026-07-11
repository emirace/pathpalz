"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "Do I really need zero experience?",
    answer:
      "Yes. Every Foundation track starts from absolute zero — how to think like a developer before you write a single line of code. No coding test, no maths prerequisites, no prior tech background required.",
  },
  {
    question: "When does enrolment close?",
    answer:
      "Enrolment for the August cohort closes 28 July — or earlier if the 30 seats fill before then. The cohort starts 1 August.",
  },
  {
    question: "How do student discounts work?",
    answer:
      'When you click to enrol on any track, a discount step appears. Select "student discount," enter your institution details, and your unique code is generated instantly. You may be asked to show your student ID at your first live session.',
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes. If the first week isn't what you expected, we refund your full payment — no forms, no arguments. Applies to both professional and student pricing.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <div
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 600,
          fontSize: "18px",
          color: "#042C53",
          marginBottom: "16px",
        }}
      >
        Frequently asked questions
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              style={{
                background: "#fff",
                border: "1px solid #E7E4DB",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                style={{
                  padding: "13px 16px",
                  font: "600 13px 'IBM Plex Sans',sans-serif",
                  color: "#2C2C2A",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "none",
                  background: "none",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <span>{faq.question}</span>
                <span style={{ color: "#8A8981", fontSize: "12px" }}>
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>
              {isOpen && (
                <div
                  style={{
                    fontSize: "12.5px",
                    color: "#5F5E5A",
                    lineHeight: 1.65,
                    padding: "0 16px 14px",
                    borderTop: "1px solid #E7E4DB",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
