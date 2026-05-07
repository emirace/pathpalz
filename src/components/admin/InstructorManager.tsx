"use client";

import React, { useState } from "react";
import { useGetInstructors, useAddInstructor } from "@/query/admin/instructor";
import { Plus, Users, Mail, Phone, Shield, ArrowLeft } from "lucide-react";
import EntityFormModal, { IFormField } from "./EntityFormModal";

export default function InstructorManager() {
  const { data: instructorsRes, isLoading } = useGetInstructors();
  const addInstructor = useAddInstructor();

  const instructors = instructorsRes?.data || [];

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

  const openModal = (
    title: string,
    fields: IFormField[],
    initialData: any,
    onSubmit: (data: any) => void
  ) => {
    setModalConfig({ isOpen: true, title, fields, initialData, onSubmit });
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const openAddInstructorModal = () => {
    openModal(
      "Add New Instructor",
      [
        { name: "email", label: "Email Address", type: "text", required: true, placeholder: "instructor@example.com" },
        { name: "phone_number", label: "Phone Number", type: "text", required: true, placeholder: "+1234567890" },
        { name: "password", label: "Password", type: "text", required: true },
        { name: "password_confirmation", label: "Confirm Password", type: "text", required: true },
      ],
      null,
      async (data) => {
        await addInstructor.mutateAsync(data);
        closeModal();
      }
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
              <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-2xl" />
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
                    <span>Status: <span className="text-teal font-medium">Active</span></span>
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
            <p className="text-lg font-medium text-gray-500">No instructors found.</p>
            <p className="text-sm">Click "Add Instructor" to create the first one.</p>
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
        isLoading={addInstructor.isPending}
      />
    </div>
  );
}
