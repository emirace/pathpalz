"use client";

import React, { useState, useMemo } from "react";
import { useGetInstructors, useAddInstructor, useUpdateInstructorStatus } from "@/query/admin/instructor";
import { useGetTracks } from "@/query/training/tracks";
import { useGetAllTypes } from "@/query/admin/types";
import { useGetAllSubTypes } from "@/query/admin/type-subs";
import { Plus, Users, Mail, Phone, CheckCircle } from "lucide-react";
import EntityFormModal, { IFormField } from "./EntityFormModal";

export default function InstructorManager() {
  const { data: instructorsRes, isLoading } = useGetInstructors();
  const { data: tracks = [] } = useGetTracks();
  const { data: typesRes } = useGetAllTypes();
  const { data: subTypesRes } = useGetAllSubTypes();
  const addInstructor = useAddInstructor();
  const {mutate: updateInstructorStatus,isPending:isUpdatingInstructorStatus}=useUpdateInstructorStatus();

  const handleStatusChange = (
    instructorId: number | string,
    status: "active" | "inactive" | "suspended",
  ) => {
    updateInstructorStatus({ instructorId: String(instructorId), status });
  };

  const types = typesRes?.data || [];
  const subTypes = subTypesRes?.data || [];
  const instructors = instructorsRes || [];
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    fields: IFormField[];
    initialData: any;
    onSubmit: (data: any) => void;
    onFormDataChange?: (data: any) => void;
    error?: string | null;
  }>({
    isOpen: false,
    title: "",
    fields: [],
    initialData: null,
    onSubmit: () => {},
    error: null,
  });

  const openModal = (
    title: string,
    fields: IFormField[],
    initialData: any,
    onSubmit: (data: any) => void,
    onFormDataChange?: (data: any) => void,
    error: string | null = null,
  ) => {
    setModalConfig({
      isOpen: true,
      title,
      fields,
      initialData,
      onSubmit,
      onFormDataChange,
      error,
    });
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const openAddInstructorModal = () => {
    const baseFields: IFormField[] = [
      {
        name: "email",
        label: "Email Address",
        type: "text",
        required: true,
        placeholder: "instructor@example.com",
      },
      {
        name: "phone_number",
        label: "Phone Number",
        type: "text",
        required: true,
        placeholder: "+1234567890",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
      },
      {
        name: "teachable_type",
        label: "Teachable Type",
        type: "select",
        required: true,
        options: [
          { label: "Training Track", value: "training_track" },
          { label: "Type", value: "type" },
          { label: "Sub Type", value: "sub_type" },
        ],
      },
      {
        name: "teachable_id",
        label: "Teachable ID",
        type: "select",
        required: true,
        options: [],
      },
      { name: "password", label: "Password", type: "password", required: true },
      {
        name: "password_confirmation",
        label: "Confirm Password",
        type: "password",
        required: true,
      },
    ];

    openModal(
      "Add New Instructor",
      baseFields,
      null,
      async (data) => {
        try {
          setModalConfig((prev) => ({ ...prev, error: null }));
          await addInstructor.mutateAsync(data);
          setSuccessMessage("Instructor created successfully!");
          setTimeout(() => setSuccessMessage(null), 5000);
          closeModal();
        } catch (err: any) {
          const errorMessage =
            err?.response?.data?.message ||
            err?.message ||
            "Failed to add instructor";
          setModalConfig((prev) => ({ ...prev, error: errorMessage }));
        }
      },
      (formData) => {
        const type = formData.teachable_type;
        let idOptions: { label: string; value: string | number }[] = [];

        if (type === "training_track") {
          idOptions = tracks.map((t: any) => ({ label: t.title, value: t.id }));
        } else if (type === "type") {
          idOptions = types.map((t: any) => ({ label: t.title, value: t.id }));
        } else if (type === "sub_type") {
          idOptions = subTypes.map((t: any) => ({
            label: t.title,
            value: t.id,
          }));
        }

        setModalConfig((prev) => {
          const updatedFields = prev.fields.map((f) => {
            if (f.name === "teachable_id") {
              return { ...f, options: idOptions };
            }
            return f;
          });
          // Only update if options actually changed to avoid unnecessary re-renders
          const currentOptions = prev.fields.find(
            (f) => f.name === "teachable_id",
          )?.options;
          if (JSON.stringify(currentOptions) === JSON.stringify(idOptions)) {
            return prev;
          }
          return { ...prev, fields: updatedFields };
        });
      },
    );
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#00284F]">Instructors</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your platform instructors and their access.
          </p>
        </div>

        <button
          onClick={openAddInstructorModal}
          className="flex items-center gap-2 bg-[#00284F] hover:bg-[#003B73] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md shadow-blue-900/10"
        >
          <Plus size={18} /> Add Instructor
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="text-green-500">
            <CheckCircle size={20} />
          </div>
          <p className="text-sm font-bold text-green-700">{successMessage}</p>
        </div>
      )}

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col flex-1">
          {/* Table Header */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Assignment
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  [1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0" />
                          <div className="h-4 bg-gray-100 rounded w-32" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-100 rounded w-40" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-100 rounded w-28" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-5 bg-gray-100 rounded w-24" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-5 bg-gray-100 rounded-full w-16" />
                      </td>
                    </tr>
                  ))
                ) : instructors.length > 0 ? (
                  instructors.map((instructor) => (
                    <tr
                      key={instructor.instructor_id}
                      className="hover:bg-gray-50/60 transition-colors duration-150 group"
                    >
                      {/* Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Users size={16} />
                          </div>
                          <span className="font-semibold text-[#00284F]">
                            {instructor.user.first_name}{" "}
                            {instructor.user.last_name}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Mail size={14} className="text-gray-300 shrink-0" />
                          <span className="truncate max-w-[200px]">
                            {instructor.user.email}
                          </span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Phone size={14} className="text-gray-300 shrink-0" />
                          <span>
                            {instructor.user.phone_number || (
                              <span className="text-gray-300 italic">
                                Not set
                              </span>
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Assignment */}
                      <td className="px-6 py-4">
                        {instructor.assigned_course ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg uppercase tracking-wide">
                            {instructor.assigned_course.type}:{" "}
                            {instructor.assigned_course.title}
                          </span>
                        ) : (
                          <span className="text-gray-300 italic text-xs">
                            Unassigned
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                            instructor.user.status === "active"
                              ? "text-emerald-600 bg-emerald-50"
                              : instructor.user.status === "inactive"
                              ? "text-gray-500 bg-gray-50"
                              : "text-yellow-700 bg-yellow-50"
                          }`}>
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                instructor.user.status === "active"
                                  ? "bg-emerald-500"
                                  : instructor.user.status === "inactive"
                                  ? "bg-gray-400"
                                  : "bg-yellow-600"
                              }`}
                            />
                            {instructor.user.status}
                          </span>

                          <select
                            defaultValue={instructor.user.status}
                            onChange={(e) =>
                              handleStatusChange(
                                instructor.user.id,
                                e.target.value as "active" | "inactive" | "suspended",
                              )
                            }
                            disabled={isUpdatingInstructorStatus}
                            className="text-xs py-1 px-2 border border-gray-100 rounded-lg bg-white"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="suspended">Suspended</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                          <Users size={32} className="text-gray-300" />
                        </div>
                        <p className="text-lg font-medium text-gray-500">
                          No instructors found.
                        </p>
                        <p className="text-sm">
                          Click &quot;Add Instructor&quot; to create the first
                          one.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <EntityFormModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        fields={modalConfig.fields}
        initialData={modalConfig.initialData}
        onClose={closeModal}
        onSubmit={modalConfig.onSubmit}
        onFormDataChange={modalConfig.onFormDataChange}
        isLoading={addInstructor.isPending}
        error={modalConfig.error}
      />
    </div>
  );
}
