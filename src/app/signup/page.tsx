"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Phone, Loader2, AlertCircle } from "lucide-react";
import { useRegister } from "@/query/auth";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [telCode, setTelCode] = useState("+234");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const registerMutation = useRegister();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!email || !phoneNumber || !password || !passwordConfirmation) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    registerMutation.mutate(
      {
        email,
        tel_code: telCode,
        phone_number: phoneNumber,
        password,
        password_confirmation: passwordConfirmation,
      },
      {
        onSuccess: () => {
          // Success! Redirect to login
          router.push("/login?signup_success=true");
        },
        onError: (err: any) => {
          const apiError = err.response?.data?.message || err.response?.data?.error;
          setError(apiError || "Registration failed. Please try again.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-white">
      {/* Content */}
      <div className="relative z-10 w-full max-w-[520px]">
        {/* Logo */}
        <div className="flex justify-center mb-8">
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

        {/* Signup Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-xl shadow-gray-200/50">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[#00284F] mb-2 font-manrope">
              Create account
            </h1>
            <p className="text-gray-500 text-sm">
              Start your journey with PathPalz today.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSignup}>
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100 mb-4">
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
                  disabled={registerMutation.isPending}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00677D] focus:ring-1 focus:ring-[#00677D] text-[#00284F] placeholder:text-gray-400 transition-all disabled:opacity-50"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00677D] transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-widest text-[#00677D] uppercase px-1">
                Phone Number
              </label>
              <div className="flex gap-3">
                <div className="w-24">
                  <select
                    value={telCode}
                    onChange={(e) => setTelCode(e.target.value)}
                    disabled={registerMutation.isPending}
                    className="w-full h-12 px-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00677D] focus:ring-1 focus:ring-[#00677D] text-[#00284F] text-sm transition-all disabled:opacity-50"
                  >
                    <option value="+234">+234</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+233">+233</option>
                  </select>
                </div>
                <div className="relative flex-1 group">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="801 234 5678"
                    disabled={registerMutation.isPending}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00677D] focus:ring-1 focus:ring-[#00677D] text-[#00284F] placeholder:text-gray-400 transition-all disabled:opacity-50"
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00677D] transition-colors" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#00677D] uppercase px-1">
                  Password
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={registerMutation.isPending}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00677D] focus:ring-1 focus:ring-[#00677D] text-[#00284F] placeholder:text-gray-400 transition-all disabled:opacity-50"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00677D] transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#00677D] uppercase px-1">
                  Confirm
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="••••••••"
                    disabled={registerMutation.isPending}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00677D] focus:ring-1 focus:ring-[#00677D] text-[#00284F] placeholder:text-gray-400 transition-all disabled:opacity-50"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00677D] transition-colors" />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full h-14 bg-[#00677D] text-white font-bold text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#00677D]/10 hover:bg-[#00677D]/90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group mt-4"
            >
              {registerMutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#00677D] font-bold hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Decorative Subtle Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00677D]/5 blur-[120px] rounded-full -z-1" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full -z-1" />
    </div>
  );
};

export default SignupPage;
