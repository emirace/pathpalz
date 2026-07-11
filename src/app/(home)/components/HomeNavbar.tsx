"use client";

import { useGetUser } from "@/query/auth";
import { SECTION_MAX_WIDTH } from "@/utils/layout";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navs = [
  {
    label: "Training",
    path: "/training",
  },
  {
    label: "Solutions",
    path: "/#",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

export function HomeNavbar() {
  const { data: user, isLoading } = useGetUser();
  const router = useRouter();

  return (
    <div
      style={{
        background: "white",
        padding: "14px clamp(14px, 2.5vw, 26px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
        borderBottom: "1px solid rgba(133, 183, 235, 0.14)",
        maxWidth: SECTION_MAX_WIDTH,
        marginInline: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "26px",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="PathPalz Logo"
            width={180}
            height={40}
            className="h-10 object-contain"
            style={{ height: "auto" }}
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {navs.map((nav) => (
            <Link
              href={nav.path}
              key={nav.label}
              className="hover:bg-white/8 transition-colors"
              style={{
                fontSize: "14.5px",
                color: "#042C53",
                padding: "5px 11px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {nav.label}
            </Link>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          style={{
            font: "500 13px 'IBM Plex Mono', monospace",
            background: "#FAEEDA",
            color: "#633806",
            padding: "5px 12px",
            borderRadius: "20px",
          }}
        >
          August · open now
        </span>
        {isLoading ? (
          <div className="animate-spin border-l border-y  w-6 h-6 rounded-full" />
        ) : user ? (
          <Link href="/dashboard" className="ml-8">
            <User className="text-[#042C53]" />
          </Link>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="hover:bg-white/8 transition-colors"
            style={{
              font: "600 14.5px 'IBM Plex Sans', sans-serif",
              border: "1px solid rgba(133, 183, 235, 0.35)",
              padding: "6px 15px",
              borderRadius: "8px",
              background: "#042C53",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
}
