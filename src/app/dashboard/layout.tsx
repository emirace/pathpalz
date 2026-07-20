"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useGetUser } from "@/query/auth";
import { useQueryClient } from "@tanstack/react-query";
import {
  LayoutDashboard,
  BookOpen,
  User,
  Settings,
  LogOut,
  CreditCard,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  ArrowLeft,
  Users,
  ClipboardList,
  Tag,
} from "lucide-react";
import Link from "next/link";

const SIDEBAR_ITEMS = [
  { name: "Overview", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
  {
    name: "My Enrollments",
    icon: <BookOpen size={20} />,
    href: "/dashboard/enrollments",
  },
  { name: "Attendance", icon: <ShieldCheck size={20} />, href: "/dashboard/student/attendance" },
  { name: "Profile", icon: <User size={20} />, href: "/dashboard/profile" },
];

const ADMIN_SIDEBAR_ITEMS = [
  {
    name: "Course Tracks",
    icon: <Settings size={20} />,
    href: "/dashboard/admin/course-tracks",
  },
  {
    name: "Instructors",
    icon: <Users size={20} />,
    href: "/dashboard/admin/instructors",
  },
  {
    name: "Students",
    icon: <User size={20} />,
    href: "/dashboard/admin/students",
  },
  {
    name: "Payments",
    icon: <CreditCard size={20} />,
    href: "/dashboard/admin/payments",
  },
  {
    name: "Waiting List",
    icon: <ClipboardList size={20} />,
    href: "/dashboard/admin/waiting-list",
  },
  {
    name: "Discounts",
    icon: <Tag size={20} />,
    href: "/dashboard/admin/discounts",
  },
];

const INSTRUCTOR_SIDEBAR_ITEMS = [
  {
    name: "Module Progress",
    icon: <Settings size={20} />,
    href: "/dashboard/instructor/progress",
  },
  {
    name: "Attendance",
    icon: <ShieldCheck size={20} />,
    href: "/dashboard/instructor/attendance",
  },
  {
    name: "Assignments",
    icon: <ClipboardList size={20} />,
    href: "/dashboard/instructor/assignments",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useGetUser();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const isAdminPath = pathname.startsWith("/dashboard/admin");
  const isInstructorPath = pathname.startsWith("/dashboard/instructor");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    queryClient.clear();
    router.push("/login");
  };

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

  // If the user's account is not active, show a blocking status message
  if (user.status && user.status !== "active") {
    const title = user.status === "suspended" ? "Account Suspended" : "Account Inactive";
    return (
      <div className="min-h-screen bg-[#F3F3F8] flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-[#00284F]">{title}</h2>
          <p className="mt-3 text-gray-500">
            Your account is currently <span className="font-semibold">{user.status}</span>. Please contact support if you believe this is an error.
          </p>
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-teal text-white font-bold"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        fixed lg:static inset-y-0 left-0 h-screen w-72 ${isAdminPath ? "bg-[#001529]" : isInstructorPath ? "bg-[#00284F]" : "bg-[#00284F]"
          } text-white z-50 transition-transform duration-300 transform
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
            {!isAdminPath && !isInstructorPath ? (
              <>
                {SIDEBAR_ITEMS.filter(
                  (item) =>
                    !user?.usertype?.includes("instructor") ||
                    item.href === "/dashboard/profile"
                ).map((item) => {
                  const isActive = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center justify-between px-4 py-3.5 transition-all duration-200 group
                        ${isActive
                          ? "bg-teal/10 border-l-4 border-teal text-teal"
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
                      flex items-center justify-between px-4 py-3.5 transition-all duration-200 group mt-4 border border-teal/30
                      ${pathname.startsWith("/dashboard/instructor")
                        ? "bg-teal/10 border-l-4 border-teal text-teal"
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
                    {pathname.startsWith("/dashboard/instructor") && (
                      <ChevronRight size={16} />
                    )}
                  </Link>
                )}

                {user?.usertype?.includes("platform") && (
                  <Link
                    href="/dashboard/admin/course-tracks"
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group mt-4 border border-blue-500/30 text-blue-400 hover:text-white hover:bg-blue-500/20"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={20} />
                      <span className="font-bold text-sm uppercase tracking-widest">
                        Admin Portal
                      </span>
                    </div>
                    <ChevronRight size={16} />
                  </Link>
                )}
              </>
            ) : isAdminPath ? (
              <>
                <div className="px-4 py-2 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/50">
                    Admin Management
                  </span>
                </div>
                {ADMIN_SIDEBAR_ITEMS.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center justify-between px-4 py-3.5  transition-all duration-200 group
                        ${isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
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

                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-3.5 transition-all duration-200 group mt-8 border border-white/10 text-white/40 hover:text-white hover:bg-white/5"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <ArrowLeft size={20} />
                  <span className="font-bold text-sm uppercase tracking-widest">
                    Exit Admin
                  </span>
                </Link>
              </>
            ) : (
              <>
                <div className="px-4 py-2 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal/50">
                    Instructor Management
                  </span>
                </div>
                {INSTRUCTOR_SIDEBAR_ITEMS.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center justify-between px-4 py-3.5 transition-all duration-200 group
                        ${isActive
                          ? "bg-teal/10 border-l-4 border-teal text-teal"
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

                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-3.5 transition-all duration-200 group mt-8 border border-white/10 text-white/40 hover:text-white hover:bg-white/5"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <ArrowLeft size={20} />
                  <span className="font-bold text-sm uppercase tracking-widest">
                    Exit Instructor
                  </span>
                </Link>
              </>
            )}

          </nav>

          <div className="p-4 mt-auto">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              <LogOut size={20} />
              <span className="font-bold text-sm uppercase tracking-widest">
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen">
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
