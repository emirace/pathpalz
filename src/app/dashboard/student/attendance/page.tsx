"use client";

import React, { useState } from "react";
import { useGetMyEnrollments } from "@/query/training/enrollments";
import { useGetTrackModules } from "@/query/training/instructor";
import { useMarkAttendance, useGetModuleAttendance } from "@/query/training/student";
import { 
  CheckCircle, 
  Circle, 
  Calendar, 
  Loader2, 
  AlertCircle, 
  BookOpen,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { useGetUser } from "@/query/auth";

export default function StudentAttendancePage() {
  const { data: user } = useGetUser();
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  const { data: enrollments, isLoading: isLoadingEnrollments } = useGetMyEnrollments();
  
  // Extract unique tracks from enrollments
  const enrolledTracks = enrollments?.map(e => e.training) || [];
  
  const { data: modulesData, isLoading: isLoadingModules } = useGetTrackModules(selectedTrackId as number);
  const { mutate: markAttendance, isPending: isMarking } = useMarkAttendance();
  const { data: attendanceData, isLoading: isLoadingAttendance } = useGetModuleAttendance(selectedModuleId as number);

  const handleMarkAttendance = (moduleId: number) => {
    markAttendance({
      course_module_id: moduleId,
      attended: true
    });
  };

  const isAttended = (moduleId: number) => {
    // Check if the current user has attended this module
    return attendanceData?.attendance?.some(
      (record) => record.course_module_id === moduleId && record.user_id === user?.id && record.attended
    );
  };

  return (
    <div className="mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#00284F] flex items-center gap-3">
          <ShieldCheck className="text-teal" />
          Attendance Tracking
        </h1>
        <p className="mt-2 text-gray-500">Mark your presence and keep track of your learning consistency.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Track Selection */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Select Your Track</h2>
            {isLoadingEnrollments ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-teal" />
              </div>
            ) : (
              <div className="space-y-2">
                {enrolledTracks?.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      setSelectedTrackId(track.id);
                      setSelectedModuleId(null);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                      selectedTrackId === track.id
                        ? "border-teal bg-teal/5 text-teal shadow-sm"
                        : "border-gray-100 hover:border-teal/30 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${selectedTrackId === track.id ? "bg-teal text-white" : "bg-gray-100 text-gray-400 group-hover:bg-teal/10 group-hover:text-teal"}`}>
                        <BookOpen size={18} />
                      </div>
                      <span className="font-semibold text-sm">{track.title}</span>
                    </div>
                    <ChevronRight size={16} className={selectedTrackId === track.id ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"} />
                  </button>
                ))}
                
                {enrolledTracks?.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-400">You are not enrolled in any tracks yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modules Listing */}
        <div className="lg:col-span-2">
          {!selectedTrackId ? (
            <div className="h-full rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center bg-white/50">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar size={32} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-500">No Track Selected</h3>
              <p className="text-gray-400 max-w-xs">Select a training track from the left to view modules and mark attendance.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-900">Modules for {enrolledTracks?.find(t => t.id === selectedTrackId)?.title}</h2>
                <p className="text-sm text-gray-500">Click to mark attendance or view details.</p>
              </div>

              {isLoadingModules ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="animate-spin text-teal h-8 w-8" />
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {modulesData?.modules?.map((module) => (
                    <div 
                      key={module.id} 
                      className={`p-6 transition-colors flex items-center justify-between group ${selectedModuleId === module.id ? "bg-teal/5" : "hover:bg-gray-50/50"}`}
                      onClick={() => setSelectedModuleId(module.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                          isAttended(module.id) 
                            ? "bg-green-50 border-green-200 text-green-600 shadow-sm" 
                            : "bg-gray-50 border-gray-100 text-gray-300 group-hover:border-teal/20"
                        }`}>
                          {isAttended(module.id) ? <CheckCircle size={20} /> : <Circle size={20} />}
                        </div>
                        <div>
                          <h4 className={`font-bold transition-colors ${selectedModuleId === module.id ? "text-teal" : "text-gray-900"}`}>
                            {module.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                            <Calendar size={12} />
                            Updated: {new Date(module.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {isAttended(module.id) ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
                            Attended
                          </span>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAttendance(module.id);
                            }}
                            disabled={isMarking}
                            className="px-4 py-2 bg-teal text-white text-sm font-bold rounded-lg hover:bg-teal/90 transition-all shadow-sm shadow-teal/10 hover:shadow-lg hover:shadow-teal/20 disabled:opacity-50"
                          >
                            {isMarking && selectedModuleId === module.id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              "Mark Attendance"
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {modulesData?.modules?.length === 0 && (
                    <div className="py-20 text-center">
                      <BookOpen size={48} className="mx-auto text-gray-200 mb-4" />
                      <p className="text-gray-400">No modules found for this track.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
