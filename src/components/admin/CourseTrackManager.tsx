"use client";

import React, { useState } from "react";
import { useGetTracks } from "@/query/training/tracks";
import {
  useCreateTrainingTrack,
  useUpdateTrainingTrack,
  useDeleteTrainingTrack,
} from "@/query/admin/tracks";
import {
  useGetAllTrackTypes,
  useCreateType,
  useUpdateType,
  useDeleteType,
} from "@/query/admin/types";
import {
  useGetTypeSubTypes,
  useCreateSubType,
  useUpdateSubType,
  useDeleteSubType,
} from "@/query/admin/type-subs";
import {
  useGetSubTypeModuleHeaders,
  useCreateCourseModuleHeader,
  useUpdateCourseModuleHeader,
  useDeleteCourseModuleHeader,
} from "@/query/admin/course-module-headers";
import {
  useGetHeaderModules,
  useCreateCourseModule,
  useUpdateCourseModule,
  useDeleteCourseModule,
} from "@/query/admin/course-modules";

import {
  Folder,
  Layers,
  FileText,
  BookOpen,
  LayoutGrid,
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import EntityFormModal, { IFormField } from "./EntityFormModal";
import { useGetPayments } from "@/query/admin/payment";
import { useGetStudents } from "@/query/admin/student";

// --- Types ---
type Level = "TRACKS" | "TYPES" | "SUB_TYPES" | "HEADERS" | "MODULES";

interface IBreadcrumb {
  id: number | string;
  name: string;
  level: Level;
}

export default function CourseTrackManager() {
  const { data: payments } = useGetPayments();
  const { data: students } = useGetStudents();
  console.log("Payments:", payments, students);
  const [level, setLevel] = useState<Level>("TRACKS");
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb[]>([]);

  // Selection states
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [selectedSubTypeId, setSelectedSubTypeId] = useState<number | null>(
    null,
  );
  const [selectedHeaderId, setSelectedHeaderId] = useState<number | null>(null);

  // Modal State
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    fields: IFormField[];
    initialData: any;
    onSubmit: (data: any) => void;
  }>({
    isOpen: false,
    title: "",
    fields: [],
    initialData: null,
    onSubmit: () => {},
  });

  // Queries
  const { data: tracks = [], isLoading: loadingTracks } = useGetTracks();
  const { data: typesRes, isLoading: loadingTypes } = useGetAllTrackTypes({
    track_id: String(selectedTrackId || ""),
  });
  const { data: subTypesRes, isLoading: loadingSubTypes } = useGetTypeSubTypes({
    type_id: String(selectedTypeId || ""),
  });
  const { data: headersRes, isLoading: loadingHeaders } =
    useGetSubTypeModuleHeaders({
      sub_type_id: String(selectedSubTypeId || ""),
    });
  const { data: modulesRes, isLoading: loadingModules } = useGetHeaderModules({
    header_id: String(selectedHeaderId || ""),
  });

  const types = typesRes?.data || [];
  const subTypes = subTypesRes?.data || [];
  const headers = headersRes?.data || [];
  const modules = modulesRes?.data || [];

  // Mutations
  const createTrack = useCreateTrainingTrack();
  const updateTrack = useUpdateTrainingTrack();
  const deleteTrack = useDeleteTrainingTrack();

  const createType = useCreateType();
  const updateType = useUpdateType();
  const deleteType = useDeleteType();

  const createSubType = useCreateSubType();
  const updateSubType = useUpdateSubType();
  const deleteSubType = useDeleteSubType();

  const createHeader = useCreateCourseModuleHeader();
  const updateHeader = useUpdateCourseModuleHeader();
  const deleteHeader = useDeleteCourseModuleHeader();

  const createModule = useCreateCourseModule();
  const updateModule = useUpdateCourseModule();
  const deleteModule = useDeleteCourseModule();

  // --- Data for Current Level ---
  const currentTypes = types;
  const currentSubTypes = subTypes;
  const currentHeaders = headers;
  const currentModules = modules;

  // --- Navigation ---
  const handleNavigate = (
    nextLevel: Level,
    id: number | string,
    name: string,
    level: Level,
  ) => {
    setLevel(nextLevel);
    setBreadcrumbs((prev) => [
      ...prev,
      {
        id,
        name,
        level,
      },
    ]);

    if (nextLevel === "TYPES") setSelectedTrackId(id as number);
    if (nextLevel === "SUB_TYPES") setSelectedTypeId(id as number);
    if (nextLevel === "HEADERS") setSelectedSubTypeId(id as number);
    if (nextLevel === "MODULES") setSelectedHeaderId(id as number);
  };

  const handleBreadcrumbClick = (bcIndex: number) => {
    console.log(bcIndex, breadcrumbs);
    const targetLevel = breadcrumbs[bcIndex].level;
    const newBreadcrumbs = breadcrumbs.slice(0, bcIndex);
    console.log("new", newBreadcrumbs);
    setBreadcrumbs(newBreadcrumbs);
    console.log("level", targetLevel);
    setLevel(targetLevel);

    // Reset subsequent selections
    if (targetLevel === "TRACKS") {
      setSelectedTrackId(null);
      setSelectedTypeId(null);
      setSelectedSubTypeId(null);
      setSelectedHeaderId(null);
    } else if (targetLevel === "TYPES") {
      setSelectedTypeId(null);
      setSelectedSubTypeId(null);
      setSelectedHeaderId(null);
    } else if (targetLevel === "SUB_TYPES") {
      setSelectedSubTypeId(null);
      setSelectedHeaderId(null);
    } else if (targetLevel === "HEADERS") {
      setSelectedHeaderId(null);
    }
  };

  const goBack = () => {
    if (breadcrumbs.length > 0) {
      handleBreadcrumbClick(breadcrumbs.length - 1);
    }
  };

  // --- Modals Configurations ---
  const openModal = (
    title: string,
    fields: IFormField[],
    initialData: any,
    onSubmit: (data: any) => void,
  ) => {
    setModalConfig({ isOpen: true, title, fields, initialData, onSubmit });
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // TRACKS
  const openTrackModal = (item?: any) => {
    openModal(
      item ? "Edit Training Track" : "Create Training Track",
      [
        { name: "title", label: "Title", type: "text", required: true },
        {
          name: "slug",
          label: "Slug",
          type: "text",
          required: !item,
          autoSlug: !item,
        }, // Slug required on create
        {
          name: "description",
          label: "Description",
          type: "textarea",
          required: true,
        },
        {
          name: "duration_weeks",
          label: "Duration (Weeks)",
          type: "number",
          required: true,
        },
        { name: "price", label: "Price", type: "number" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { label: "Open", value: "open" },
            { label: "Coming Soon", value: "coming_soon" },
          ],
        },
      ],
      item || null,
      async (data) => {
        if (item) {
          await updateTrack.mutateAsync({ slug: item.slug, data });
        } else {
          await createTrack.mutateAsync(data);
        }
        closeModal();
      },
    );
  };

  // TYPES
  const openTypeModal = (item?: any) => {
    openModal(
      item ? "Edit Type" : "Create Type",
      [
        {
          name: "title",
          label: "Title",
          type: "select",
          required: true,
          options: [
            { label: "Fundamental Track", value: "Fundamental Track" },
            { label: "Specialized Track", value: "Specialized Track" },
          ],
        },
        { name: "price_ngn", label: "Price (NGN)", type: "number" },
        { name: "price_gbp", label: "Price (GBP)", type: "number" },
        { name: "description", label: "Description", type: "textarea" },
      ],
      item || null,
      async (data) => {
        if (item) {
          await updateType.mutateAsync({ id: item.id, data });
        } else {
          await createType.mutateAsync({
            ...data,
            training_track_id: selectedTrackId,
          });
        }
        closeModal();
      },
    );
  };

  // SUB TYPES
  const openSubTypeModal = (item?: any) => {
    openModal(
      item ? "Edit Sub Type" : "Create Sub Type",
      [
        { name: "title", label: "Title", type: "text", required: true },
        {
          name: "price_ngn",
          label: "Price (NGN)",
          type: "number",
          required: true,
        },
        {
          name: "price_gbp",
          label: "Price (GBP)",
          type: "number",
          required: true,
        },
        { name: "description", label: "Description", type: "textarea" },
      ],
      item || null,
      async (data) => {
        if (item) {
          await updateSubType.mutateAsync({ id: item.id, data });
        } else {
          await createSubType.mutateAsync({
            ...data,
            training_track_id: selectedTrackId,
            type_id: selectedTypeId,
          });
        }
        closeModal();
      },
    );
  };

  // HEADERS
  const openHeaderModal = (item?: any) => {
    openModal(
      item ? "Edit Module Header" : "Create Module Header",
      [{ name: "title", label: "Title", type: "text", required: true }],
      item || null,
      async (data) => {
        if (item) {
          await updateHeader.mutateAsync({ id: item.id, data });
        } else {
          await createHeader.mutateAsync({
            ...data,
            training_track_id: selectedTrackId,
            type_id: selectedTypeId,
            sub_type_id: selectedSubTypeId,
          });
        }
        closeModal();
      },
    );
  };

  // MODULES
  const openModuleModal = (item?: any) => {
    openModal(
      item ? "Edit Module" : "Create Module",
      [{ name: "title", label: "Title", type: "text", required: true }],
      item || null,
      async (data) => {
        if (item) {
          await updateModule.mutateAsync({ id: item.id, data });
        } else {
          await createModule.mutateAsync({
            ...data,
            training_track_id: selectedTrackId,
            type_id: selectedTypeId,
            sub_type_id: selectedSubTypeId,
            course_module_header_id: selectedHeaderId,
          });
        }
        closeModal();
      },
    );
  };

  // --- Render Helpers ---
  const renderBreadcrumbs = () => {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100 overflow-x-auto">
        <button
          onClick={() => {
            setLevel("TRACKS");
            setBreadcrumbs([]);
            setSelectedTrackId(null);
            setSelectedTypeId(null);
            setSelectedSubTypeId(null);
            setSelectedHeaderId(null);
          }}
          className={`hover:text-teal transition-colors flex items-center gap-1 ${
            level === "TRACKS" ? "text-[#00284F] font-bold" : ""
          }`}
        >
          <Folder size={16} /> Tracks
        </button>
        {breadcrumbs.map((bc, index) => (
          <React.Fragment key={index}>
            <ChevronRight size={16} className="text-gray-400 shrink-0" />
            <button
              onClick={() => handleBreadcrumbClick(index)}
              className={`hover:text-teal transition-colors whitespace-nowrap ${
                index === breadcrumbs.length - 1
                  ? "text-[#00284F] font-bold"
                  : ""
              }`}
            >
              {bc.name}
            </button>
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderCard = (
    item: any,
    icon: React.ReactNode,
    onEdit: () => void,
    onDelete?: () => void,
    onNavigate?: () => void,
  ) => {
    return (
      <div
        key={item.id || item.slug}
        className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col relative"
        onClick={onNavigate}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center">
            {icon}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit2 size={16} />
            </button>
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("Are you sure you want to delete this item?")) {
                    onDelete();
                  }
                }}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between w-full">
          <div>
            <h3 className="text-lg font-bold text-[#00284F] line-clamp-1">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
          {onNavigate && (
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={24} className="text-gray-300" />
            </div>
          )}
        </div>

        {item.price && (
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
            <span className="font-semibold text-teal">£{item.price}</span>
            <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
              {item.status}
            </span>
          </div>
        )}
      </div>
    );
  };

  // --- Main Render ---
  return (
    <div className="p-6 h-full flex flex-col">
      {renderBreadcrumbs()}

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {level !== "TRACKS" && (
            <button
              onClick={goBack}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h2 className="text-2xl font-bold text-[#00284F]">
              {level === "TRACKS" && "Training Tracks"}
              {level === "TYPES" && "Course Types"}
              {level === "SUB_TYPES" && "Sub Types"}
              {level === "HEADERS" && "Module Headers"}
              {level === "MODULES" && "Course Modules"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select an item to view its contents or edit its details.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (level === "TRACKS") openTrackModal();
            if (level === "TYPES") openTypeModal();
            if (level === "SUB_TYPES") openSubTypeModal();
            if (level === "HEADERS") openHeaderModal();
            if (level === "MODULES") openModuleModal();
          }}
          className="flex items-center gap-2 bg-[#00284F] hover:bg-[#003B73] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md shadow-blue-900/10"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {level === "TRACKS" &&
            tracks?.map((track: any) =>
              renderCard(
                track,
                <Folder size={20} />,
                () => openTrackModal(track),
                () => deleteTrack.mutate(track.slug),
                () => handleNavigate("TYPES", track.id, track.title, "TRACKS"),
              ),
            )}

          {level === "TYPES" &&
            currentTypes.map((type: any) =>
              renderCard(
                type,
                <Layers size={20} />,
                () => openTypeModal(type),
                () => deleteType.mutate(type.id),
                () => handleNavigate("SUB_TYPES", type.id, type.title, "TYPES"),
              ),
            )}

          {level === "SUB_TYPES" &&
            currentSubTypes.map((subType: any) =>
              renderCard(
                subType,
                <LayoutGrid size={20} />,
                () => openSubTypeModal(subType),
                () => deleteSubType.mutate(subType.id),
                () =>
                  handleNavigate(
                    "HEADERS",
                    subType.id,
                    subType.title,
                    "SUB_TYPES",
                  ),
              ),
            )}

          {level === "HEADERS" &&
            currentHeaders.map((header: any) =>
              renderCard(
                header,
                <FileText size={20} />,
                () => openHeaderModal(header),
                () => deleteHeader.mutate(header.id),
                () =>
                  handleNavigate("MODULES", header.id, header.title, "HEADERS"),
              ),
            )}

          {level === "MODULES" &&
            currentModules.map((module: any) =>
              renderCard(
                module,
                <BookOpen size={20} />,
                () => openModuleModal(module),
                () => deleteModule.mutate(module.id),
              ),
            )}
        </div>

        {((level === "TRACKS" && (!tracks || tracks.length === 0)) ||
          (level === "TYPES" && currentTypes.length === 0) ||
          (level === "SUB_TYPES" && currentSubTypes.length === 0) ||
          (level === "HEADERS" && currentHeaders.length === 0) ||
          (level === "MODULES" && currentModules.length === 0)) && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Folder size={32} className="text-gray-300" />
            </div>
            <p className="text-lg font-medium text-gray-500">No items found.</p>
            <p className="text-sm">Click "Add New" to create the first one.</p>
          </div>
        )}
      </div>

      <EntityFormModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        fields={modalConfig.fields}
        initialData={modalConfig.initialData}
        onClose={closeModal}
        onSubmit={modalConfig.onSubmit}
        isLoading={
          createTrack.isPending ||
          updateTrack.isPending ||
          createType.isPending ||
          updateType.isPending ||
          createSubType.isPending ||
          updateSubType.isPending ||
          createHeader.isPending ||
          updateHeader.isPending ||
          createModule.isPending ||
          updateModule.isPending
        }
      />
    </div>
  );
}
