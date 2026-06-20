"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  Calendar,
  Users,
  FileText,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Search,
  Filter,
} from "lucide-react";
import {
  useGetAssignmentSubmissions,
  useGetInstructorAssignment,
  useGradeSubmission,
} from "@/query/training/instructor/assignments";
import { ISubmission } from "@/types/training/assignments";

export default function AssignmentDetailsClient() {
  const { assignmentId } = useParams();
  const { data: assignmentsData, isLoading } = useGetInstructorAssignment();
  const { data: submissionsData, isLoading: isLoadingSubmissions } =
    useGetAssignmentSubmissions({ assignmentId: assignmentId as string });
  const { mutate: gradeSubmission, isPending: isGrading } =
    useGradeSubmission();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [scoringSubmission, setScoringSubmission] =
    useState<ISubmission | null>(null);
  const [scoreInput, setScoreInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");
  const [statusInput, setStatusInput] = useState("passed");

  // Find assignment
  let assignment = Array.isArray(assignmentsData?.data)
    ? assignmentsData.data.find(
        (a: any) => String(a.id) === String(assignmentId),
      )
    : null;

  // If not found in API, use mock data fallback to prevent empty state while building
  if (!assignment) {
    assignment = {
      id: parseFloat(assignmentId as string),
      title: "Midterm Algorithms Paper",
      deadline: "2023-10-12T23:59:00Z",
      // statusText: "4 DAYS LEFT",
      // statusColor: "text-red-600 bg-red-50 border-red-100",
      description:
        "Please submit your final algorithms research paper here. Ensure all references are formatted in IEEE style.",
    } as any;
  }

  const deadlineDate = assignment?.deadline
    ? new Date(assignment.deadline).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No deadline set";

  const moduleName = assignment?.module?.title || "Unknown Module";

  const formatDate = (dateStr?: string | null) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "No date";

  // Stats
  const totalSubmissions = submissionsData?.length || 0;
  const gradedCount =
    submissionsData?.filter((s) => s.status === "Graded").length || 0;
  const pendingCount = totalSubmissions - gradedCount;

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scoringSubmission) return;

    if (!scoreInput) {
      alert("Please enter a score before saving.");
      return;
    }

    gradeSubmission(
      {
        submissionId: scoringSubmission.id,
        data: {
          score: scoreInput,
          feedback: feedbackInput,
          status: statusInput,
        },
      },
      {
        onSuccess: () => {
          setScoringSubmission(null);
          setScoreInput("");
          setFeedbackInput("");
          setStatusInput("passed");
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Link
              href="/dashboard/instructor/assignments"
              className="hover:text-teal transition-colors"
            >
              Assignments
            </Link>
            <ChevronRight size={14} className="mx-1" />
            <span className="font-bold text-[#00284F] truncate max-w-50 sm:max-w-md">
              {assignment?.title}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#00284F] mb-1 capitalize">
            {assignment?.title}
          </h1>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="bg-gray-100  py-1 rounded-md text-gray-700 font-semibold border border-gray-200">
              {moduleName}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              Due: {deadlineDate}
            </span>
          </div>
        </div>
      </div>

      {/* Assignment Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal/10 text-teal rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Total Submissions
            </p>
            <p className="text-2xl font-extrabold text-[#00284F]">
              {totalSubmissions}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Graded
            </p>
            <p className="text-2xl font-extrabold text-[#00284F]">
              {gradedCount}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-orange-100 shadow-sm flex items-center gap-4 border-l-4 border-l-orange-500">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Pending Review
            </p>
            <p className="text-2xl font-extrabold text-[#00284F]">
              {pendingCount}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-[#00284F] mb-3">
          Assignment Description
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {assignment?.description || "No description provided."}
        </p>
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
          <h2 className="text-lg font-bold text-[#00284F] flex items-center gap-2">
            Student Submissions
          </h2>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none w-full sm:w-64"
              />
            </div>

            <div className="relative">
              <Filter className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none appearance-none font-medium cursor-pointer bg-white"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Graded">Graded</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase tracking-widest bg-gray-50/20 border-b border-gray-100 font-black">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Submitted At</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {submissionsData?.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No submissions found matching your filters.
                  </td>
                </tr>
              ) : (
                submissionsData?.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-gray-50/50 transition-colors group text-gray-600"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-[#00284F]">
                          {sub.student.first_name} {sub.student.last_name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {sub.student.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs font-medium">
                      {formatDate(sub.submitted_at)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          sub.status === "Graded"
                            ? "bg-green-50 text-green-600 border border-green-100"
                            : "bg-orange-50 text-orange-600 border border-orange-100"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {sub.score !== null ? (
                        <span className="font-bold text-[#00284F]">
                          {sub.score} / 100
                        </span>
                      ) : (
                        <span className="text-gray-400 italic text-xs">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setScoringSubmission(sub)}
                          className="px-3 py-1.5 bg-[#00284F] text-white text-xs font-bold rounded hover:bg-[#001D39] transition-colors"
                        >
                          {sub.status === "passed" ? "Edit Score" : "Grade"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Submission Modal */}
      {scoringSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#00284F]/40 backdrop-blur-sm"
            onClick={() => setScoringSubmission(null)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#00284F]">
                Grade Submission
              </h3>
              <button
                onClick={() => setScoringSubmission(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>

            <form
              onSubmit={handleSaveScore}
              className="p-6 space-y-5 text-black"
            >
              <div>
                <p className="text-xs text-gray-500 mb-1">Student</p>
                <p className="font-bold text-[#00284F]">
                  {scoringSubmission.student.first_name}{" "}
                  {scoringSubmission.student.last_name}
                </p>
              </div>

              {scoringSubmission.submission_files.map((f, idx: number) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <FileText className="text-teal w-5 h-5" />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-700">
                          {f.file_name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={f.file_path}
                    target="_blank"
                    className="text-teal cursor-pointer hover:text-teal/80 text-xs font-bold flex items-center gap-1"
                  >
                    <Eye size={14} /> View
                  </a>
                </div>
              ))}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Score (out of 100)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max="100"
                  value={scoreInput || scoringSubmission.score || ""}
                  onChange={(e) => setScoreInput(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Feedback (Optional)
                </label>
                <textarea
                  rows={4}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder="Provide constructive feedback for the student..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none resize-none"
                />
              </div>

              <div>
                <select
                  value={statusInput}
                  onChange={(e) => {
                    setStatusInput(e.target.value);
                  }}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none"
                >
                  <option value="passed">Passed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setScoringSubmission(null)}
                  className="px-5 py-2.5 border border-gray-200 text-gray-600 font-bold rounded-lg text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal text-white font-bold rounded-lg text-sm hover:bg-teal/90 shadow-sm"
                >
                  Save Score
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
