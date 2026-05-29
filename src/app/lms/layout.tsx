"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGetEnrollmentById } from "@/query/training/enrollments";
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
  Lock,
  ClipboardList,
  GraduationCap,
  Bell,
  HelpCircle,
  Menu,
  X
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const enrollmentId = searchParams.get("enrollmentId");
  const { data: enrollment, isLoading } = useGetEnrollmentById(enrollmentId || "");
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleModule = (id: number) => {
    setOpenModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (isLoading || !enrollmentId) {
    return (
      <div className="min-h-screen bg-[#F3F3F8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-[#F3F3F8] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-[#00284F]">Enrollment Not Found</h2>
        <Link href="/dashboard/enrollments" className="mt-4 text-teal hover:underline font-medium">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#00284F]/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:static inset-y-0 left-0 w-72 bg-[#00284F] text-white z-50 transition-transform duration-300 transform flex flex-col h-screen
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white">
              PATHPALZ<span className="text-teal">.</span> LMS
            </h1>
            <p className="text-[10px] text-teal/80 uppercase tracking-widest font-bold mt-1">
              Professional Learning
            </p>
          </div>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} className="text-white/60" />
          </button>
        </div>

        <div className="p-4">
          <Link
            href="/dashboard/enrollments"
            className="flex items-center justify-center gap-2 w-full bg-teal text-white py-3 rounded-xl font-bold hover:bg-teal/90 transition-all text-sm"
          >
            <GraduationCap size={18} />
            My Courses
          </Link>
        </div>

        <div className="px-6 py-2">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
            Course Curriculum
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-4 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {enrollment.purchased_course.course_structure.map((header, index) => (
            <div key={header.header_id} className="mb-2">
              <button
                onClick={() => toggleModule(header.header_id)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
              >
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  {openModules[header.header_id] ? (
                    <ChevronDown size={14} className="text-white/60" />
                  ) : (
                    <ChevronRight size={14} className="text-white/60" />
                  )}
                  Module {index + 1}: {header.title}
                </span>
              </button>

              {openModules[header.header_id] && (
                <div className="ml-5 mt-1 space-y-1 border-l border-white/10 pl-2">
                  {header.modules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => {
                        router.push(`/lms?enrollmentId=${enrollmentId}&module=${module.id}`);
                        setIsSidebarOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-left group"
                    >
                      <PlayCircle size={14} className="text-white/40 group-hover:text-teal" />
                      <span className="text-xs font-medium text-white/70 group-hover:text-white line-clamp-2">
                        {module.title}
                      </span>
                    </button>
                  ))}
                  {header.modules.length === 0 && (
                    <div className="px-3 py-2 text-xs text-white/40 italic">
                      No lessons available.
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 transition-colors text-left mt-4">
            <ClipboardList size={16} className="text-white/60" />
            <span className="text-sm font-medium text-white/80">Assignments</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            href="/dashboard"
            className="flex items-center justify-center w-full py-3 rounded-xl font-bold text-white bg-white/5 hover:bg-white/10 transition-all text-sm"
          >
            Back to dashboard
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 bg-white shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-[#00284F]"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-4 border-l border-gray-200 pl-4">
              <span className="text-lg font-black tracking-tighter text-[#00284F]">
                Pathpalz
              </span>
              <nav className="flex items-center gap-4">
                <span className="text-sm font-bold text-teal border-b-2 border-teal py-5">
                  Curriculum
                </span>
              </nav>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-full text-sm font-bold hover:bg-teal/90 transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              Join Meeting
            </button>
            <button className="text-gray-400 hover:text-[#00284F] transition-colors p-2">
              <Bell size={20} />
            </button>
            <button className="text-gray-400 hover:text-[#00284F] transition-colors p-2 hidden sm:block">
              <HelpCircle size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center text-teal font-bold text-sm border border-teal/20 ml-2">
              {enrollment.student.first_name?.[0] || enrollment.student.email[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
