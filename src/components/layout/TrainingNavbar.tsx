"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTraining } from "@/context/TrainingContext";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/query/auth";
import { User as UserIcon } from "lucide-react";

const TrainingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useTraining();
  const router = useRouter();
  const { data: user } = useGetUser();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Software Development", href: "/software-development" },
    { name: "Training", href: "/training", active: true },
    { name: "Contact", href: "/contact" },
  ];

  const handleAuthRedirect = (type: "apply" | "waitlist") => {
    // if (user) {
    // openModal(type);
    // } else {
    router.push("/login");
    // }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#023E74] shadow-lg">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="PathPalz Logo"
                width={150}
                height={40}
                className="h-10 w-auto object-contain"
                style={{ height: "auto" }}
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 relative py-2 ${
                  link.active ? "text-teal" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
                {link.active && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10 group"
                aria-label="Go to Dashboard"
              >
                <UserIcon
                  size={22}
                  className="group-hover:scale-110 transition-transform"
                />
              </Link>
            ) : (
              <button
                onClick={() => handleAuthRedirect("apply")}
                className="inline-flex items-center h-12 px-8 font-bold text-[#00284F] transition-all duration-300 rounded-xl shadow-lg bg-teal hover:bg-teal/90 hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"} bg-[#0D2B4E] border-t border-white/10`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                link.active
                  ? "text-teal bg-white/5"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center justify-center w-full py-4 px-6 font-bold text-white rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all gap-2"
                onClick={() => setIsOpen(false)}
              >
                <UserIcon size={20} />
                Go to Dashboard
              </Link>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleAuthRedirect("apply");
                }}
                className="block w-full text-center py-4 px-6 font-bold text-[#00284F] rounded-xl bg-teal hover:bg-teal/90 transition-all font-manrope"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TrainingNavbar;
