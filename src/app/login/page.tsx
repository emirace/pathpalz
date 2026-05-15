"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useLogin } from "@/query/auth";
import OtpModal from "@/components/auth/OtpModal";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          // Success indicates credentials are correct and OTP was sent
          setIsOtpModalOpen(true);
        },
        onError: (err: any) => {
          setError(
            err.response?.data?.message ||
              "Invalid credentials. Please check your email and password.",
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

        {/* Login Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-xl shadow-gray-200/50">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[#00284F] mb-2 font-manrope">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm">
              Please enter your details to sign in.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
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
                  disabled={loginMutation.isPending}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00677D] focus:ring-1 focus:ring-[#00677D] text-[#00284F] placeholder:text-gray-400 transition-all disabled:opacity-50"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00677D] transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="text-[11px] font-bold tracking-widest text-[#00677D] uppercase">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-bold text-gray-400 hover:text-[#00677D] transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loginMutation.isPending}
                  className="w-full h-12 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00677D] focus:ring-1 focus:ring-[#00677D] text-[#00284F] placeholder:text-gray-400 transition-all disabled:opacity-50"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00677D] transition-colors" />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00677D] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 px-1">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-300 bg-gray-50 text-[#00677D] focus:ring-[#00677D] focus:ring-offset-0"
              />
              <label
                htmlFor="remember"
                className="text-xs text-gray-400 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-14 bg-[#00677D] text-white font-bold text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#00677D]/10 hover:bg-[#00677D]/90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {loginMutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          {/* <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-400 font-medium">
                Or continue with
              </span>
            </div>
          </div> */}

          {/* Social Logins */}
          {/* <div className="grid grid-cols-3 gap-4">
            <button className="flex items-center justify-center h-12 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group">
              <Chrome className="w-5 h-5 text-gray-400 group-hover:text-[#00284F] transition-colors" />
            </button>
            <button className="flex items-center justify-center h-12 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group">
              <Github className="w-5 h-5 text-gray-400 group-hover:text-[#00284F] transition-colors" />
            </button>
            <button className="flex items-center justify-center h-12 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group">
              <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-[#00284F] transition-colors" />
            </button>
          </div> */}

          {/* Footer */}
          {/* <p className="mt-8 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#00677D] font-bold hover:underline underline-offset-4"
            >
              Create account
            </Link>
          </p> */}
          <p className="mt-3 text-center text-sm text-gray-400">
            By signing in, you agree to our{" "}
            <Link
              href="/privacy"
              className="text-gray-400 font-medium hover:text-[#00677D] hover:underline underline-offset-4 transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {/* Login OTP Modal */}
      <OtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        email={email}
      />

      {/* Decorative Subtle Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00677D]/5 blur-[120px] rounded-full -z-1" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full -z-1" />
    </div>
  );
};

export default LoginPage;
