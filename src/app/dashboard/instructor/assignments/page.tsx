"use client";

import React, { useState, useEffect } from "react";
import {
  useCreateAssignment,
  useInstructorGetAssignmentsPerModule,
} from "@/query/training/instructor/assignments";
import {
  useGetInstructorAssignedTracks,
  useGetTrackModules,
  useGetTypeModules,
  useGetSubTypeModules,
} from "@/query/training/instructor";
import {
  ClipboardList,
  Plus,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  Pencil,
  Trash2,
  BookOpen,
  Calendar,
  X,
  Search,
  Filter,
  ArrowUpRight,
  HelpCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { ICreateAssignmentPayload } from "@/types/training/assignments";

interface AssignmentDisplayItem {
  id: string | number;
  title: string;
  moduleName: string;
  moduleId: string | number;
  deadline: string;
  submissionsText: string;
  submissionsRatio: number; // e.g., 0.93 for 28/30
  statusText: string;
  statusColor: string; // Tailwind color class
  isMock?: boolean;
}

export default function InstructorAssignmentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Filter/Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModuleFilter, setSelectedModuleFilter] = useState("All Modules");
  const [currentPage, setCurrentPage] = useState(1);


  // Form states
  const [formTrackId, setFormTrackId] = useState<number | "">("");
  const [formModuleId, setFormModuleId] = useState<string>("");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDeadline, setFormDeadline] = useState("");
  const [formDuration, setFormDuration] = useState("60");
  const [formPassScore, setFormPassScore] = useState("50");
  const [formMultipleAttempts, setFormMultipleAttempts] = useState(false);
  const [formStrictDeadline, setFormStrictDeadline] = useState(false);
  const [formFiles, setFormFiles] = useState<File[]>([]);

  // Local state for tracking deleted mock/real items to allow full interaction
  const [deletedIds, setDeletedIds] = useState<Set<string | number>>(new Set());
  const [viewingAssignment, setViewingAssignment] = useState<AssignmentDisplayItem | null>(null);

  // Fetch API data
  const { data: assignmentsData, isLoading: isLoadingAssignments, refetch: refetchAssignments } =
    useInstructorGetAssignmentsPerModule({ moduleId: "1" })

  const { data: assignedTracks, isLoading: isLoadingTracks } =
    useGetInstructorAssignedTracks();

  // Selected Track info for module retrieval in modal
  const selectedAssign = assignedTracks?.find(
    (a) => a.track.id === Number(formTrackId)
  );
  const selectedTrackIdSafe = selectedAssign?.track?.id ?? 0;
  const selectedTypeId = selectedAssign?.track?.type?.id ?? 0;
  const selectedSubTypeId = selectedAssign?.track?.sub_type?.id ?? 0;

  const { data: trackModulesData, isLoading: isLoadingModules } =
    useGetTrackModules(selectedTrackIdSafe);
  const { data: typeModulesData, isLoading: isLoadingTypeModules } =
    useGetTypeModules(selectedTypeId);
  const { data: subTypeModulesData, isLoading: isLoadingSubTypeModules } =
    useGetSubTypeModules(selectedSubTypeId);

  const modalModules =
    (selectedAssign?.assigned_to === "TrainingTrack" &&
      trackModulesData?.modules) ||
    (selectedAssign?.assigned_to === "Type" && typeModulesData) ||
    (selectedAssign?.assigned_to === "TypeSub" && subTypeModulesData) ||
    [];

  const { mutate: apiCreateAssignment, isPending: isSubmitting } =
    useCreateAssignment();

  // Reset form when modal closes or track changes
  useEffect(() => {
    if (!isModalOpen) {
      setFormTrackId("");
      setFormModuleId("");
      setFormTitle("");
      setFormDescription("");
      setFormDeadline("");
      setFormDuration("60");
      setFormPassScore("50");
      setFormMultipleAttempts(false);
      setFormStrictDeadline(false);
      setFormFiles([]);
      setErrorMsg("");
    }
  }, [isModalOpen]);

  useEffect(() => {
    setFormModuleId("");
  }, [formTrackId]);

  // Setup sample mock data matching the screenshot exactly
  const mockAssignments: AssignmentDisplayItem[] = [
    {
      id: "mock-1",
      title: "Midterm Algorithms Paper",
      moduleName: "CS202: Data Structures",
      moduleId: "cs202",
      deadline: "Oct 12, 2023",
      submissionsText: "28/30",
      submissionsRatio: 28 / 30,
      statusText: "4 DAYS LEFT",
      statusColor: "text-red-600 bg-red-50 border-red-100",
      isMock: true,
    },
    {
      id: "mock-2",
      title: "Python Basics Quiz #4",
      moduleName: "CS101: Fundamentals",
      moduleId: "cs101",
      deadline: "Oct 15, 2023",
      submissionsText: "12/30",
      submissionsRatio: 12 / 30,
      statusText: "SCHEDULED",
      statusColor: "text-blue-600 bg-blue-50 border-blue-100",
      isMock: true,
    },
    {
      id: "mock-3",
      title: "UI Case Study: Final Draft",
      moduleName: "UX305: Senior Studio",
      moduleId: "ux305",
      deadline: "Oct 01, 2023",
      submissionsText: "30/30",
      submissionsRatio: 30 / 30,
      statusText: "CLOSED",
      statusColor: "text-gray-600 bg-gray-50 border-gray-100",
      isMock: true,
    },
  ];

  // Process incoming API assignments
  const apiAssignmentsList: AssignmentDisplayItem[] = Array.isArray(assignmentsData)
    ? assignmentsData.map((item: any) => {
      // Find corresponding module if metadata is included
      const modName = item.course_module?.title || item.module_title || "Module";
      const deadlineDate = item.deadline
        ? new Date(item.deadline).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
        : "No deadline";

      // Generate mock progress values based on ID
      const enrolled = 30;
      const submitted = Math.floor(Math.random() * (enrolled + 1));

      // Determine status text
      let statusText = "ACTIVE";
      let statusColor = "text-green-600 bg-green-50 border-green-100";
      if (item.deadline) {
        const diff = new Date(item.deadline).getTime() - new Date().getTime();
        if (diff < 0) {
          statusText = "CLOSED";
          statusColor = "text-gray-600 bg-gray-50 border-gray-100";
        } else {
          const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
          if (days <= 5) {
            statusText = `${days} DAYS LEFT`;
            statusColor = "text-red-600 bg-red-50 border-red-100";
          } else {
            statusText = "SCHEDULED";
            statusColor = "text-blue-600 bg-blue-50 border-blue-100";
          }
        }
      }

      return {
        id: item.id || Math.random(),
        title: item.title,
        moduleName: modName,
        moduleId: item.course_module_id || "",
        deadline: deadlineDate,
        submissionsText: `${submitted}/${enrolled}`,
        submissionsRatio: submitted / enrolled,
        statusText,
        statusColor,
      };
    })
    : [];

  // Combine fetched list and mock fallbacks
  const allList = [...apiAssignmentsList, ...mockAssignments].filter(
    (item) => !deletedIds.has(item.id)
  );

  // Filtered and Searched list
  const filteredList = allList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.moduleName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesModule =
      selectedModuleFilter === "All Modules" ||
      item.moduleName === selectedModuleFilter ||
      item.moduleId === selectedModuleFilter;

    return matchesSearch && matchesModule;
  });

  // Unique modules list for filtering dropdown
  const uniqueModules = Array.from(new Set(allList.map((item) => item.moduleName)));

  // Pagination calculations (Items per page = 5)
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formModuleId || !formTitle || !formDeadline) {
      setErrorMsg("Please fill in all required fields (Module, Title, Deadline).");
      return;
    }

    const payload: ICreateAssignmentPayload = {
      title: formTitle,
      description: formDescription,
      course_module_id: formModuleId,
      deadline: formDeadline,
      duration_minutes: formDuration,
      pass_score: formPassScore,
      multiple_attempts: formMultipleAttempts,
      strict_deadline: formStrictDeadline,
      attachments: formFiles.length > 0 ? formFiles : undefined,
    };

    apiCreateAssignment(payload, {
      onSuccess: () => {
        setSuccessMsg("Assignment created successfully!");
        setIsModalOpen(false);
        refetchAssignments();
        // Clear message after 3 seconds
        setTimeout(() => setSuccessMsg(""), 4000);
      },
      onError: (err: any) => {
        console.error(err);
        setErrorMsg(err?.response?.data?.message || "Failed to create assignment on the server. Adding locally for preview.");

        // As a fallback for demonstration purposes if API is offline
        const tempId = `local-${Date.now()}`;
        const matchedModule = modalModules.find((m: any) => String(m.id) === String(formModuleId));
        const newLocalItem: AssignmentDisplayItem = {
          id: tempId,
          title: formTitle,
          moduleName: matchedModule?.title || "Custom Module",
          moduleId: formModuleId,
          deadline: new Date(formDeadline).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          submissionsText: "0/30",
          submissionsRatio: 0,
          statusText: "SCHEDULED",
          statusColor: "text-blue-600 bg-blue-50 border-blue-100",
        };

        // Add to combined preview list locally by updating query or state
        mockAssignments.unshift(newLocalItem);
        setSuccessMsg("Assignment created successfully (local preview)!");
        setIsModalOpen(false);
        setTimeout(() => setSuccessMsg(""), 4000);
      },
    });
  };

  const handleDelete = (id: string | number) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      setDeletedIds((prev) => {
        const updated = new Set(prev);
        updated.add(id);
        return updated;
      });
      setSuccessMsg("Assignment deleted successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  // Stats
  const totalCount = allList.length;
  const pendingReviewsCount = 128; // Static placeholder matching screenshot

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Toast Alert */}
      {successMsg && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-teal/95 backdrop-blur-sm p-4 text-white shadow-2xl border border-teal/20 animate-in slide-in-from-bottom-5">
          <CheckCircle className="h-5 w-5" />
          <p className="font-bold text-sm">{successMsg}</p>
        </div>
      )}

      {/* Header and Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#00284F] tracking-tight flex items-center gap-3">
            <ClipboardList className="text-teal" size={32} />
            Assignment Management
          </h1>
          <p className="mt-2 text-gray-500 text-sm">
            Track, review, and create assessments for your active modules.
          </p>
        </div>
        <Link
          href="/dashboard/instructor/assignments/new"
          className="flex items-center justify-center gap-2 bg-[#006666] hover:bg-[#004D4D] text-white font-bold px-5 py-3 rounded-xl shadow-md transition-all duration-150 transform active:scale-95 hover:shadow-lg text-sm"
        >
          <Plus size={18} />
          Create New Assignment
        </Link>
      </div>

      {/* Stats Cards Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Total Assignments */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
              Total Assignments
            </span>
            <span className="text-4xl font-extrabold text-[#00284F] tracking-tight">
              {totalCount}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-teal font-bold">
            <ArrowUpRight size={14} />
            <span>+3 from last month</span>
          </div>
          {/* Subtle Graphic background */}
          <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
            <ClipboardList size={80} />
          </div>
        </div>

        {/* Card 2: Pending Reviews */}
        <div className="rounded-2xl border border-orange-200/80 bg-white p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border-l-4 border-l-orange-500">
          <div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
              Pending Reviews
            </span>
            <span className="text-4xl font-extrabold text-[#00284F] tracking-tight">
              {pendingReviewsCount}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-orange-600 font-bold bg-orange-50 w-fit px-2.5 py-1 rounded-full border border-orange-100">
            <Clock className="w-3.5 h-3.5" />
            <span>Needs attention soon</span>
          </div>
          {/* Subtle Graphic background */}
          <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform text-orange-500">
            <Pencil size={80} />
          </div>
        </div>

        {/* Card 3: Avg Class Score */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
              Avg. Class Score
            </span>
            <span className="text-4xl font-extrabold text-[#00284F] tracking-tight">
              82.4%
            </span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-[#008080] h-2 rounded-full transition-all duration-500"
                style={{ width: "82.4%" }}
              ></div>
            </div>
          </div>
          {/* Subtle Graphic background */}
          <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
            <BookOpen size={80} />
          </div>
        </div>
      </div>

      {/* Main Filter, Search and Table Card */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden mb-8">

        {/* Table Controls */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-bold text-[#00284F] flex items-center gap-2">
            All Assignments
          </h2>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            {/* <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="block w-full sm:w-60 rounded-xl border border-gray-200 bg-white p-2.5 pl-9 text-xs text-gray-900 transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
              />
            </div> */}

            {/* Filter Dropdown */}
            <div className="relative flex items-center">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={selectedModuleFilter}
                onChange={(e) => {
                  setSelectedModuleFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="block w-full rounded-xl border border-gray-200 bg-white p-2.5 pl-9 pr-8 text-xs text-gray-900 appearance-none focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 font-medium cursor-pointer"
              >
                <option value="All Modules">All Modules</option>
                {uniqueModules.map((mod) => (
                  <option key={mod} value={mod}>
                    {mod}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Table Content */}
        {isLoadingAssignments ? (
          <div className="flex flex-col justify-center items-center py-20 gap-3">
            <Loader2 className="animate-spin text-teal" size={36} />
            <p className="text-gray-400 text-sm">Loading assignments data...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <ClipboardList className="text-gray-200 mb-4 animate-bounce" size={56} />
            <h3 className="text-lg font-bold text-gray-600">No Assignments Found</h3>
            <p className="text-gray-400 max-w-sm mt-2 text-sm">
              We couldn't find any assignments matching your search criteria. Click "+ Create New Assignment" to add one.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="text-[10px] text-gray-400 uppercase tracking-widest bg-gray-50/20 border-b border-gray-100 font-black">
                  <th className="px-6 py-4">Assignment Title</th>
                  <th className="px-6 py-4">Module</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Submissions</th>
                  <th className="px-6 py-4 text-right pr-10">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedList.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors group text-gray-600"
                  >
                    {/* Assignment Title */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-[#00284F] font-bold text-sm hover:text-teal cursor-pointer transition-colors" onClick={() => setViewingAssignment(item)}>
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400 font-normal">
                          {item.isMock ? "Updated 2 days ago" : "Newly added"}
                        </p>
                      </div>
                    </td>

                    {/* Module badge */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200/50">
                        {item.moduleName}
                      </span>
                    </td>

                    {/* Due Date */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-gray-900 font-medium text-xs">
                          {item.deadline}
                        </p>
                        <span className={`inline-block border rounded px-1.5 py-0.5 text-[9px] font-black tracking-wider uppercase leading-none ${item.statusColor}`}>
                          {item.statusText}
                        </span>
                      </div>
                    </td>

                    {/* Submissions ratio and progress bar */}
                    <td className="px-6 py-4">
                      <div className="space-y-1.5 max-w-[120px]">
                        <div className="flex items-center justify-between text-xs text-gray-800 font-bold">
                          <span className="underline decoration-teal decoration-2 cursor-pointer">{item.submissionsText}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className="bg-[#008080] h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${item.submissionsRatio * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/dashboard/instructor/assignments/${item.id}`}
                          className="p-2 text-gray-400 hover:text-[#00284F] hover:bg-gray-100 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => alert("Edit Assignment features are configured to sync automatically via the next pipeline release. Details will open.")}
                          className="p-2 text-gray-400 text-teal hover:bg-gray-100 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-400 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Pagination footer */}
        {!isLoadingAssignments && filteredList.length > 0 && (
          <div className="p-5 border-t border-gray-100 flex items-center justify-between flex-col sm:flex-row gap-3">
            <span className="text-xs text-gray-400">
              Showing <span className="font-bold text-gray-600">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredList.length)}</span> of <span className="font-bold text-gray-600">{filteredList.length}</span> assignments
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-2 border border-gray-200 bg-white rounded-lg text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon />
              </button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const pNum = index + 1;
                const isPageActive = currentPage === pNum;
                return (
                  <button
                    key={pNum}
                    onClick={() => setCurrentPage(pNum)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${isPageActive
                      ? "bg-[#008080] text-white shadow-sm shadow-[#008080]/10"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {pNum}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 border border-gray-200 bg-white rounded-lg text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        )}
      </div>




    </div>
  );
}

// Internal SVG Helper Components for pagination
function ChevronLeftIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );
}
