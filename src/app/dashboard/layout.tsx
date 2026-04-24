"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useGetUser } from "@/query/auth";
import {
  LayoutDashboard,
  BookOpen,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

const SIDEBAR_ITEMS = [
  { name: "Overview", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
  {
    name: "My Enrollments",
    icon: <BookOpen size={20} />,
    href: "/dashboard/enrollments",
  },
  { name: "Profile", icon: <User size={20} />, href: "/dashboard/profile" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useGetUser();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F3F3F8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F3F3F8] flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#00284F]/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 w-72 bg-[#00284F] text-white z-50 transition-transform duration-300 transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          <div className="p-8">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter text-white"
            >
              PATHPALZ<span className="text-teal">.</span>
            </Link>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-teal text-white shadow-lg shadow-teal/20"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }
                  `}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-bold text-sm uppercase tracking-widest">
                      {item.name}
                    </span>
                  </div>
                  {isActive && <ChevronRight size={16} />}
                </Link>
              );
            })}

            {user?.usertype?.includes("instructor") && (
              <Link
                href="/dashboard/instructor/progress"
                className={`
                  flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group mt-4 border border-teal/30
                  ${
                    pathname === "/dashboard/instructor/progress"
                      ? "bg-teal text-white shadow-lg shadow-teal/20"
                      : "text-teal hover:text-white hover:bg-teal/20"
                  }
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={20} />
                  <span className="font-bold text-sm uppercase tracking-widest">
                    Instructor Portal
                  </span>
                </div>
                {pathname === "/dashboard/instructor/progress" && (
                  <ChevronRight size={16} />
                )}
              </Link>
            )}
          </nav>

          <div className="p-4 mt-auto">
            <button className="w-full flex items-center gap-3 px-4 py-3.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <LogOut size={20} />
              <span className="font-bold text-sm uppercase tracking-widest">
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} className="text-[#00284F]" />
            </button>
            <h1 className="text-xl font-bold text-[#00284F] hidden sm:block">
              {pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#00284F]">
                {user.first_name || "User"}
              </p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center text-teal font-bold">
              {user.first_name?.[0] || user.email[0].toUpperCase()}
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
