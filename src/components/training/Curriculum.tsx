"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { useGetSubTypeModuleHeaders } from "@/query/admin/course-module-headers";
import SyllabusModal from "./TrackDetailClient/SyllabusModal";
import { ISubType } from "@/types/admin/admin";

interface CurriculumProps {
  subTypeId: string;
  subType?: ISubType | null;
  onApply?: (type: "training_track" | "type" | "sub_type", id: number) => void;
}

const ModuleHeader = ({
  header,
  index,
  onClick,
}: {
  header: any;
  index: number;
  onClick: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden mb-4">
      <button
        onClick={onClick}
        className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors group"
      >
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-xl bg-[#00677D]/10 text-[#00677D] flex items-center justify-center font-bold">
            {index + 1}
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-[#00284F]">{header.title}</h3>
          </div>
        </div>
        <div className="transition-transform duration-300 group-hover:rotate-90">
          <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#00677D]" />
        </div>
      </button>
    </div>
  );
};

const CurriculumSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="bg-white rounded-3xl border border-gray-100 p-6 h-24 animate-pulse flex items-center justify-between"
      >
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 bg-gray-100 rounded-xl" />
          <div className="space-y-2">
            <div className="h-6 bg-gray-100 rounded-lg w-48" />
            <div className="h-4 bg-gray-100 rounded-lg w-24" />
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-100 rounded-full" />
      </div>
    ))}
  </div>
);

export default function Curriculum({
  subTypeId,
  subType,
  onApply,
}: CurriculumProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: headersRes, isLoading } = useGetSubTypeModuleHeaders({
    sub_type_id: subTypeId,
  });
  const headers = headersRes?.data || [];

  if (isLoading) return <CurriculumSkeleton />;

  if (!headers || headers.length === 0)
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Curriculum coming soon.</p>
      </div>
    );

  return (
    <div className="space-y-4">
      {headers
        .sort((a: any, b: any) => a.order - b.order)
        .map((header: any, index: number) => (
          <ModuleHeader
            key={header.id}
            header={header}
            index={index}
            onClick={() => setIsModalOpen(true)}
          />
        ))}

      <SyllabusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subType={subType || null}
        onApply={onApply || (() => {})}
      />
    </div>
  );
}
