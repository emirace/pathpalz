"use client";

import React, { useState } from "react";
import { X, ArrowRight, Bell, CheckCircle2, Loader2 } from "lucide-react";
import { useJoinWaitingList } from "@/query/training/enquiry";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackId: number;
  trackTitle: string;
}

const WaitlistModal = ({
  isOpen,
  onClose,
  trackId,
  trackTitle,
}: WaitlistModalProps) => {
  const [formData, setFormData] = useState({ fullName: "", email: "" });
  const [isSuccess, setIsSuccess] = useState(false);

  const joinWaitlist = useJoinWaitingList();

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleClose = () => {
    setFormData({ fullName: "", email: "" });
    setIsSuccess(false);
    joinWaitlist.reset();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    joinWaitlist.mutate(
      {
        full_name: formData.fullName,
        email: formData.email,
        training_track_id: trackId,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
      }
    );
  };

  const errorMessage =
    (joinWaitlist.error as any)?.response?.data?.message ||
    (joinWaitlist.error as any)?.message ||
    "Something went wrong. Please try again.";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00284F]/50 backdrop-blur-sm transition-all duration-300"
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {isSuccess ? (
          /* ── Success State ── */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-manrope text-[#00284F]">
                You're on the list!
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                We'll notify you at{" "}
                <span className="font-semibold text-[#00284F]">
                  {formData.email}
                </span>{" "}
                as soon as enrollment opens for{" "}
                <span className="font-semibold text-[#00284F]">
                  {trackTitle}
                </span>
                .
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full h-12 bg-[#00284F] text-white rounded-xl font-bold hover:bg-[#00284F]/90 transition-all flex items-center justify-center"
            >
              Done
            </button>
          </div>
        ) : (
          /* ── Form State ── */
          <>
            {/* Header */}
            <div className="p-8 pb-2">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5">
                <Bell className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold font-manrope text-[#00284F] mb-1">
                Join the Waitlist
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Get notified when enrollment opens for{" "}
                <span className="font-semibold text-[#00284F]">
                  {trackTitle}
                </span>
                . No payment required.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#00284F]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#00284F]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
                />
              </div>

              {/* Error message */}
              {joinWaitlist.isError && (
                <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={joinWaitlist.isPending}
                  className="w-full h-12 bg-[#00284F] text-white rounded-xl font-bold hover:bg-[#00284F]/90 transition-all flex items-center justify-center group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {joinWaitlist.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join the Waitlist
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 font-medium pt-1">
                We'll only email you about enrollment updates
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;
