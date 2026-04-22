"use client";

import React from "react";
import { useGetMyEnrollments } from "@/query/training/enrollments";
import { BookOpen, GraduationCap, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardOverviewPage() {
  const { data: enrollments } = useGetMyEnrollments();

  const stats = [
    { name: "Active Tracks", value: enrollments?.length || 0, icon: <BookOpen className="text-teal" />, color: "bg-teal/10" },
    { name: "Completed", value: 0, icon: <GraduationCap className="text-violet-600" />, color: "bg-violet-50" },
    { name: "Learning Hours", value: "0h", icon: <TrendingUp className="text-sky-600" />, color: "bg-sky-50" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold text-[#00284F]">Welcome back!</h2>
        <p className="text-gray-500">Here's what's happening with your learning journey today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-5 shadow-sm hover:shadow-md transition-all">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.name}</p>
              <p className="text-2xl font-black text-[#00284F]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enrollments */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#00284F]">Recent Enrollments</h3>
            <Link href="/dashboard/enrollments" className="text-sm font-bold text-teal hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {enrollments?.slice(0, 3).map((item) => (
              <div key={item.enrollment_id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal font-bold">
                    {item.training.title[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#00284F]">{item.training.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Enrolled {new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${
                   item.payment.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {item.payment.status}
                </div>
              </div>
            )) || (
              <p className="text-sm text-gray-400 italic py-4">No recent enrollments to show.</p>
            )}
          </div>
        </div>

        {/* Quick Actions / Recommendations */}
        <div className="bg-[#00284F] rounded-3xl p-8 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10 h-full flex flex-col items-start justify-between space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Ready to level up?</h3>
              <p className="text-white/60 text-sm max-w-xs">Explore more tracks curated just for your career goals.</p>
            </div>
            <Link 
              href="/training"
              className="px-6 h-12 bg-teal text-white rounded-xl font-bold flex items-center gap-2 hover:bg-white hover:text-teal transition-all shadow-lg shadow-teal/20"
            >
              Discover More <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
