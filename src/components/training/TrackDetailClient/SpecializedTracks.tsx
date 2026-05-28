"use client";

import React from "react";
import {
  Monitor,
  Database,
  Smartphone,
  Globe,
  ChevronRight,
} from "lucide-react";
import { useGetAllTrackTypes } from "@/query/admin/types";
import { useGetTypeSubTypes } from "@/query/admin/type-subs";
import { ISubType, IType } from "@/types/admin/admin";
import SyllabusModal from "./SyllabusModal";
import { useSetting } from "@/states/setting";
import { getCurrencySymbol } from "@/utils/currency";

interface SpecializedTracksProps {
  trackId: string;
  onApply: (type: "training_track" | "type" | "sub_type", id: number) => void;
  isOpen: boolean;
  onJoinWaitlist: () => void;
}

const SubTypeCard = ({
  subType,
  onApply,
  onViewSyllabus,
  isOpen,
  onJoinWaitlist,
}: {
  subType: ISubType;
  onApply: (type: "training_track" | "type" | "sub_type", id: number) => void;
  onViewSyllabus: (subType: ISubType) => void;
  isOpen: boolean;
  onJoinWaitlist: () => void;
}) => {
  const { country } = useSetting();

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("front")) return <Monitor className="w-6 h-6" />;
    if (t.includes("back")) return <Database className="w-6 h-6" />;
    if (t.includes("mobile")) return <Smartphone className="w-6 h-6" />;
    return <Globe className="w-6 h-6" />;
  };

  const getTags = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("front")) return ["React", "TypeScript", "Tailwind"];
    if (t.includes("back")) return ["Python", "PostgreSQL", "Node.js"];
    if (t.includes("mobile")) return ["React Native", "Firebase", "Expo"];
    return ["React", "Node.js", "PostgreSQL"];
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-xl bg-gray-50 text-[#00284F] flex items-center justify-center group-hover:bg-[#00677D]/10 group-hover:text-[#00677D] transition-colors">
          {getIcon(subType.title)}
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-[#00284F]">
            {getCurrencySymbol(country?.currency)}
            {parseInt(
              country?.currency === "NGN"
                ? subType.price_ngn
                : subType.price_gbp,
            )}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-[#00284F] mb-3">{subType.title}</h3>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-1">
        {subType.description ||
          "Master industry-standard workflows and build production-ready systems with expert guidance."}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {getTags(subType.title).map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
        <button
          onClick={() => onViewSyllabus(subType)}
          className="text-[#00677D] font-bold flex items-center gap-1 hover:gap-2 transition-all text-sm"
        >
          View Syllabus
          <ChevronRight className="w-4 h-4" />
        </button>
        {isOpen ? (
          <button
            onClick={() => onApply("sub_type", subType.id)}
            className="bg-[#00677D] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#00677D]/90 transition-colors shadow-lg shadow-[#00677D]/20"
          >
            Apply
          </button>
        ) : (
          <button
            onClick={onJoinWaitlist}
            className="text-[#00677D] font-semibold italic text-sm hover:underline transition-all cursor-pointer"
          >
            Join Waitlist
          </button>
        )}
      </div>
    </div>
  );
};

const SpecializedTracksSkeleton = () => (
  <div className="w-full space-y-12">
    <div className="flex items-center gap-4 animate-pulse">
      <div className="h-10 bg-gray-100 rounded-xl w-64" />
      <div className="h-px bg-gray-100 flex-1" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-3xl p-8 border border-gray-100 h-[350px] animate-pulse"
        >
          <div className="flex justify-between mb-8">
            <div className="w-12 h-12 bg-gray-100 rounded-xl" />
            <div className="w-20 h-8 bg-gray-100 rounded-lg" />
          </div>
          <div className="h-6 bg-gray-100 rounded-lg w-3/4 mb-4" />
          <div className="h-4 bg-gray-100 rounded-lg w-full mb-2" />
          <div className="h-4 bg-gray-100 rounded-lg w-5/6 mb-8" />
          <div className="flex gap-2 mb-8">
            <div className="h-6 bg-gray-100 rounded-full w-16" />
            <div className="h-6 bg-gray-100 rounded-full w-20" />
            <div className="h-6 bg-gray-100 rounded-full w-16" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function SpecializedTracks({
  trackId,
  onApply,
  isOpen,
  onJoinWaitlist,
}: SpecializedTracksProps) {
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = React.useState(false);
  const [selectedSubType, setSelectedSubType] = React.useState<ISubType | null>(
    null,
  );

  const { data: typesRes, isLoading: loadingTypes } = useGetAllTrackTypes({
    track_id: trackId,
  });
  const types = typesRes?.data || [];

  const specializedType = types.find((t: IType) =>
    t.title.toLowerCase().includes("specialized track"),
  );

  const { data: subTypesRes, isLoading: loadingSubTypes } = useGetTypeSubTypes({
    type_id: String(specializedType?.id || ""),
  });
  const subTypes = subTypesRes?.data || [];

  if (loadingTypes || (specializedType && loadingSubTypes)) {
    return <SpecializedTracksSkeleton />;
  }

  if (!specializedType || subTypes.length === 0) return null;

  return (
    <div className="w-full space-y-12">
      <div className="flex items-center gap-6">
        <h2 className="text-3xl font-black font-manrope text-[#00284F] whitespace-nowrap">
          Specialized Tracks
        </h2>
        <div className="h-px bg-gray-200 flex-1 hidden sm:block" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {subTypes.map((subType) => (
          <SubTypeCard
            key={subType.id}
            subType={subType}
            onApply={onApply}
            onViewSyllabus={(sub) => {
              setSelectedSubType(sub);
              setIsSyllabusModalOpen(true);
            }}
            isOpen={isOpen}
            onJoinWaitlist={onJoinWaitlist}
          />
        ))}
      </div>

      <SyllabusModal
        isOpen={isSyllabusModalOpen}
        onClose={() => setIsSyllabusModalOpen(false)}
        subType={selectedSubType}
        onApply={onApply}
      />
    </div>
  );
}
