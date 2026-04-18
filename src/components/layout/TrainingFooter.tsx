import React from "react";
import Link from "next/link";
import Image from "next/image";

const TrainingFooter = () => {
  return (
    <footer className="bg-[#023E74] py-14 border-t border-white/5">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          {/* Logo & Info */}
          <div className="flex flex-col space-y-6 max-w-md">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="PathPalz Logo"
                width={150}
                height={40}
                className="h-8 w-auto "
                style={{ height: "auto" }}
              />
            </Link>
            <p className="text-white text-sm leading-relaxed">
              © 2024 PathPalz. Engineering Precision. Leading the next
              generation of tech talent through peer-based architectural
              learning.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/privacy"
              className="text-white hover:text-white text-sm font-medium transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white hover:text-white text-sm font-medium transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="/linkedin"
              className="text-white hover:text-white text-sm font-medium transition-colors duration-200"
            >
              LinkedIn
            </Link>
            <Link
              href="/support"
              className="text-white hover:text-white text-sm font-medium transition-colors duration-200"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TrainingFooter;
