import React from "react";
import CourseTrackManager from "@/components/admin/CourseTrackManager";

export default function AdminCourseTracksPage() {
  return (
    <div className="flex flex-col h-full gap-6 max-w-[1400px] mx-auto w-full">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#00284F] tracking-tight">
            Course Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your training tracks, course types, sub-types, headers, and modules.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <CourseTrackManager />
      </div>
    </div>
  );
}
