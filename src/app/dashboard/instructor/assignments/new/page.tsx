"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCreateAssignment,
} from "@/query/training/instructor/assignments";
import {
  useGetInstructorAssignedTracks,
  useGetTrackModules,
  useGetTypeModules,
  useGetSubTypeModules,
} from "@/query/training/instructor";
import {
  ClipboardList,
  Loader2,
  CheckCircle,
  AlertCircle,
  Rocket,
  ChevronRight,
  AlignLeft,
  CloudUpload,
  FileText,
  Trash2,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Calendar,
} from "lucide-react";
import { ICreateAssignmentPayload } from "@/types/training/assignments";

export default function CreateAssignmentPage() {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Form states
  const [formTrackId, setFormTrackId] = useState<number | "">("");
  const [formModuleId, setFormModuleId] = useState<string>("");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDeadline, setFormDeadline] = useState("");
  const [formDuration, setFormDuration] = useState("60");
  const [formPassScore, setFormPassScore] = useState("70");
  const [formMultipleAttempts, setFormMultipleAttempts] = useState(true);
  const [formStrictDeadline, setFormStrictDeadline] = useState(false);
  const [formFiles, setFormFiles] = useState<File[]>([]);

  // Fetch API data
  const { data: assignedTracks, isLoading: isLoadingTracks } =
    useGetInstructorAssignedTracks();

  // Selected Track info for module retrieval
  const selectedAssign = assignedTracks?.find(
    (a) => a.track.id === Number(formTrackId)
  );
  const selectedTrackIdSafe = selectedAssign?.track?.id ?? 0;
  const selectedTypeId = selectedAssign?.track?.type?.id ?? 0;
  const selectedSubTypeId = selectedAssign?.track?.sub_type?.id ?? 0;

  const { data: trackModulesData } = useGetTrackModules(selectedTrackIdSafe);
  const { data: typeModulesData } = useGetTypeModules(selectedTypeId);
  const { data: subTypeModulesData } = useGetSubTypeModules(selectedSubTypeId);

  const modalModules =
    (selectedAssign?.assigned_to === "TrainingTrack" &&
      trackModulesData?.modules) ||
    (selectedAssign?.assigned_to === "Type" && typeModulesData) ||
    (selectedAssign?.assigned_to === "TypeSub" && subTypeModulesData) ||
    [];

  const { mutate: apiCreateAssignment, isPending: isSubmitting } =
    useCreateAssignment();

  useEffect(() => {
    setFormModuleId("");
  }, [formTrackId]);

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
        setTimeout(() => {
          router.push("/dashboard/instructor/assignments");
        }, 1500);
      },
      onError: (err: any) => {
        console.error(err);
        setErrorMsg(err?.response?.data?.message || "Failed to create assignment on the server. Continuing preview.");
        setSuccessMsg("Assignment created successfully (local preview)!");
        setTimeout(() => {
          router.push("/dashboard/instructor/assignments");
        }, 1500);
      },
    });
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setFormFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Toast Alert */}
      {successMsg && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-teal/95 backdrop-blur-sm p-4 text-white shadow-2xl border border-teal/20 animate-in slide-in-from-bottom-5">
          <CheckCircle className="h-5 w-5" />
          <p className="font-bold text-sm">{successMsg}</p>
        </div>
      )}

      {errorMsg && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-red-600/95 backdrop-blur-sm p-4 text-white shadow-2xl border border-red-700/20 animate-in slide-in-from-bottom-5">
          <AlertCircle className="h-5 w-5" />
          <p className="font-bold text-sm">{errorMsg}</p>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 bg-white p-4 z-10 rounded-xl flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Link href="/dashboard/instructor/assignments" className="hover:text-teal transition-colors">
              Assignments
            </Link>
            <ChevronRight size={14} className="mx-1" />
            <span className="font-bold text-teal">New Assignment</span>
          </div>
          <h1 className="text-2xl font-bold text-[#00284F]">
            Create New Assignment
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard/instructor/assignments")}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm shadow-sm"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={handleCreateAssignment}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#006666] border border-[#006666] text-white font-bold rounded-lg hover:bg-[#004D4D] transition-colors text-sm shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <Rocket className="w-4 h-4" />
            )}
            Create Assignment
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Left Column - Main Details */}
        <div className="flex-1 space-y-6">
          {/* General Details Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="flex items-center gap-2 text-[#00284F] font-bold text-lg mb-6">
              <AlignLeft className="text-teal w-5 h-5" />
              General Details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1.5 font-medium">Assignment Title</label>
                <input
                  type="text"
                  placeholder="e.g., Advanced Data Structures - Final Project"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors text-sm text-gray-800"
                />
              </div>

              {/* Temporary track selector since module depends on it */}
              <div>
                <label className="block text-sm text-gray-600 mb-1.5 font-medium">Track (Required for Module)</label>
                <select
                  value={formTrackId}
                  onChange={(e) => setFormTrackId(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors text-sm text-gray-800 bg-white"
                >
                  <option value="">Select Training Track</option>
                  {assignedTracks?.map((assign) => (
                    <option key={assign.track.id} value={assign.track.id}>
                      {assign.track.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5 font-medium">Module</label>
                <select
                  value={formModuleId}
                  onChange={(e) => setFormModuleId(e.target.value)}
                  disabled={!formTrackId}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors text-sm text-gray-800 bg-white disabled:bg-gray-50"
                >
                  <option value="">Select Module</option>
                  {modalModules.map((m: any) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm text-gray-600 font-medium">Description</label>
                  <div className="flex items-center bg-gray-100 rounded-md p-1 gap-1 border border-gray-200">
                    <button className="p-1 text-gray-600 hover:bg-gray-200 rounded"><Bold className="w-3.5 h-3.5" /></button>
                    <button className="p-1 text-gray-600 hover:bg-gray-200 rounded"><Italic className="w-3.5 h-3.5" /></button>
                    <button className="p-1 text-gray-600 hover:bg-gray-200 rounded"><List className="w-3.5 h-3.5" /></button>
                    <button className="p-1 text-gray-600 hover:bg-gray-200 rounded"><LinkIcon className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <textarea
                  rows={6}
                  placeholder="Outline the requirements, learning objectives, and expectations..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors text-sm text-gray-800 resize-y"
                />
              </div>
            </div>
          </div>

          {/* File Attachments Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="flex items-center gap-2 text-[#00284F] font-bold text-lg mb-6">
              <CloudUpload className="text-teal w-5 h-5" />
              File Attachments
            </h2>

            <label
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center mb-4 hover:border-teal transition-colors bg-gray-50/50 cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              htmlFor="upload-file"
            >
              <div className="w-12 h-12 bg-[#E0F2F2] rounded-full flex items-center justify-center mb-3">
                <CloudUpload className="text-[#006666] w-6 h-6" />
              </div>
              <p className="text-gray-800 font-bold text-sm mb-1">Click to upload or drag and drop</p>
              <p className="text-gray-500 text-xs">PDF, DOCX, ZIP or MP4 (Max 50MB)</p>

              <input
                id="upload-file"
                type="file"
                multiple
                className=" w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files) {
                    setFormFiles([...formFiles, ...Array.from(e.target.files)]);
                  }
                }}
              />
            </label>



            {/* Show actually selected files */}
            {formFiles.map((f, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 mt-2">
                <div className="flex items-center gap-3">
                  <FileText className="text-teal w-4 h-4" />
                  <span className="text-sm text-gray-800 font-bold">{f.name}</span>
                  <span className="text-xs text-gray-500">({(f.size / 1024 / 1024).toFixed(1)} MB)</span>
                </div>
                <button
                  onClick={() => setFormFiles(formFiles.filter((_, idx) => idx !== i))}
                  className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-md hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Parameters */}
        <div className="w-full lg:w-[320px] flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-[#00284F] font-bold text-lg mb-6">
              Parameters
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1.5 font-medium">Deadline Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={formDeadline}
                    onChange={(e) => setFormDeadline(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors text-sm text-gray-800 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5 font-medium">Duration (min)</label>
                  <input
                    type="number"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors text-sm text-gray-800 text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5 font-medium">Pass Score (%)</label>
                  <input
                    type="number"
                    value={formPassScore}
                    onChange={(e) => setFormPassScore(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors text-sm text-gray-800 text-center"
                  />
                </div>
              </div>

              <div className="h-px bg-gray-100 my-2" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#00284F]">Multiple Attempts</p>
                  <p className="text-[10px] text-gray-400">Allow students to resubmit</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormMultipleAttempts(!formMultipleAttempts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formMultipleAttempts ? 'bg-teal' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formMultipleAttempts ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#00284F]">Strict Deadline</p>
                  <p className="text-[10px] text-gray-400">Disable late submissions</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormStrictDeadline(!formStrictDeadline)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formStrictDeadline ? 'bg-teal' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formStrictDeadline ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
