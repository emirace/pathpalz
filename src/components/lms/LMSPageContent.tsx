"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import ReactPlayer from "react-player";

import { useGetEnrollmentById } from "@/query/training/enrollments";
import {
  useGetModuleAttendance,
  useGetModuleSessions,
  useMarkAttendance,
  useMarkCourseAsCompleted,
} from "@/query/training/student";
import { Play, Download, FileText, Loader2, Video } from "lucide-react";
import AssignmentsOverview from "./AssignmentsOverview";
import { useGetUser } from "@/query/auth";
import AssignmentsDetailsClient from "./AssignmentsDetailsClient";

const getDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getTrainingDateKey = (trainingDate?: string) => {
  if (!trainingDate) return "";
  if (!trainingDate.includes("T")) return trainingDate.slice(0, 10);

  const parsedDate = new Date(trainingDate);
  return Number.isNaN(parsedDate.getTime()) ? "" : getDateKey(parsedDate);
};

const parseTrainingDate = (trainingDate?: string) => {
  if (!trainingDate) return null;

  if (!trainingDate.includes("T")) {
    const [year, month, day] = trainingDate.slice(0, 10).split("-").map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
  }

  const parsedDate = new Date(trainingDate);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

const formatTrainingDate = (
  trainingDate: string | undefined,
  options: Intl.DateTimeFormatOptions,
) => {
  const parsedDate = parseTrainingDate(trainingDate);
  return parsedDate ? parsedDate.toLocaleDateString(undefined, options) : "";
};

const isDirectVideoLink = (url: string) =>
  /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);

const formatFileSize = (bytes: number) => {
  if (!bytes) return "Unknown size";

  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const size = bytes / 1024 ** unitIndex;

  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};

const getFileExtension = (fileName: string) => {
  const extension = fileName.split(".").pop();
  return extension && extension !== fileName ? extension.toUpperCase() : "FILE";
};

function LMSPageContent() {
  const searchParams = useSearchParams();
  const enrollmentId = searchParams.get("enrollmentId");
  const moduleIdParam = searchParams.get("module");
  const viewParam = searchParams.get("view");
  const assignmentId = searchParams.get("assignmentId");
  const [selectedSessionSelection, setSelectedSessionSelection] = useState<{
    moduleId?: number;
    index: number;
  }>({ index: 0 });

  const { data: enrollment, isLoading: isEnrollmentLoading } =
    useGetEnrollmentById(enrollmentId || "");
  const moduleId = moduleIdParam ? Number(moduleIdParam) : undefined;

  const { data: user } = useGetUser();

  const { data: sessionData, isLoading: isSessionLoading } =
    useGetModuleSessions(moduleId || 0);

  const markAttendanceMutation = useMarkAttendance();
  const { data: attendanceData, isLoading: isLoadingAttendance } =
    useGetModuleAttendance(moduleId as number);
  const markCompletedMutation = useMarkCourseAsCompleted();
  const sessions = sessionData?.sessions || [];
  const selectedSessionIndex =
    selectedSessionSelection.moduleId === moduleId
      ? selectedSessionSelection.index
      : 0;
  const selectedSession = sessions[selectedSessionIndex] || sessions[0];
  const todayKey = getDateKey(new Date());
  const selectedSessionDateKey = getTrainingDateKey(
    selectedSession?.training_date,
  );
  const hasLiveSession = !!selectedSession?.meeting_link;
  const hasRecordedSession = !!selectedSession?.recorded_link;
  const canJoinLiveSession =
    hasLiveSession && selectedSessionDateKey === todayKey;
  const lessonResources = sessionData?.lesson_notes || [];

  const handleMarkAttended = () => {
    if (!moduleId) return;
    markAttendanceMutation.mutate(
      { course_module_id: moduleId, attended: true },
      {
        onSuccess: () => alert("Marked as attended!"),
        onError: (error: any) =>
          alert(error.response?.data?.message || "Failed to mark attendance"),
      },
    );
  };

  const handleMarkCompleted = () => {
    if (!sessionData?.module?.title) return;
    if (!moduleId) return;
    markCompletedMutation.mutate(
      { module_title: sessionData.module.title, course_module_id: moduleId },
      {
        onSuccess: () => alert("Module marked as completed!"),
        onError: (err: any) =>
          alert(err.response?.data?.message || "Failed to mark as completed."),
      },
    );
  };

  const isAttended = (moduleId: number) => {
    // Check if the current user has attended this module
    const result = attendanceData?.attendance?.some((record) => {
      return (
        record.course_module_id === moduleId &&
        record?.user?.external_id === user?.id.toString() &&
        record.attended
      );
    });
    console.log("Attendance check for module", moduleId, ":", result);
    return result;
  };

  if (isEnrollmentLoading || !enrollmentId) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-teal" size={32} />
      </div>
    );
  }

  if (viewParam === "assignments") {
    return <AssignmentsOverview enrollment={enrollment} />;
  }

  if (assignmentId) {
    return <AssignmentsDetailsClient assignmentId={assignmentId} />;
  }

  if (!moduleId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mb-6">
          <Play size={32} className="text-teal" />
        </div>
        <h2 className="text-2xl font-bold text-[#00284F] mb-2">
          Welcome to Your Course
        </h2>
        <p className="text-gray-500 max-w-md">
          Select a module from the sidebar on the left to start learning.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Courses</span>
        <span>›</span>
        <span>{enrollment?.purchased_course.title}</span>
        <span>›</span>
        <span className="font-bold text-[#00284F]">
          {sessionData?.module?.title || `Module ${moduleId}`}
        </span>
      </div>

      <h1 className="text-3xl font-bold text-[#00284F] mb-2">
        {sessionData?.module?.title || "Loading Module..."}
      </h1>

      {/* Estimated time pill */}
      <div className="inline-flex items-center gap-1.5 bg-teal text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        {/* 45m remaining */}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content (Video & Resources) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Video Player Area */}
          <div className="bg-black aspect-video rounded-2xl relative overflow-hidden group shadow-lg">
            {isSessionLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="animate-spin text-white" size={32} />
              </div>
            ) : hasRecordedSession && selectedSession?.recorded_link ? (
              <>
                {/* {isDirectVideoLink(selectedSession.recorded_link) ? (
                  <video
                    className="absolute inset-0 h-full w-full"
                    controls
                    src={selectedSession.recorded_link}
                  />
                ) : ( */}
                <ReactPlayer
                  className="absolute inset-0 h-full w-full"
                  src={selectedSession.recorded_link}
                  title={`${sessionData?.module?.title || "Session"} recording`}
                  // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  // allowFullScreen
                  controls={true}
                  height="100%"
                  width="100%"
                  autoPlay
                />
                {/* )} */}

                {/* Fake player controls */}
                <div className="pointer-events-none absolute bottom-0 inset-x-0 p-4 bg-linear-to-t from-black/80 to-transparent flex flex-col gap-2 z-20">
                  <p className="text-white text-sm font-medium">
                    {sessionData?.module?.title}
                  </p>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50">
                <Video size={48} className="mb-4 opacity-50" />
                <p>No recorded session available yet.</p>
              </div>
            )}
          </div>

          {!isSessionLoading && sessions.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {sessions.map((session, index) => {
                const isSelected = index === selectedSessionIndex;
                const sessionDateLabel =
                  formatTrainingDate(session.training_date, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }) || `Session ${index + 1}`;

                return (
                  <button
                    key={`${session.training_date}-${index}`}
                    type="button"
                    onClick={() =>
                      setSelectedSessionSelection({ moduleId, index })
                    }
                    className={`min-w-40 rounded-xl border px-4 py-3 text-left transition-all ${
                      isSelected
                        ? "border-teal bg-teal text-white shadow-md shadow-teal/20"
                        : "border-gray-100 bg-white text-[#00284F] hover:border-teal/40 hover:bg-teal/5"
                    }`}
                  >
                    <span className="block text-xs font-black uppercase tracking-widest">
                      Session {index + 1}
                    </span>
                    <span
                      className={`mt-1 block text-sm font-bold ${
                        isSelected ? "text-white" : "text-[#00284F]"
                      }`}
                    >
                      {sessionDateLabel}
                    </span>
                    <span
                      className={`mt-2 block text-[11px] font-bold ${
                        isSelected ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {session.recorded_link
                        ? "Recording"
                        : session.meeting_link
                          ? "Live session"
                          : "No link yet"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#00284F]">
                  Lesson Resources
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Download materials to follow along with the lecture.
                </p>
              </div>
              <button
                type="button"
                disabled={lessonResources.length === 0}
                onClick={() =>
                  lessonResources.forEach((resource) =>
                    window.open(resource.file_url, "_blank", "noopener"),
                  )
                }
                className="flex items-center gap-2 text-teal font-bold text-sm hover:underline disabled:cursor-not-allowed disabled:text-gray-300 disabled:no-underline"
              >
                <Download size={16} />
                Download All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lessonResources.length > 0 ? (
                lessonResources.map((resource) => (
                  <a
                    key={`${resource.file_url}-${resource.uploaded_at}`}
                    href={resource.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-teal/5 hover:border-teal/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center text-white shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#00284F]">
                        {resource.file_name}
                      </p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">
                        {getFileExtension(resource.file_name)} -{" "}
                        {formatFileSize(resource.file_size)}
                      </p>
                    </div>
                  </a>
                ))
              ) : (
                <div className="sm:col-span-2 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm font-medium text-gray-500">
                  No lesson resources have been uploaded yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar (Live Session & Actions) */}
        <div className="space-y-6">
          {/* Live Session Card */}
          <div className="bg-[#00284F] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-teal text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full mb-4">
                <div
                  className={`w-1.5 h-1.5 bg-white rounded-full ${
                    canJoinLiveSession ? "animate-pulse" : ""
                  }`}
                ></div>
                {canJoinLiveSession ? "Live Today" : "Session"}
              </div>

              <h3 className="text-lg font-bold mb-2">
                Q&A Session: {sessionData?.module?.title}
              </h3>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                {selectedSession?.training_date
                  ? `Scheduled for ${formatTrainingDate(
                      selectedSession.training_date,
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}.`
                  : "No live session date is available yet."}
              </p>

              <button
                disabled={!canJoinLiveSession}
                onClick={() => {
                  if (!canJoinLiveSession) return;
                  window.open(selectedSession?.meeting_link || "", "_blank");
                }}
                className="w-full bg-teal text-white py-3 rounded-xl font-bold hover:bg-teal/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                JOIN LIVE SESSION
              </button>

              {hasRecordedSession && selectedSession?.recorded_link && (
                <button
                  onClick={() =>
                    window.open(selectedSession.recorded_link || "", "_blank")
                  }
                  className="w-full text-center text-teal text-xs font-bold hover:underline"
                >
                  View previous recording
                </button>
              )}
            </div>
          </div>

          <button
            onClick={handleMarkAttended}
            className="w-full bg-teal text-white py-3.5 rounded-xl font-bold hover:bg-teal/90 transition-all shadow-md shadow-teal/20 flex items-center justify-center gap-2 disabled:bg-[#00284F] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              isLoadingAttendance ||
              markAttendanceMutation.isPending ||
              isAttended(moduleId)
            }
          >
            {markAttendanceMutation.isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : null}
            {isAttended(moduleId) ? "ATTENDANCE MARKED" : "MARK AS ATTENDED"}
          </button>

          {/* Course Progress Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#00284F]">
                Course Progress
              </h3>
              <span className="text-lg font-black text-teal">65%</span>
            </div>

            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-teal rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                Lessons
              </p>
              <p className="text-xl font-black text-[#00284F]">12/18</p>
            </div>
          </div>

          <button
            onClick={handleMarkCompleted}
            disabled={markCompletedMutation.isPending}
            className="w-full bg-teal text-white py-3.5 rounded-xl font-bold hover:bg-teal/90 transition-all shadow-md shadow-teal/20 flex items-center justify-center gap-2"
          >
            {markCompletedMutation.isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : null}
            MARK AS COMPLETED
          </button>
        </div>
      </div>
    </div>
  );
}

export default LMSPageContent;
