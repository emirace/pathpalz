"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { useGetSubTypeModuleHeaders } from "@/query/admin/course-module-headers";

interface CurriculumProps {
  subTypeId: string;
}

const ModuleHeader = ({ header, index }: { header: any; index: number }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-xl bg-[#00677D]/10 text-[#00677D] flex items-center justify-center font-bold">
            {index + 1}
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-[#00284F]">{header.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{header.modules?.length || 0} Modules</p>
          </div>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </button>

      {isOpen && (
        <div className="px-8 pb-8 animate-in slide-in-from-top-2 duration-300">
          <div className="pl-16 space-y-4">
            <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">
              {header.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {header.modules?.map((mod: any, i: number) => (
                <div key={mod.id || i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100/50">
                  <CheckCircle2 className="w-5 h-5 text-[#00677D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#00284F]">{mod.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{mod.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CurriculumSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 h-24 animate-pulse flex items-center justify-between">
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

export default function Curriculum({ subTypeId }: CurriculumProps) {
  const { data: headersRes, isLoading } = useGetSubTypeModuleHeaders({
    sub_type_id: subTypeId,
  });
  const headers = headersRes?.data || [];

  if (isLoading) return <CurriculumSkeleton />;

  if (!headers || headers.length === 0) return (
    <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Curriculum coming soon.</p>
    </div>
  );

  return (
    <div className="space-y-4">
      {headers.sort((a: any, b: any) => a.order - b.order).map((header: any, index: number) => (
        <ModuleHeader key={header.id} header={header} index={index} />
      ))}
    </div>
  );
}
