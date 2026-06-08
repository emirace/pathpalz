"use client";

import { useGetAllTrackTypes } from "@/query/admin/types";
import TypeCard from "./TypeCard";

interface TrainingPathsProps {
  trackId: string;
  trackTitle: string;
  slug: string;
  onApply: (type: "training_track" | "type" | "sub_type", id: number) => void;
  isOpen: boolean;
  onJoinWaitlist: () => void;
}
const TypeCardSkeleton = () => (
  <div className="bg-white rounded-4xl p-8 sm:p-10 border border-gray-100 flex flex-col relative overflow-hidden animate-pulse">
    <div className="w-16 h-16 bg-gray-100 rounded-2xl mb-8" />
    <div className="flex-1 space-y-6">
      <div className="space-y-3">
        <div className="h-8 bg-gray-100 rounded-xl w-3/4" />
        <div className="h-4 bg-gray-100 rounded-lg w-full" />
        <div className="h-4 bg-gray-100 rounded-lg w-5/6" />
      </div>
      <div className="space-y-4 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-100 rounded-full" />
            <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-8 border-t border-gray-50">
        <div className="h-6 bg-gray-100 rounded-lg w-1/3" />
        <div className="h-10 bg-gray-100 rounded-xl w-1/4" />
      </div>
    </div>
  </div>
);

export default function TrainingPaths({
  trackId,
  trackTitle,
  onApply,
  slug,
  isOpen,
  onJoinWaitlist,
}: TrainingPathsProps) {
  const { data: typesRes, isLoading: loadingTypes } = useGetAllTrackTypes({
    track_id: trackId,
  });
  const types = typesRes?.data || [];

  if (!types || types.length === 0) return null;

  return (
    <section id="types" className="py-12 bg-[#F2F4F7] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl  font-black font-manrope  text-[#00284F] mb-6 tracking-tight">
            {trackTitle} Training Paths
          </h2>
          <p className="text-base sm:text-xl text-gray-600 leading-relaxed ">
            Our curriculum is split into two rigorous phases designed to take
            you from core logic to professional deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {loadingTypes
            ? [1, 2].map((i) => <TypeCardSkeleton key={i} />)
            : types.map((type, index) => (
                <TypeCard
                  key={type.id}
                  type={type}
                  index={index}
                  onApply={onApply}
                  slug={slug}
                  isOpen={isOpen}
                  onJoinWaitlist={onJoinWaitlist}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
