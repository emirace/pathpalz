"use client";

import React from "react";
import {
  X,
  ShieldCheck,
  CreditCard,
  Calendar,
  Hash,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { IEnrollment } from "@/types/training/enrollments";

interface EnrollmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrollment: IEnrollment | null;
}

const EnrollmentDetailModal = ({
  isOpen,
  onClose,
  enrollment,
}: EnrollmentDetailModalProps) => {
  if (!isOpen || !enrollment) return null;

  const isPaid =
    enrollment.payment.status === "paid" ||
    enrollment.payment.status === "success";

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#00284F]/40 backdrop-blur-sm transition-all duration-300"
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-8 pb-4 flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold font-manrope text-[#00284F]">
              Enrollment Details
            </h3>
            <p className="text-[#424750] text-sm font-medium flex items-center gap-2">
              Order Ref:{" "}
              <span className="text-[#00284F] font-bold">
                {enrollment.payment.reference}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-0 space-y-8">
          {/* Status Banner */}
          <div
            className={`p-4 rounded-2xl flex items-center gap-4 ${
              isPaid
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {isPaid ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            <div>
              <p className="font-bold text-sm">
                Payment {enrollment.payment.status}
              </p>
              <p className="text-xs opacity-80">
                {isPaid
                  ? "Your enrollment is confirmed and your seat is secured."
                  : "We are currently processing your payment. Please wait a few moments."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Training Info */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                Training Information
              </h4>
              <div className="bg-[#F3F3F8] rounded-2xl p-5 space-y-4 border border-gray-100">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Track Title
                  </label>
                  <p className="text-sm font-bold text-[#00284F]">
                    {enrollment.purchased_course.title}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Duration
                    </label>
                    <p className="text-sm font-bold text-[#00284F]">
                      {enrollment.purchased_course.duration_weeks} Weeks
                    </p>
                  </div>
                  <div className="text-right">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Level
                    </label>
                    <p className="text-sm font-bold text-[#00284F]">
                      Beginner Welcome
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                Payment Information
              </h4>
              <div className="bg-[#F3F3F8] rounded-2xl p-5 space-y-4 border border-gray-100">
                <div className="flex justify-between">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Amount Paid
                    </label>
                    <p className="text-sm font-bold text-[#00284F]">
                      £{enrollment.purchased_course.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Gateway
                    </label>
                    <p className="text-sm font-bold text-[#00284F] capitalize">
                      {enrollment.payment.gateway.name}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Transaction Ref
                  </label>
                  <p className="text-[11px] font-mono font-medium text-[#00284F] break-all">
                    {enrollment.payment.reference}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Steps / Next Actions */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
              Next Steps
            </h4>
            <div className="space-y-3">
              {[
                {
                  title: "Check your email",
                  desc: "A detailed onboarding guide has been sent to your inbox.",
                  done: isPaid,
                },
                {
                  title: "Join the Discord",
                  desc: "Connect with your cohort and mentors before the start date.",
                  done: false,
                },
                {
                  title: "Setup your environment",
                  desc: "Follow the prerequisites guide in the track overview.",
                  done: false,
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      step.done
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step.done ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <span className="text-[10px] font-bold">{i + 1}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#00284F]">
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-[#F3F3F8] border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Verified Enrollment
            </span>
          </div>
          <button
            onClick={onClose}
            className="h-10 px-6 bg-[#00284F] text-white rounded-xl font-bold text-sm hover:bg-[#00284F]/90 transition-all shadow-lg shadow-[#00284F]/10"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentDetailModal;
