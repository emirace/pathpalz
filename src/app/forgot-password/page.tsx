"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  Lock,
  KeyRound,
} from "lucide-react";
import { useForgotPassword, useResetPassword } from "@/query/auth";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<"request" | "reset" | "success">("request");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const forgotPasswordMutation = useForgotPassword();
  const resetPasswordMutation = useResetPassword();

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setStep("reset");
        },
        onError: (err: any) => {
          setError(
            err.response?.data?.message ||
              "Failed to send reset link. Please check your email and try again.",
          );
        },
      },
    );
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    resetPasswordMutation.mutate(
      { token, password, confirmPassword },
      {
        onSuccess: () => {
          setStep("success");
        },
        onError: (err: any) => {
          setError(
            err.response?.data?.message ||
              "Failed to reset password. The token might be invalid or expired.",
          );
        },
      },
    );
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-white">
      {/* Content */}
      <div className="relative z-10 w-full max-w-[480px]">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="PathPalz Logo"
              width={160}
              height={44}
              className="h-10 w-auto"
              style={{ height: "auto" }}
            />
          </Link>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-xl shadow-gray-200/50">
          {step !== "success" && (
            <button
              onClick={() =>
                step === "reset" ? setStep("request") : router.push("/login")
              }
              className="inline-flex items-center text-[#00677D] text-sm font-bold mb-6 hover:translate-x-[-4px] transition-transform"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {step === "reset" ? "Back to email" : "Back to login"}
            </button>
          )}

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[#00284F] mb-2 font-manrope">
              {step === "request"
                ? "Reset Password"
                : step === "reset"
                  ? "Set New Password"
                  : "Success!"}
            </h1>
            <p className="text-gray-500 text-sm">
              {step === "request"
                ? "Enter your email to receive a password reset token."
                : step === "reset"
                  ? "Enter the token sent to your email and your new password."
                  : "Your password has been reset successfully."}
            </p>
          </div>

          {step === "request" && (
            <form className="space-y-6" onSubmit={handleResetRequest}>
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#00677D] uppercase px-1">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    disabled={forgotPasswordMutation.isPending}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00677D] focus:ring-1 focus:ring-[#00677D] text-[#00284F] placeholder:text-gray-400 transition-all disabled:opacity-50"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00677D] transition-colors" />
                </div>
              </div>

              <button
                type="submit"
                disabled={forgotPasswordMutation.isPending}
                className="w-full h-14 bg-[#00677D] text-white font-bold text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#00677D]/10 hover:bg-[#00677D]/90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                {forgotPasswordMutation.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Send Token
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {step === "reset" && (
            <form className="space-y-6" onSubmit={handlePasswordReset}>
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#00677D] uppercase px-1">
                  Reset Token
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter 6-digit token"
                    disabled={resetPasswordMutation.isPending}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00677D] focus:ring-1 focus:ring-[#00677D] text-[#00284F] placeholder:text-gray-400 transition-all disabled:opacity-50"
                  />
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00677D] transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#00677D] uppercase px-1">
                  New Password
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={resetPasswordMutation.isPending}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00677D] focus:ring-1 focus:ring-[#00677D] text-[#00284F] placeholder:text-gray-400 transition-all disabled:opacity-50"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00677D] transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#00677D] uppercase px-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={resetPasswordMutation.isPending}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00677D] focus:ring-1 focus:ring-[#00677D] text-[#00284F] placeholder:text-gray-400 transition-all disabled:opacity-50"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00677D] transition-colors" />
                </div>
              </div>

              <button
                type="submit"
                disabled={resetPasswordMutation.isPending}
                className="w-full h-14 bg-[#00677D] text-white font-bold text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#00677D]/10 hover:bg-[#00677D]/90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                {resetPasswordMutation.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Reset Password
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {step === "success" && (
            <div className="text-center py-4 space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#00284F]">
                Password Reset!
              </h3>
              <p className="text-gray-500 text-sm">
                You can now log in with your new password.
              </p>
              <div className="pt-6">
                <Link
                  href="/login"
                  className="w-full h-14 bg-[#00677D] text-white font-bold text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#00677D]/10 hover:bg-[#00677D]/90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Return to Login
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Subtle Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00677D]/5 blur-[120px] rounded-full -z-1" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full -z-1" />
    </div>
  );
};

export default ForgotPasswordPage;
