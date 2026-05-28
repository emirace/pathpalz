"use client";

import React, { useState } from "react";
import {
  useGetInstructorAssignedTracks,
  useGetInstructorProgress,
  useGetSubTypeModules,
  useGetTrackModules,
  useGetTypeModules,
  useUpdateInstructorProgress,
} from "@/query/training/instructor";
import {
  BookOpen,
  Link as LinkIcon,
  CheckCircle,
  Loader2,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Video,
  Layout,
  Clock,
  ExternalLink,
} from "lucide-react";
import { IInstructorProgressRequest, IGetProgressResponse } from "@/types/training/instructor";

export default function InstructorProgressPage() {
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<IInstructorProgressRequest>>(
    {
      training_date: new Date().toISOString().split("T")[0],
      meeting_link: "",
      recorded_link: "",
      instructor_marked: "completed",
    },
  );

  const [successMsg, setSuccessMsg] = useState("");

  const { data: assignedTracks, isLoading: isAssignedTracks } =
    useGetInstructorAssignedTracks();
  const { data: moduleProgress, isLoading: isLoadingProgress } =
    useGetInstructorProgress();
  // determine the selected assigned track (contains assigned_to, type, sub_type)
  const selectedAssign = assignedTracks?.find(
    (a) => a.track.id === selectedTrackId,
  );

  const selectedTrackIdSafe = selectedAssign?.track?.id ?? 0;
  const selectedTypeId = selectedAssign?.track?.type?.id ?? 0;
  const selectedSubTypeId = selectedAssign?.track?.sub_type?.id ?? 0;

  // call all hooks but pass safe ids (0 when not available). hooks' `enabled` flags prevent unwanted fetches.
  const { data: trackModulesData, isLoading: isLoadingModules } =
    useGetTrackModules(selectedTrackIdSafe as number);
  const { data: typeModulesData, isLoading: isLoadingTypeModules } =
    useGetTypeModules(selectedTypeId as number);
  const { data: subTypeModulesData, isLoading: isLoadingSubTypeModules } =
    useGetSubTypeModules(selectedSubTypeId as number);

  // resolve the actual modules list and loading state depending on assignment type
  const modules =
    (selectedAssign?.assigned_to === "TrainingTrack" &&
      trackModulesData?.modules) ||
    (selectedAssign?.assigned_to === "Type" && typeModulesData) ||
    (selectedAssign?.assigned_to === "TypeSub" && subTypeModulesData) ||
    [];

  const isLoadingSelectedModules =
    selectedAssign?.assigned_to === "TrainingTrack"
      ? isLoadingModules
      : selectedAssign?.assigned_to === "Type"
        ? isLoadingTypeModules
        : selectedAssign?.assigned_to === "TypeSub"
          ? isLoadingSubTypeModules
          : false;
  const {
    mutate: updateProgress,
    isPending,
    isError,
    error,
  } = useUpdateInstructorProgress();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModuleId) return;

    setSuccessMsg("");

    const selectedModule = modules.find((m: any) => m.id === selectedModuleId);
    updateProgress(
      {
        course_module_id: selectedModuleId,
        type_id: selectedModule?.type_id,
        sub_type_id: selectedModule?.sub_type_id,
        training_date: formData.training_date,
        meeting_link: formData.meeting_link,
        recorded_link: formData.recorded_link,
        instructor_marked: formData.instructor_marked,
      } as IInstructorProgressRequest,
      {
        onSuccess: () => {
          setSuccessMsg("Progress updated successfully!");
          setFormData({
            training_date: new Date().toISOString().split("T")[0],
            meeting_link: "",
            recorded_link: "",
            instructor_marked: "completed",
          });
        },
      },
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const progressData = (moduleProgress as IGetProgressResponse)?.data ?? [];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; label: string }> = {
      completed: { bg: "bg-green-50", text: "text-green-700", label: "Completed" },
      in_progress: { bg: "bg-blue-50", text: "text-blue-700", label: "In Progress" },
      traning_link_uploaded: { bg: "bg-indigo-50", text: "text-indigo-700", label: "Live Link" },
      recorded_traning_link_uploaded: { bg: "bg-purple-50", text: "text-purple-700", label: "Recorded" },
      pending: { bg: "bg-yellow-50", text: "text-yellow-700", label: "Pending" },
    };
    const s = statusMap[status] || { bg: "bg-gray-100", text: "text-gray-600", label: status };
    return (
      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${s.bg} ${s.text}`}>
        {s.label}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#00284F] flex items-center gap-3">
          <Layout className="text-teal" />
          Instructor Portal
        </h1>
        <p className="mt-2 text-gray-500">
          Manage course modules and update track progress for your students.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Track Selection */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
              Your Tracks
            </h2>
            {isAssignedTracks ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-teal" />
              </div>
            ) : (
              <div className="space-y-2">
                {assignedTracks?.map((assign) => (
                  <button
                    key={assign.track.id}
                    onClick={() => {
                      setSelectedTrackId(assign.track.id);
                      setSelectedModuleId(null);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between group ${selectedTrackId === assign.track.id
                        ? "border-teal bg-teal/5 text-teal shadow-sm"
                        : "border-gray-100 hover:border-teal/30 text-gray-400 hover:bg-gray-50"
                      }`}
                  >
                    <span className="font-bold text-xs truncate pr-2">
                      {assign.track.title}
                    </span>
                    <ChevronRight
                      size={14}
                      className={
                        selectedTrackId === assign.track.id
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }
                    />
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
              <h3 className="text-lg font-bold text-gray-500">
                Select a Track
              </h3>
              <p className="text-gray-400 max-w-xs">
                Select a training track to manage its modules.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Modules List */}
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-sm font-bold text-gray-900">
                    Select Module
                  </h2>
                </div>
                <div className="flex-1 overflow-y-auto max-h-125">
                  {isLoadingSelectedModules ? (
                    <div className="flex justify-center py-10">
                      <Loader2 className="animate-spin text-teal" />
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {modules.map((module: any) => (
                        <button
                          key={module.id}
                          onClick={() => setSelectedModuleId(module.id)}
                          className={`w-full text-left p-4 transition-colors flex items-center justify-between group ${selectedModuleId === module.id
                              ? "bg-teal/5"
                              : "hover:bg-gray-50/50"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${selectedModuleId === module.id ? "bg-teal text-white" : "bg-gray-100 text-gray-400 group-hover:bg-teal/10 group-hover:text-teal"}`}
                            >
                              <BookOpen size={16} />
                            </div>
                            <span
                              className={`text-sm font-semibold transition-colors ${selectedModuleId === module.id ? "text-teal" : "text-gray-700"}`}
                            >
                              {module.title}
                            </span>
                          </div>
                          {selectedModuleId === module.id && (
                            <CheckCircle size={16} className="text-teal" />
                          )}
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
                    <p className="text-gray-400 font-medium">
                      Select a module to update its progress and video links.
                    </p>
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
                          {(error as any)?.response?.data?.message ||
                            "Failed to update progress."}
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label
                            htmlFor="training_date"
                            className="mb-2 block text-xs font-bold text-gray-500 uppercase"
                          >
                            Training Date
                          </label>
                          <input
                            type="date"
                            id="training_date"
                            name="training_date"
                            required
                            value={formData.training_date}
                            onChange={handleChange}
                            className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 transition-colors focus:border-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal/20"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="meeting_link"
                            className="mb-2 block text-xs font-bold text-gray-500 uppercase"
                          >
                            Meeting Link (Live)
                          </label>
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                              <Video className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="url"
                              id="meeting_link"
                              name="meeting_link"
                              value={formData.meeting_link}
                              onChange={handleChange}
                              className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 pl-10 text-sm text-gray-900 transition-colors focus:border-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal/20"
                              placeholder="https://zoom.us/..."
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="recorded_link"
                            className="mb-2 block text-xs font-bold text-gray-500 uppercase"
                          >
                            Recorded Session Link
                          </label>
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                              <LinkIcon className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="url"
                              id="recorded_link"
                              name="recorded_link"
                              value={formData.recorded_link}
                              onChange={handleChange}
                              className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 pl-10 text-sm text-gray-900 transition-colors focus:border-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal/20"
                              placeholder="https://youtube.com/..."
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="instructor_marked"
                          className="mb-2 block text-xs font-bold text-gray-500 uppercase"
                        >
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
                            <option value="traning_link_uploaded">
                              Live Session Link
                            </option>
                            <option value="recorded_traning_link_uploaded">
                              Recorded Link
                            </option>
                            <option value="completed">Completed</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                            <ChevronRight
                              size={16}
                              className="rotate-90 text-gray-400"
                            />
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

      {/* Progress History Table */}
      <div className="mt-10">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#00284F] flex items-center gap-2">
                <Clock size={20} className="text-teal" />
                Progress History
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Overview of all module progress and session records.
              </p>
            </div>
            {progressData.length > 0 && (
              <span className="text-xs font-bold text-teal bg-teal/10 rounded-full px-3 py-1">
                {progressData.length} module{progressData.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {isLoadingProgress ? (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-teal" />
            </div>
          ) : progressData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <BookOpen size={40} className="text-gray-200 mb-3" />
              <p className="text-sm font-medium text-gray-500">No progress recorded yet.</p>
              <p className="text-xs text-gray-400 mt-1">
                Update a module above to start tracking progress.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="text-xs text-gray-500 uppercase bg-gray-50/30">
                    <th className="px-6 py-4 font-bold">Module</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Sessions</th>
                    <th className="px-6 py-4 font-bold">Latest Session</th>
                    <th className="px-6 py-4 font-bold">Links</th>
                    <th className="px-6 py-4 font-bold">Completed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {progressData.map((item) => {
                    const latestSession = item.sessions?.length
                      ? item.sessions.reduce((latest, s) =>
                          new Date(s.training_date) > new Date(latest.training_date) ? s : latest
                        )
                      : null;

                    return (
                      <tr
                        key={item.progress_id}
                        className="text-gray-600 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-teal/10 text-teal">
                              <BookOpen size={14} />
                            </div>
                            <span className="font-semibold text-gray-900">
                              {item.module?.title || `Module #${item.progress_id}`}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 text-gray-700 font-medium">
                            <ShieldCheck size={14} className="text-gray-400" />
                            {item.sessions?.length || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {latestSession ? (
                            <div className="space-y-0.5">
                              <p className="text-gray-900 font-medium text-xs">
                                {new Date(latestSession.training_date).toLocaleDateString(undefined, {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                              <p className="text-[10px] text-gray-400">
                                {getStatusBadge(latestSession.status)}
                              </p>
                            </div>
                          ) : (
                            <span className="text-gray-300 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {latestSession?.meeting_link && (
                              <a
                                href={latestSession.meeting_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                title="Live session link"
                              >
                                <Video size={12} />
                                Live
                                <ExternalLink size={10} />
                              </a>
                            )}
                            {latestSession?.recorded_link && (
                              <a
                                href={latestSession.recorded_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-800 transition-colors"
                                title="Recorded session link"
                              >
                                <LinkIcon size={12} />
                                Recorded
                                <ExternalLink size={10} />
                              </a>
                            )}
                            {!latestSession?.meeting_link && !latestSession?.recorded_link && (
                              <span className="text-gray-300 text-xs">—</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {item.completed_at ? (
                            <div className="flex items-center gap-1.5 text-green-600">
                              <CheckCircle size={14} />
                              <span className="text-xs font-medium">
                                {new Date(item.completed_at).toLocaleDateString(undefined, {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-300 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
