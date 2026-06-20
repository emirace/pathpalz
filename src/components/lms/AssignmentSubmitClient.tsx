"use client";

import React, { useMemo, useState } from "react";
import { Download, FileText, Info, Lightbulb, Loader2 } from "lucide-react";
import {
  useGetStudentAssignments,
  useSubmitAssignment,
} from "@/query/training/student/assignment";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  assignmentId: string;
};

const formatSize = (bytes: number) => {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

const AssignmentSubmitClient: React.FC<Props> = ({ assignmentId }) => {
  const router = useRouter();
  const { data: assignments, isLoading } = useGetStudentAssignments();

  const { mutate: submitAssignment, isPending: isSubmittingAssignment } =
    useSubmitAssignment();

  const assignment = assignments?.data?.find(
    (a) => String(a.id) === assignmentId,
  );

  const [files, setFiles] = useState<File[]>([]);
  const [agree, setAgree] = useState(false);
  const [submissionNote, setSubmissionNote] = useState("");

  const totalSize = useMemo(
    () => files.reduce((s, f) => s + f.size, 0),
    [files],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles((prev) => [...prev, ...Array.from(e.target.files || [])]);
  };

  const handleRemove = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert("Please confirm the integrity checkbox before submitting.");
      return;
    }
    submitAssignment(
      { assignmentId, data: { files, submission_note: submissionNote } },
      {
        onSuccess: () => {
          setFiles([]);
          setAgree(false);
          setSubmissionNote("");
          router.push(
            `/lms/?enrollmentId=${useSearchParams().get("enrollmentId")}&assignmentId=${assignmentId}`,
          );
        },
      },
    );
  };

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

  const maxSizePerFile = 50 * 1024 * 1024; // 50MB
  const progress = Math.min(
    100,
    Math.round((totalSize / (maxSizePerFile * 5)) * 100),
  );

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in duration-300 py-8">
      <div>
        <div className="text-sm text-gray-500 mb-2">
          <a href="/lms" className="hover:text-teal">
            Assignments
          </a>
          <span className="mx-2">›</span>
          <span className="text-gray-500">{assignment?.module?.title}</span>
          <span className="mx-2">›</span>
          <span className="text-[#00284F] font-bold">Submit</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#00284F] mb-1">
          Submit Assignment
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="text-sm text-black bg-[#6bddec] inline-block px-4 py-1 rounded-4xl mb-2">
                  In Progress
                </div>
                <h1 className="text-2xl font-bold text-[#00284F] mb-1">
                  {assignment.title}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500 text-right">
                  <p className="font-bold text-[#00284F]">Due Date</p>
                  <p className="text-xs">
                    {assignment.deadline
                      ? new Date(assignment.deadline).toLocaleString()
                      : "No deadline"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-100 p-4 rounded-lg border-l-4 border-teal">
              <Info className="text-teal" size={30} />
              <p className="text-sm text-gray-600">
                {" "}
                Please ensure your submission includes the final PDF report,
                source code (as a ZIP), and any datasets used for analysis. Late
                submissions may incur a 10% penalty per day.
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white  border-gray-100 ">
            <div className="text-black">Submission note</div>
            <textarea
              placeholder="Add a note for your submission (optional)"
              className="w-full border border-gray-200 rounded-lg p-3 mb-4 text-black"
              value={submissionNote}
              onChange={(e) => setSubmissionNote(e.target.value)}
            />
            <div className="p-6 border-2 border-dashed rounded-lg text-center mb-4">
              <div className="mb-3 text-teal">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 5 17 10" />
                  <line x1="12" y1="5" x2="12" y2="15" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                Drag and drop your files here
              </p>
              <p className="text-xs text-gray-400 mb-4">
                PDF, DOCX, or ZIP files only. Maximum file size is 50MB.
              </p>

              <label className="inline-flex">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.ipynb,.zip"
                  className="hidden"
                />
                <span className="bg-teal text-white px-4 py-2 rounded-lg font-bold cursor-pointer">
                  Select Files
                </span>
              </label>
            </div>
          </form>

          {files.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-bold text-[#00284F] mb-2">
                Attached Files ({files.length})
              </h4>
              <div className="space-y-2">
                {files.map((f, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 border border-gray-100 rounded-lg p-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                        <FileText />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#00284F] truncate">
                          {f.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatSize(f.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(idx)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h4 className="text-sm font-bold text-[#00284F] mb-3">
              Submission Summary
            </h4>
            <div className="text-sm text-gray-600 mb-4">
              <div className="flex justify-between mb-1">
                <span>Total Files</span>
                <span className="font-bold">{files.length} / 5</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Total Size</span>
                <span className="font-bold">{formatSize(totalSize)}</span>
              </div>

              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-teal"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-100 rounded-lg text-sm text-orange-600">
                <Lightbulb className="mr-2" size={16} />
                <p className="flex-1">
                  Pro-Tip: Use standard naming conventions for your files (e.g.,
                  StudentName_Assignment_v1) to help instructors identify your
                  work easily.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#00284F] rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <input
                id="confirm2"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label htmlFor="confirm2" className="text-sm text-white">
                I confirm this is my own work and complies with the academic
                integrity policy.
              </label>
            </div>
            <div className="mt-4">
              <button
                disabled={
                  !agree || isSubmittingAssignment || files.length === 0
                }
                onClick={(e) => handleSubmit(e as any)}
                className="w-full bg-teal text-white py-3 rounded-xl font-bold disabled:opacity-60"
              >
                {isSubmittingAssignment ? "Submitting..." : "Submit Assignment"}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AssignmentSubmitClient;
