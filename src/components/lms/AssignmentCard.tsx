"use client";

import React from "react";
import {
  Clock,
  ArrowRight,
  FileText,
  CheckCircle,
  FileCheck,
  AlertTriangle,
} from "lucide-react";
import { IAssignment } from "@/types/training/assignments";
import { useRouter } from "next/navigation";

export default function AssignmentCard({
  assignment,
  enrollmentId,
}: {
  assignment: IAssignment;
  enrollmentId: string;
}) {
  const router = useRouter();

  const deadlineDate =
    assignment.deadline &&
    !Number.isNaN(new Date(assignment.deadline).getTime())
      ? new Date(assignment.deadline)
      : null;

  const now = Date.now();

  // compute time-based flags
  const timeDiff = deadlineDate ? deadlineDate.getTime() - now : null;
  const oneDayMs = 24 * 60 * 60 * 1000;
  const isOverdue = timeDiff !== null && timeDiff < 0;
  const isDueSoon = timeDiff !== null && timeDiff > 0 && timeDiff <= oneDayMs;

  // determine submission state: prefer my_submission.status, fallback to assignment.status
  const submissionState =
    assignment.my_submission?.status || (assignment as any).status || "to-do";

  // visual state helpers
  const isGraded = submissionState === "passed" || submissionState === "failed";
  const isSubmitted =
    submissionState === "submitted" || submissionState === "submitted";
  const isUpcoming =
    submissionState === "upcoming" || submissionState === "upcoming";

  // left accent class
  const leftAccent =
    isOverdue || isDueSoon
      ? "border-l-4 border-red-500"
      : isGraded
        ? "border-l-4 border-emerald-400"
        : isSubmitted
          ? "border-l-4 "
          : "border-l-4 border-transparent";

  // badge label and classes
  const badge = (() => {
    if (isOverdue)
      return {
        text: "OVERDUE",
        classes: "text-xs text-red-600 font-medium",
      };
    if (isDueSoon)
      return {
        text: "HIGH PRIORITY",
        classes: "text-xs text-red-600 font-medium",
      };
    if (isGraded)
      return {
        text: "GRADED",
        classes: "text-xs text-emerald-700 font-medium",
      };
    if (isSubmitted)
      return {
        text: "SUBMITTED",
        classes: "text-xs text-gray-600 font-medium",
      };
    return null;
  })();

  const formattedDeadline = deadlineDate
    ? deadlineDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No due date";

  // const leftAccent = isHigh
  //   ? "border-l-4 border-red-500"
  //   : // : assignment.status === "graded"
  //     //   ? "border-l-4 border-emerald-400"
  //     "border-l-4 border-transparent";

  return (
    <div
      className={`rounded-xl shadow-sm border-gray-600 p-4 flex items-center justify-between ${leftAccent} bg-white`}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div
          className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center ${
            isOverdue
              ? "text-red-600"
              : isGraded
                ? "text-emerald-600"
                : isSubmitted
                  ? "text-teal-600"
                  : "text-gray-500"
          } shrink-0`}
        >
          {isOverdue ? (
            <AlertTriangle size={18} />
          ) : isGraded ? (
            <CheckCircle size={18} />
          ) : isSubmitted ? (
            <FileCheck size={18} />
          ) : (
            <FileText size={18} />
          )}
        </div>

        <div className="min-w-0">
          <div className="">
            {badge && <span className={badge.classes}>{badge.text}</span>}
            <h4 className="text-xl capitalize font-bold text-[#00284F] truncate">
              {assignment.title}
            </h4>
          </div>
          <p className="text-xs text-gray-400 mt-1 truncate">
            {assignment?.module?.title}
          </p>
          <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
            <div className="inline-flex items-center gap-1">
              <Clock size={14} />
              <span>{formattedDeadline ?? "No due date"}</span>
            </div>
            <div className="inline-flex items-center gap-1">0/100 pts</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* {status === "to-do" && (
          <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-bold">
            To Do
          </button>
        )}

        {status === "upcoming" && (
          <button className="px-4 py-2 rounded-lg bg-gray-50 text-gray-600 text-sm font-bold">
            Upcoming
          </button>
        )} 

        {status === "graded" && (
          <button className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold">
            View Feedback
          </button>
        )}

        {status === "submitted" && (
          <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-bold">
            Submitted
          </button>
        )}
*/}

        {isGraded ? (
          <button
            type="button"
            onClick={() =>
              router.push(
                `/lms/?enrollmentId=${enrollmentId}&assignmentId=${assignment.id}`,
              )
            }
            className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold"
          >
            View Feedback
          </button>
        ) : isSubmitted ? (
          <button
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-bold"
            disabled
          >
            Submitted
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              router.push(
                `/lms/?enrollmentId=${enrollmentId}&view=submit&assignmentId=${assignment.id}`,
              )
            }
            className="px-4 py-2 rounded-lg bg-teal text-white text-sm font-bold flex items-center gap-2"
          >
            Submit Assignment <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
