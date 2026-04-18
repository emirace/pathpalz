"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Mail, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useVerifyOtp } from "@/query/auth";
import { useRouter } from "next/navigation";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const OtpModal = ({ isOpen, onClose, email }: OtpModalProps) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const router = useRouter();
  const verifyOtpMutation = useVerifyOtp();

  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", "", "", ""]);
      setError(null);
      // Small delay to ensure modal animation finishes
      setTimeout(() => inputRefs[0].current?.focus(), 100);
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Filter to next box
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    verifyOtpMutation.mutate(
      { email, otp: otpValue },
      {
        onSuccess: (data) => {
          console.log(data);
          // Assuming data contains tokens based on standard practice
          if (data.token) {
            localStorage.setItem("authToken", data.token);
          }
          if (data.refresh_token) {
            localStorage.setItem("refreshToken", data.refresh_token);
          }
          onClose();
          router.push("/training");
        },
        onError: (err: any) => {
          setError(
            err.response?.data?.message ||
              "Invalid OTP code. Please try again.",
          );
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00284F]/60 backdrop-blur-sm transition-all duration-300">
      <div
        className="relative bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-[#00284F] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-[#00677D]/10 rounded-2xl flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-[#00677D]" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#00284F] mb-3 font-manrope">
            Verify your email
          </h2>
          <p className="text-gray-500 text-sm">
            We've sent a 6-digit code to <br />
            <span className="font-bold text-[#00284F]">{email}</span>
          </p>
        </div>

        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-4 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-16 text-center text-2xl font-bold bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00677D] focus:ring-1 focus:ring-[#00677D] text-[#00284F] transition-all"
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm justify-center mb-6 bg-red-50 p-3 rounded-lg border border-red-100">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={handleVerify}
            disabled={verifyOtpMutation.isPending}
            className="w-full h-14 bg-[#00677D] text-white font-bold text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#00677D]/10 hover:bg-[#00677D]/90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            {verifyOtpMutation.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Verify Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full text-sm text-gray-400 font-bold hover:text-[#00677D] transition-colors"
          >
            I didn't receive code. Resend OTP
          </button>
        </div>

        {/* Bottom Link */}
        <p className="mt-8 text-center text-xs text-gray-400">
          Made a mistake?{" "}
          <button
            onClick={onClose}
            className="text-[#00677D] font-bold hover:underline"
          >
            Change email
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpModal;
