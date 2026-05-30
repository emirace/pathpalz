"use client";

import { useSearchParams } from "next/navigation";

import { useGetEnrollmentById } from "@/query/training/enrollments";
import {
    useGetModuleSessions,
    useMarkAttendance,
    useMarkCourseAsCompleted
} from "@/query/training/student";
import {
    Play,
    Settings,
    Maximize,
    Download,
    FileText,
    Code,
    Loader2,
    Video
} from "lucide-react";

function LMSPageContent() {
    const searchParams = useSearchParams();
    const enrollmentId = searchParams.get("enrollmentId");
    const moduleIdParam = searchParams.get("module");

    const { data: enrollment, isLoading: isEnrollmentLoading } = useGetEnrollmentById(enrollmentId || "");
    const moduleId = moduleIdParam ? Number(moduleIdParam) : undefined;

    const { data: sessionData, isLoading: isSessionLoading } = useGetModuleSessions(moduleId || 0);

    const markAttendanceMutation = useMarkAttendance();
    const markCompletedMutation = useMarkCourseAsCompleted();

    const handleMarkAttended = () => {
        if (!moduleId) return;
        markAttendanceMutation.mutate(
            { course_module_id: moduleId, attended: true },
            {
                // onSuccess: () => toast.success("Marked as attended!"),
                // onError: () => toast.error("Failed to mark attendance"),
            }
        );
    };

    const handleMarkCompleted = () => {
        if (!sessionData?.module?.title) return;
        markCompletedMutation.mutate(sessionData.module.title, {
            // onSuccess: () => toast.success("Module marked as completed!"),
            // onError: () => toast.error("Failed to mark as completed"),
        });
    };

    if (isEnrollmentLoading || !enrollmentId) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="animate-spin text-teal" size={32} />
            </div>
        );
    }

    if (!moduleId) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mb-6">
                    <Play size={32} className="text-teal" />
                </div>
                <h2 className="text-2xl font-bold text-[#00284F] mb-2">Welcome to Your Course</h2>
                <p className="text-gray-500 max-w-md">
                    Select a module from the sidebar on the left to start learning.
                </p>
            </div>
        );
    }

    const latestSession = sessionData?.sessions?.[0];
    const hasLiveSession = !!latestSession?.meeting_link;
    const hasRecordedSession = !!latestSession?.recorded_link;

    return (
        <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-500">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <span>Courses</span>
                <span>›</span>
                <span>{enrollment?.purchased_course.title}</span>
                <span>›</span>
                <span className="font-bold text-[#00284F]">{sessionData?.module?.title || `Module ${moduleId}`}</span>
            </div>

            <h1 className="text-3xl font-bold text-[#00284F] mb-2">
                {sessionData?.module?.title || "Loading Module..."}
            </h1>

            {/* Estimated time pill */}
            <div className="inline-flex items-center gap-1.5 bg-teal text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                45m remaining
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
                        ) : hasRecordedSession ? (
                            <>
                                <div className="absolute inset-0 flex items-center justify-center bg-[#00284F]/40 backdrop-blur-sm z-10 group-hover:bg-[#00284F]/60 transition-all">
                                    <button
                                        onClick={() => window.open(latestSession.recorded_link || "", "_blank")}
                                        className="w-16 h-16 bg-teal rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
                                    >
                                        <Play size={24} className="ml-1" fill="currentColor" />
                                    </button>
                                </div>
                                {/* Simulated video background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black opacity-50"></div>

                                {/* Fake player controls */}
                                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-2 z-20">
                                    <p className="text-white text-sm font-medium">{sessionData?.module?.title}</p>
                                    <div className="flex items-center gap-4">
                                        <div className="h-1 bg-white/20 rounded-full flex-1 overflow-hidden">
                                            <div className="h-full bg-teal w-1/3"></div>
                                        </div>
                                        <span className="text-white/80 text-xs font-medium tabular-nums">12:45 / 24:00</span>
                                        <button className="text-white hover:text-teal"><Settings size={16} /></button>
                                        <button className="text-white hover:text-teal"><Maximize size={16} /></button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50">
                                <Video size={48} className="mb-4 opacity-50" />
                                <p>No recorded session available yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Resources Card */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-[#00284F]">Lesson Resources</h3>
                                <p className="text-sm text-gray-500 mt-1">Download materials to follow along with the lecture.</p>
                            </div>
                            <button className="flex items-center gap-2 text-teal font-bold text-sm hover:underline">
                                <Download size={16} />
                                Download All (.zip)
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-teal/5 hover:border-teal/20 transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center text-white shrink-0">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#00284F]">Cheat Sheet: {sessionData?.module?.title}</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">PDF • 1.2 MB</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-teal/5 hover:border-teal/20 transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-lg bg-[#00284F] flex items-center justify-center text-white shrink-0">
                                    <Code size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#00284F]">Lab Exercise</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">SH • 45 KB</p>
                                </div>
                            </div>
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
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                Live Now
                            </div>

                            <h3 className="text-lg font-bold mb-2">Q&A Session: {sessionData?.module?.title}</h3>
                            <p className="text-white/70 text-sm mb-6 leading-relaxed">
                                Join the instructor for a deep dive into {sessionData?.module?.title?.toLowerCase()} and live troubleshooting.
                            </p>

                            <button
                                disabled={!hasLiveSession}
                                onClick={() => window.open(latestSession?.meeting_link || "", "_blank")}
                                className="w-full bg-teal text-white py-3 rounded-xl font-bold hover:bg-teal/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                            >
                                JOIN LIVE SESSION
                            </button>

                            {hasRecordedSession && (
                                <button
                                    onClick={() => window.open(latestSession?.recorded_link || "", "_blank")}
                                    className="w-full text-center text-teal text-xs font-bold hover:underline"
                                >
                                    View previous recording
                                </button>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleMarkAttended}
                        disabled={markAttendanceMutation.isPending}
                        className="w-full bg-teal text-white py-3.5 rounded-xl font-bold hover:bg-teal/90 transition-all shadow-md shadow-teal/20 flex items-center justify-center gap-2"
                    >
                        {markAttendanceMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : null}
                        MARK AS ATTENDED
                    </button>

                    {/* Course Progress Card */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-[#00284F]">Course Progress</h3>
                            <span className="text-lg font-black text-teal">65%</span>
                        </div>

                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
                            <div className="h-full bg-teal rounded-full" style={{ width: '65%' }}></div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Lessons</p>
                            <p className="text-xl font-black text-[#00284F]">12/18</p>
                        </div>
                    </div>

                    <button
                        onClick={handleMarkCompleted}
                        disabled={markCompletedMutation.isPending}
                        className="w-full bg-teal text-white py-3.5 rounded-xl font-bold hover:bg-teal/90 transition-all shadow-md shadow-teal/20 flex items-center justify-center gap-2"
                    >
                        {markCompletedMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : null}
                        MARK AS COMPLETED
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LMSPageContent