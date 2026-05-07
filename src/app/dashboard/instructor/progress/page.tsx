"use client";

import React, { useState } from "react";
import { useGetTracks } from "@/query/training/tracks";
import { useGetTrackModules, useUpdateInstructorProgress } from "@/query/training/instructor";
import { 
  BookOpen, 
  Link as LinkIcon, 
  CheckCircle, 
  Loader2, 
  AlertCircle, 
  ChevronRight,
  ShieldCheck,
  Video,
  Layout
} from "lucide-react";
import { IInstructorProgressRequest } from "@/types/training/instructor";

export default function InstructorProgressPage() {
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<IInstructorProgressRequest>>({
    course_video_url: "",
    instructor_marked: "completed",
  });
  const [successMsg, setSuccessMsg] = useState("");

  const { data: tracks, isLoading: isLoadingTracks } = useGetTracks();
  const { data: modulesData, isLoading: isLoadingModules } = useGetTrackModules(selectedTrackId as number);
  const { mutate: updateProgress, isPending, isError, error } = useUpdateInstructorProgress();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModuleId) return;

    setSuccessMsg("");
    
    updateProgress({
      course_module_id: selectedModuleId,
      course_video_url: formData.course_video_url,
      instructor_marked: formData.instructor_marked,
    } as IInstructorProgressRequest, {
      onSuccess: () => {
        setSuccessMsg("Progress updated successfully!");
        setFormData({
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
    <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#00284F] flex items-center gap-3">
          <Layout className="text-teal" />
          Instructor Portal
        </h1>
        <p className="mt-2 text-gray-500">Manage course modules and update track progress for your students.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Track Selection */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Your Tracks</h2>
            {isLoadingTracks ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-teal" />
              </div>
            ) : (
              <div className="space-y-2">
                {tracks?.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      setSelectedTrackId(track.id);
                      setSelectedModuleId(null);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                      selectedTrackId === track.id
                        ? "border-teal bg-teal/5 text-teal shadow-sm"
                        : "border-gray-100 hover:border-teal/30 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-bold text-xs truncate pr-2">{track.title}</span>
                    <ChevronRight size={14} className={selectedTrackId === track.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modules and Form */}
        <div className="lg:col-span-3 space-y-8">
          {!selectedTrackId ? (
            <div className="h-64 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center bg-white/50">
              <BookOpen size={48} className="text-gray-200 mb-4" />
              <h3 className="text-lg font-bold text-gray-500">Select a Track</h3>
              <p className="text-gray-400 max-w-xs">Select a training track to manage its modules.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Modules List */}
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-sm font-bold text-gray-900">Select Module</h2>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[500px]">
                  {isLoadingModules ? (
                    <div className="flex justify-center py-10">
                      <Loader2 className="animate-spin text-teal" />
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {modulesData?.modules?.map((module) => (
                        <button
                          key={module.id}
                          onClick={() => setSelectedModuleId(module.id)}
                          className={`w-full text-left p-4 transition-colors flex items-center justify-between group ${
                            selectedModuleId === module.id ? "bg-teal/5" : "hover:bg-gray-50/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${selectedModuleId === module.id ? "bg-teal text-white" : "bg-gray-100 text-gray-400 group-hover:bg-teal/10 group-hover:text-teal"}`}>
                              <BookOpen size={16} />
                            </div>
                            <span className={`text-sm font-semibold transition-colors ${selectedModuleId === module.id ? "text-teal" : "text-gray-700"}`}>
                              {module.title}
                            </span>
                          </div>
                          {selectedModuleId === module.id && <CheckCircle size={16} className="text-teal" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Update Form */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                {!selectedModuleId ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <Video size={48} className="text-gray-100 mb-4" />
                    <p className="text-gray-400 font-medium">Select a module to update its progress and video links.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="mb-6 text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                      Update Progress
                    </h2>

                    {successMsg && (
                      <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-700 border border-green-200 text-sm">
                        <CheckCircle className="h-5 w-5" />
                        <p className="font-medium">{successMsg}</p>
                      </div>
                    )}

                    {isError && (
                      <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700 border border-red-200 text-sm">
                        <AlertCircle className="h-5 w-5" />
                        <p className="font-medium">
                          {(error as any)?.response?.data?.message || "Failed to update progress."}
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="course_video_url" className="mb-2 block text-xs font-bold text-gray-500 uppercase">
                          Training Video URL
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <Video className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="url"
                            id="course_video_url"
                            name="course_video_url"
                            required
                            value={formData.course_video_url}
                            onChange={handleChange}
                            className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 pl-10 text-sm text-gray-900 transition-colors focus:border-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal/20"
                            placeholder="https://youtube.com/..."
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="instructor_marked" className="mb-2 block text-xs font-bold text-gray-500 uppercase">
                          Status
                        </label>
                        <div className="relative">
                          <select
                            id="instructor_marked"
                            name="instructor_marked"
                            value={formData.instructor_marked}
                            onChange={handleChange}
                            className="block w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 transition-colors focus:border-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal/20"
                          >
                            <option value="traning_link_uploaded">Live Session Link</option>
                            <option value="recorded_traning_link_uploaded">Recorded Link</option>
                            <option value="completed">Completed</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                            <ChevronRight size={16} className="rotate-90 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isPending}
                          className="flex w-full items-center justify-center rounded-xl bg-teal px-5 py-3 text-sm font-bold text-white transition-all hover:bg-teal/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Update Module"
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
