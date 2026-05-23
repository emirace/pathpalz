import React, { useState } from "react";
import { useGetTypeSubTypes } from "@/query/admin/type-subs";
import { useGetTypeModules } from "@/query/training/instructor";
import { IType } from "@/types/admin/admin";
import { CheckCircle2, ChevronRight, GraduationCap, Award } from "lucide-react";

const TypeCard = ({
  type,
  index,
  onApply,
}: {
  type: IType;
  index: number;
  onApply: (type: "training_track" | "type" | "sub_type", id: number) => void;
}) => {
  const [showModal, setShowModal] = useState(false);
  const { data: subTypesRes, isLoading: loadingSubTypes } = useGetTypeSubTypes({
    type_id: String(type.id),
  });
  const subTypes = subTypesRes?.data || [];

  const icons = [
    <GraduationCap key="cap" className="w-7 h-7" />,
    <Award key="award" className="w-7 h-7" />,
  ];
  const colors = ["text-[#00677D] bg-[#00677D]/10", "text-blue-600 bg-blue-50"];

  return (
    <div className="bg-white rounded-4xl p-8 sm:p-10 border border-gray-100 flex flex-col relative overflow-hidden">
      <div className="absolute -top-4 right-2 text-[5rem] font-black text-gray-200 pointer-events-none select-none">
        0{index + 1}
      </div>

      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 relative z-10 ${
          colors[index % colors.length]
        }`}
      >
        {icons[index % icons.length]}
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#00284F] mb-4 capitalize font-manrope ">
          {type.title}
        </h3>
        <p className="text-gray-500 mb-8 leading-relaxed">{type.description}</p>

        <ul className="space-y-4 mb-10 flex-1">
          {loadingSubTypes
            ? [1, 2, 3].map((i) => (
                <li key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-5 h-5 bg-gray-100 rounded-full shrink-0" />
                  <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
                </li>
              ))
            : subTypes.map((sub) => (
                <li key={sub.id} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00677D] shrink-0 mt-0.5" />
                  <span className="text-black font-medium">{sub.title}</span>
                </li>
              ))}
        </ul>

        <div className="flex items-center justify-between pt-8 border-t border-gray-100 mt-auto">
          <button
            onClick={() => setShowModal(true)}
            className="text-[#00677D] font-semibold flex items-center gap-1 hover:gap-2 transition-all text-lg"
          >
            {index === 0 ? "View Syllabus" : "View Track Info"}
            <ChevronRight className="w-5 h-5" />
          </button>
          {type.price && parseInt(type.price) > 0 && (
            <span className="text-3xl font-semibold text-[#00284F]">
              £{parseInt(type.price)}
            </span>
          )}
          <button
            onClick={() => onApply("type", type.id)}
            className="bg-[#00677D] text-white px-8 py-2 rounded-2xl font-bold hover:bg-[#00677D]-600 transition-all shadow-lg shadow-[#00677D]/20 hover:shadow-[#00677D]/40 active:scale-95"
          >
            Apply
          </button>
        </div>
      </div>
      {showModal && (
        <TypeModulesModal
          typeId={type.id}
          title={type.title}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const TypeModulesModal = ({
  typeId,
  title,
  onClose,
}: {
  typeId: number;
  title: string;
  onClose: () => void;
}) => {
  const { data: modulesRes, isLoading } = useGetTypeModules(typeId);
  const modules = modulesRes || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-2xl shadow-lg p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#00284F]">
            {title} — Modules
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        {isLoading ? (
          <div className="py-8 flex justify-center">
            <LoaderPlaceholder />
          </div>
        ) : modules.length === 0 ? (
          <div className="py-8 text-center text-gray-400">
            No modules found.
          </div>
        ) : (
          <ul className="space-y-3 max-h-80 overflow-y-auto">
            {modules.map((m: any) => (
              <li key={m.id} className="p-3 rounded-lg border border-gray-200">
                <div className="font-semibold text-gray-900">{m.title}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const LoaderPlaceholder = () => (
  <div className="animate-pulse">
    <div className="h-4 w-40 bg-gray-100 rounded mb-2" />
    <div className="h-3 w-28 bg-gray-100 rounded" />
  </div>
);

export default TypeCard;
