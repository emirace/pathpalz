"use client";

import React, { useState, useMemo } from "react";
import { useGetInstructors, useAddInstructor } from "@/query/admin/instructor";
import { useGetTracks } from "@/query/training/tracks";
import { useGetAllTypes } from "@/query/admin/types";
import { useGetAllSubTypes } from "@/query/admin/type-subs";
import { Plus, Users, Mail, Phone, Shield, ArrowLeft } from "lucide-react";
import EntityFormModal, { IFormField } from "./EntityFormModal";

export default function InstructorManager() {
  const { data: instructorsRes, isLoading } = useGetInstructors();
  const { data: tracks = [] } = useGetTracks();
  const { data: typesRes } = useGetAllTypes();
  const { data: subTypesRes } = useGetAllSubTypes();
  const addInstructor = useAddInstructor();

  const types = typesRes?.data || [];
  const subTypes = subTypesRes?.data || [];
  const instructors = instructorsRes?.data || [];

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    fields: IFormField[];
    initialData: any;
    onSubmit: (data: any) => void;
    onFormDataChange?: (data: any) => void;
  }>({
    isOpen: false,
    title: "",
    fields: [],
    initialData: null,
    onSubmit: () => {},
  });

  const openModal = (
    title: string,
    fields: IFormField[],
    initialData: any,
    onSubmit: (data: any) => void,
    onFormDataChange?: (data: any) => void,
  ) => {
    setModalConfig({
      isOpen: true,
      title,
      fields,
      initialData,
      onSubmit,
      onFormDataChange,
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
      { name: "password", label: "Password", type: "text", required: true },
      {
        name: "password_confirmation",
        label: "Confirm Password",
        type: "text",
        required: true,
      },
    ];

    openModal(
      "Add New Instructor",
      baseFields,
      null,
      async (data) => {
        await addInstructor.mutateAsync(data);
        closeModal();
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

      <div className="flex-1 overflow-y-auto pr-2 pb-10">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-gray-100 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : instructors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor: any) => (
              <div
                key={instructor.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#00284F] text-lg">
                      {instructor.first_name} {instructor.last_name}
                    </h3>
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                      {instructor.usertype}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Mail size={16} className="text-gray-400" />
                    <span className="truncate">{instructor.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Phone size={16} className="text-gray-400" />
                    <span>{instructor.phone_number || "No phone number"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Shield size={16} className="text-gray-400" />
                    <span>
                      Status:{" "}
                      <span className="text-teal font-medium">Active</span>
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-50 flex justify-end">
                  <button className="text-sm font-bold text-gray-400 hover:text-[#00284F] transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Users size={32} className="text-gray-300" />
            </div>
            <p className="text-lg font-medium text-gray-500">
              No instructors found.
            </p>
            <p className="text-sm">
              Click "Add Instructor" to create the first one.
            </p>
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
        onFormDataChange={modalConfig.onFormDataChange}
        isLoading={addInstructor.isPending}
      />
    </div>
  );
}
