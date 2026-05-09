"use client";

import React from "react";
import { X, CheckCircle2, BookOpen } from "lucide-react";
import { useGetSubTypeModuleHeaders } from "@/query/admin/course-module-headers";
import { useGetHeaderModules } from "@/query/admin/course-modules";
import { ISubType } from "@/types/admin/admin";

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  subType: ISubType | null;
  onApply: (type: "training_track" | "type" | "sub_type", id: number) => void;
}

const ModuleList = ({ headerId }: { headerId: string }) => {
  const { data: modulesRes, isLoading } = useGetHeaderModules({
    header_id: headerId,
  });
  const modules = modulesRes?.data || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pl-16 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 bg-gray-100 rounded w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pl-16">
      {modules.map((mod: any) => (
        <div key={mod.id} className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00677D] mt-2 shrink-0" />
          <span className="text-sm font-medium text-gray-600 leading-tight">
            {mod.title}
          </span>
        </div>
      ))}
      {modules.length === 0 && (
        <span className="text-xs text-gray-400 italic pl-1">
          No modules listed for this section.
        </span>
      )}
    </div>
  );
};

const SyllabusModal = ({
  isOpen,
  onClose,
  subType,
  onApply,
}: SyllabusModalProps) => {
  const { data: headersRes, isLoading } = useGetSubTypeModuleHeaders({
    sub_type_id: String(subType?.id || ""),
  });
  const headers = headersRes?.data || [];

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#00284F]/60 backdrop-blur-md transition-all duration-300"
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-8 pb-6 border-b border-gray-50 flex justify-between items-center shrink-0">
          <div className="w-full text-center pr-8">
            <h2 className="text-3xl font-black font-manrope text-[#00284F]">
              12 Weeks Learning Curriculum
            </h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <X className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-8 pt-6 custom-scrollbar">
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            {subType?.description ||
              "Entry by completion of Foundational tracks, or by instructor recommendation after Foundation. This is not a beginner track — it assumes trainees can already build systems independently."}
          </p>

          {isLoading ? (
            <div className="space-y-8 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    <div className="h-6 bg-gray-200 rounded w-48" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 bg-gray-200 rounded w-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : headers.length > 0 ? (
            <div className="space-y-8 pb-4">
              {headers.map((header, index) => (
                <div
                  key={header.id}
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#00677D]/10 text-[#00677D] flex items-center justify-center font-black text-sm shrink-0">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-black text-[#00284F] tracking-wider uppercase">
                      {header.title}
                    </h3>
                  </div>

                  <ModuleList headerId={String(header.id)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <BookOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">
                Curriculum details are being finalized.
              </p>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-8 pt-4 border-t border-gray-50 shrink-0">
          <button
            onClick={() => {
              if (subType) onApply("sub_type", subType.id);
              onClose();
            }}
            className="w-full py-5 bg-[#00677D] text-white rounded-2xl font-bold text-lg hover:bg-[#00677D]/90 transition-all shadow-xl shadow-[#00677D]/20 active:scale-[0.98]"
          >
            Apply for {subType?.title || "this Track"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
};

export default SyllabusModal;
