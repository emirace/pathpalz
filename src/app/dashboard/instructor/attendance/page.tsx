"use client";

import React, { useState } from "react";
import {
  useGetStudentAttendancePerModule,
  useUpdateStudentAttendance,
} from "@/query/training/instructor";
import { useGetInstructorCourseOutline } from "@/query/training/instructor/modules";
import {
  CheckCircle,
  Circle,
  Calendar,
  Loader2,
  BookOpen,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Users,
  Search,
} from "lucide-react";
import { IStudentAttendace } from "@/types/training/instructor";

export default function InstructorAttendancePage() {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: courseOutline, isLoading } = useGetInstructorCourseOutline();

  const { data: moduleAttendance, isLoading: isLoadingAttendance } =
    useGetStudentAttendancePerModule(selectedModuleId as number);
  const { mutate: updateAttendance, isPending: isUpdating } =
    useUpdateStudentAttendance();

  const selectedCourse = courseOutline?.find(
    (item) => item.course.id === selectedCourseId,
  )?.course;

  // Flatten all modules from the selected course's structure
  const modules = (selectedCourse?.course_structure?.flatMap((h) => h.modules) || []) as any[];

  const [openHeaders, setOpenHeaders] = useState<Record<number, boolean>>({});
  const toggleHeader = (id: number) => {
    setOpenHeaders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleAttendance = (
    studentId: number,
    currentStatus: boolean,
  ) => {
    if (!selectedModuleId) return;

    updateAttendance({
      studentId,
      course_module_id: selectedModuleId,
      attendance: !currentStatus,
    });
  };

  const isStudentAttended = (student: IStudentAttendace) => {
    if (!selectedModuleId) return false;
    return Array.isArray(student.attendances) &&
      student.attendances.some((a: any) => a.course_module_id === selectedModuleId);
  };

  const students = moduleAttendance?.data || [];

  const filteredStudents = students.filter((student: any) => {
    const fullName =
      `${student.user?.first_name || ""} ${student.user?.last_name || ""}`.toLowerCase();
    const email = (student.user?.email || "").toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#00284F] flex items-center gap-3">
          <ShieldCheck className="text-teal" />
          Attendance Management
        </h1>
        <p className="mt-2 text-gray-500">
          Track and manage student presence for your training modules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Course & Module Selection */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <BookOpen size={16} /> Select Course
            </h2>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-teal" />
              </div>
            ) : (
              <div className="space-y-2">
                {courseOutline?.map((item) => (
                  <button
                    key={item.course.id}
                    onClick={() => {
                      setSelectedCourseId(item.course.id);
                      setSelectedModuleId(null);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                      selectedCourseId === item.course.id
                        ? "border-teal bg-teal/5 text-teal shadow-sm"
                        : "border-gray-100 hover:border-teal/30 text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-bold text-xs truncate pr-2">
                      {item.course.title}
                    </span>
                    <ChevronRight
                      size={14}
                      className={
                        selectedCourseId === item.course.id
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedCourseId && (
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm animate-in fade-in slide-in-from-top-2">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Calendar size={16} /> Select Module
              </h2>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="animate-spin text-teal" />
                </div>
              ) : (
                <div className="space-y-3 max-h-125 overflow-y-auto pr-2 custom-scrollbar">
                  {selectedCourse?.course_structure?.map((header: any, index: number) => (
                    <div key={header.header_id} className="border border-gray-100 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleHeader(header.header_id)}
                        className="w-full flex items-center justify-between p-3 bg-gray-50/50 hover:bg-gray-50 transition-colors text-left"
                      >
                        <span className="text-[11px] font-bold text-gray-700 flex items-center gap-1.5 leading-tight">
                          {openHeaders[header.header_id] ? (
                            <ChevronDown size={14} className="text-gray-400 shrink-0" />
                          ) : (
                            <ChevronRight size={14} className="text-gray-400 shrink-0" />
                          )}
                          Mod {index + 1}: {header.title}
                        </span>
                      </button>

                      {openHeaders[header.header_id] && (
                        <div className="divide-y divide-gray-50 bg-white border-t border-gray-100">
                          {header.modules.map((module: any) => (
                            <button
                              key={module.id}
                              onClick={() => setSelectedModuleId(module.id)}
                              className={`w-full text-left p-3 transition-colors flex items-center justify-between group ${selectedModuleId === module.id
                                ? "bg-teal/5"
                                : "hover:bg-gray-50/50"
                                }`}
                            >
                              <span className={`text-[11px] font-semibold transition-colors truncate pr-2 ${selectedModuleId === module.id ? "text-teal" : "text-gray-700"}`}>
                                {module.title}
                              </span>
                              {selectedModuleId === module.id && (
                                <CheckCircle size={12} className="text-teal shrink-0" />
                              )}
                            </button>
                          ))}
                          {header.modules.length === 0 && (
                            <div className="p-3 text-[10px] text-gray-400 italic pl-4">
                              No lessons available.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Students List */}
        <div className="lg:col-span-3">
          {!selectedModuleId ? (
            <div className="h-full min-h-100 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center bg-white/50">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Users size={40} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-500">
                No Module Selected
              </h3>
              <p className="text-gray-400 max-w-sm mt-2">
                Please select a course and a module from the sidebar to manage
                student attendance.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Search and Stats */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search students by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all shadow-sm"
                  />
                </div>

                <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                  <span className="px-4 py-2 bg-gray-100 rounded-xl border border-gray-200">
                    Total:{" "}
                    <span className="text-[#00284F] font-bold">
                      {filteredStudents.length}
                    </span>
                  </span>
                  <span className="px-4 py-2 bg-green-50 text-green-700 rounded-xl border border-green-100">
                    Attended:{" "}
                    <span className="font-bold">
                      {
                        filteredStudents.filter((s: any) =>
                          isStudentAttended(s),
                        ).length
                      }
                    </span>
                  </span>
                </div>
              </div>

              {/* Students Table */}
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                {isLoadingAttendance ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-teal h-10 w-10" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Student
                          </th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Email
                          </th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
                            Status
                          </th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredStudents.map((student: any) => {
                          const attended = isStudentAttended(student);
                          return (
                            <tr
                              key={student.id}
                              className="hover:bg-gray-50/30 transition-colors group"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal font-bold border border-teal/20">
                                    {student?.first_name?.[0] ||
                                      student?.email?.[0].toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-[#00284F]">
                                      {student?.first_name} {student?.last_name}
                                    </p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-tight font-medium">
                                      ID: {student?.id}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-gray-500">
                                  {student?.email}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                {attended ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">
                                    <CheckCircle size={14} /> Attended
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-400 text-xs font-bold border border-gray-200">
                                    <Circle size={14} /> Not Marked
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() =>
                                    handleToggleAttendance(student.id, attended)
                                  }
                                  disabled={isUpdating}
                                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                                    attended
                                      ? "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 hover:shadow-red-200/50"
                                      : "bg-teal text-white hover:bg-teal/90 hover:shadow-teal-200/50"
                                  } disabled:opacity-50`}
                                >
                                  {attended ? "Unmark" : "Mark Present"}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                        {filteredStudents.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-6 py-20 text-center">
                              <Users
                                size={40}
                                className="mx-auto text-gray-200 mb-4"
                              />
                              <p className="text-gray-400 font-medium">
                                No students found matching your search.
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
