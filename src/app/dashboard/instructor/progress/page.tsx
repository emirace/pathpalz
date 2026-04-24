"use client";

import React, { useState } from "react";
import { useUpdateInstructorProgress } from "@/query/training/instructor";
import { BookOpen, Link as LinkIcon, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { IInstructorProgressRequest } from "@/types/training/instructor";

export default function InstructorProgressPage() {
  const [formData, setFormData] = useState<IInstructorProgressRequest>({
    module_title: "",
    course_video_url: "",
    instructor_marked: "completed",
  });
  const [successMsg, setSuccessMsg] = useState("");

  const { mutate: updateProgress, isPending, isError, error } = useUpdateInstructorProgress();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    
    updateProgress(formData, {
      onSuccess: () => {
        setSuccessMsg("Progress updated successfully!");
        setFormData({
          module_title: "",
          course_video_url: "",
          instructor_marked: "completed",
        });
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#00284F]">Instructor Portal</h1>
        <p className="mt-2 text-gray-500">Update course and track progress for your students.</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-6 text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
          Submit Module Progress
        </h2>

        {successMsg && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-700 border border-green-200">
            <CheckCircle className="h-5 w-5" />
            <p className="font-medium">{successMsg}</p>
          </div>
        )}

        {isError && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700 border border-red-200">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">
              {(error as any)?.response?.data?.message || "Failed to update progress. Please try again."}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="module_title" className="mb-2 block text-sm font-semibold text-gray-700">
              Module Title
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <BookOpen className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="module_title"
                name="module_title"
                required
                value={formData.module_title}
                onChange={handleChange}
                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-4 pl-12 text-sm text-gray-900 transition-colors focus:border-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal/20"
                placeholder="e.g. Introduction to React"
              />
            </div>
          </div>

          <div>
            <label htmlFor="course_video_url" className="mb-2 block text-sm font-semibold text-gray-700">
              Course Video URL
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <LinkIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                id="course_video_url"
                name="course_video_url"
                required
                value={formData.course_video_url}
                onChange={handleChange}
                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-4 pl-12 text-sm text-gray-900 transition-colors focus:border-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal/20"
                placeholder="https://example.com/video"
              />
            </div>
          </div>

          <div>
            <label htmlFor="instructor_marked" className="mb-2 block text-sm font-semibold text-gray-700">
              Completion Status
            </label>
            <div className="relative">
              <select
                id="instructor_marked"
                name="instructor_marked"
                value={formData.instructor_marked}
                onChange={handleChange}
                className="block w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-900 transition-colors focus:border-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal/20"
              >
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="pending">Pending</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center rounded-xl bg-teal px-5 py-4 text-sm font-bold text-white transition-all hover:bg-teal/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Update Progress"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
