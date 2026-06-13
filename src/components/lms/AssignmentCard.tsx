"use client";

import React from "react";
import { Clock, ArrowRight, CheckCircle, AlertTriangle, FileText } from "lucide-react";

export type AssignmentStatus = "to-do" | "submitted" | "graded" | "upcoming";

export interface AssignmentProps {
  id: number | string;
  title: string;
  moduleTitle?: string;
  dueDate?: string | null;
  points?: { obtained?: number; total?: number } | null;
  status?: AssignmentStatus;
  priority?: "high" | "normal";
}

export default function AssignmentCard({
  id,
  title,
  moduleTitle,
  dueDate,
  points,
  status = "to-do",
  priority = "normal",
}: AssignmentProps) {
  const isHigh = priority === "high";

  const leftAccent = isHigh
    ? "border-l-4 border-red-500"
    : status === "graded"
    ? "border-l-4 border-emerald-400"
    : "border-l-4 border-transparent";

  return (
    <div
      className={`rounded-xl border border-gray-100 p-4 flex items-center justify-between ${leftAccent} bg-white`}
    >
      <div className="flex items-start gap-4 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
          <FileText size={18} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h4 className="text-sm font-bold text-[#00284F] truncate">{title}</h4>
            {isHigh && (
              <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-bold">HIGH PRIORITY</span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1 truncate">{moduleTitle}</p>
          <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
            <div className="inline-flex items-center gap-1">
              <Clock size={14} />
              <span>{dueDate ?? "No due date"}</span>
            </div>
            {points && (
              <div className="inline-flex items-center gap-1">{points.obtained ?? "-"}/{points.total ?? "-"} pts</div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {status === "to-do" && (
          <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-bold">To Do</button>
        )}

        {status === "upcoming" && (
          <button className="px-4 py-2 rounded-lg bg-gray-50 text-gray-600 text-sm font-bold">Upcoming</button>
        )}

        {status === "graded" && (
          <button className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold">View Feedback</button>
        )}

        {status === "submitted" && (
          <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-bold">Submitted</button>
        )}

        {/* Primary action for to-do / upcoming */}
        {status === "to-do" && (
          <button className="px-4 py-2 rounded-lg bg-teal text-white text-sm font-bold flex items-center gap-2">
            Submit Assignment <ArrowRight size={14} />
          </button>
        )}

        {isHigh && (
          <div className="text-red-500 text-xs font-bold">Due Soon</div>
        )}
      </div>
    </div>
  );
}
