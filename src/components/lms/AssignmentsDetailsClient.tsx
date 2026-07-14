"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, FileText, Download, Loader2 } from "lucide-react";
import { IAssignment, ISubmission } from "@/types/training/assignments";
import { useGetStudentAssignments } from "@/query/training/student/assignment";

type Props = {
  assignmentId: string;
};

const AssignmentsDetailsClient: React.FC<Props> = ({ assignmentId }) => {
  const { data: assignments, isLoading } = useGetStudentAssignments();

  const enrollmentId = useSearchParams().get("enrollmentId") || "";
  const assignment = assignments?.data?.find(
    (a) => String(a.id) === assignmentId,
  );

  const [selectedSubmission, setSelectedSubmission] =
    useState<ISubmission | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="text-center text-gray-500 py-12">
        Assignment not found.
      </div>
    );
  }

  const submissions = assignment.submissions || [];

  const deadlineLabel = assignment.deadline
    ? new Date(assignment.deadline).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No deadline";

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in duration-300 py-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-2">
            <Link href="/lms" className="hover:text-teal">
              My Courses
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-500">{assignment?.module?.title}</span>

            <span className="mx-2">›</span>
            <span className="text-[#00284F] font-bold">{assignment.title}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#00284F] mb-1">
            {assignment.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Link to the dedicated submit page handled by LMSPageContent routing */}
          <Link
            href={`/lms/?enrollmentId=${enrollmentId || ""}&view=submit&assignmentId=${assignment.id}`}
            className="bg-teal text-white px-4 py-2 rounded-lg font-bold"
          >
            Submit Assignment
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <Clock />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Duration
              </p>
              <p className="font-bold text-[#00284F]">
                {assignment.duration_minutes} Minutes
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <Calendar />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Deadline
              </p>
              <p className="font-bold text-[#00284F]">{deadlineLabel}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <FileText className="text-black" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Total Attempts
              </p>
              <p className="font-bold text-[#00284F]">{submissions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col items-start justify-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Current Score
          </p>
          <p className="font-extrabold text-[#00284F] text-2xl mt-2">
            {assignment.my_submission?.score ?? "-"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#00284F] mb-3">
              Description
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {assignment.description}
            </p>

            <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-lg">
              <p className="text-sm text-orange-600 font-bold">
                Note: Submissions must be in Jupyter Notebook (.ipynb) or PDF
                format including all visualization plots.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm overflow-hidden">
            <h3 className="text-lg font-bold text-[#00284F] mb-4">
              Submission History
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase tracking-widest bg-gray-50 border-b border-gray-100 font-black">
                    <th className="px-6 py-3">Date Submitted</th>
                    <th className="px-6 py-3">Attempt</th>
                    <th className="px-6 py-3">Marks</th>
                    <th className="px-6 py-3">Result</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {submissions.map((s) => (
                    <tr key={s.id} className="group hover:bg-gray-50/50">
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(s.submitted_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {assignment.submissions.length}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {s.score ?? "-"}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-100">
                          {s.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedSubmission(s)}
                          className="text-teal font-bold"
                        >
                          View Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {selectedSubmission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSelectedSubmission(null)}
            />
            <div className="relative bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold text-[#00284F]">
                  Submission Report
                </h3>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-xl leading-none">&times;</span>
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <p className="text-xs text-gray-500">
                  Submitted:{" "}
                  {new Date(selectedSubmission.submitted_at).toLocaleString()}
                </p>
                <p className="font-bold">
                  Score: {selectedSubmission.score ?? "-"}
                </p>
                <div>
                  <h4 className="font-bold text-sm mt-2">Feedback</h4>
                  <p className="text-sm text-gray-700">
                    {selectedSubmission.feedback ?? "No feedback provided."}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-sm mt-2">Files</h4>
                  <div className="mt-2">
                    {selectedSubmission.submission_files?.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border border-gray-100 rounded-lg p-2 mb-2"
                      >
                        <div className="flex items-center gap-3">
                          <FileText />
                          <span className="text-sm text-gray-700">
                            {f.file_name}
                          </span>
                        </div>
                        <a
                          href={f.file_path || "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="text-teal font-bold"
                        >
                          View
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <aside className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h4 className="text-sm font-bold text-[#00284F] mb-3">
              Assignment Attachments
            </h4>
            <div className="space-y-3">
              {assignment.attachments?.map((a) => (
                <div
                  key={a.file_name}
                  className="flex items-center justify-between gap-3 border border-gray-100 rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                      <FileText />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#00284F] truncate">
                        {a.file_name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(a.file_size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <a
                    href={a.file_url}
                    className="text-teal hover:underline flex items-center gap-2"
                  >
                    <Download size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AssignmentsDetailsClient;
