"use client";

import React, { useState } from "react";
import {
  useGetMyEnrollments,
  useGetEnrollmentById,
} from "@/query/training/enrollments";
import EnrollmentDetailModal from "./components/EnrollmentDetailModal";
import { Calendar, ExternalLink, Clock } from "lucide-react";
import Link from "next/link";
import { IEnrollment } from "@/types/training/enrollments";

export default function MyEnrollmentsPage() {
  const { data: enrollments, isLoading } = useGetMyEnrollments();
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<IEnrollment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (enrollment: IEnrollment) => {
    setSelectedEnrollment(enrollment);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  if (!enrollments || enrollments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
          <BookOpen size={40} className="text-gray-300" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[#00284F]">
            No Enrollments Found
          </h3>
          <p className="text-gray-500 max-w-sm">
            You haven't enrolled in any training tracks yet. Start your journey
            today!
          </p>
        </div>
        <Link
          href="/training"
          className="inline-flex items-center h-12 px-6 bg-teal text-white rounded-xl font-bold hover:bg-teal/90 transition-all"
        >
          Browse Training Paths
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#00284F]">
            My Learning Journey
          </h2>
          <p className="text-gray-500 text-sm">
            Manage your enrolled tracks and view payment receipts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {enrollments.map((item) => {
          const isPaid =
            item.payment.status === "paid" || item.payment.status === "success";
          const isPending = !isPaid && item.payment.status !== "failed";

          return (
            <div
              key={item.enrollment_id}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#00284F] group-hover:text-teal transition-colors">
                      {item.training.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium font-manrope uppercase tracking-wider">
                      <Calendar size={12} />
                      Joined {new Date(item.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      isPaid
                        ? "bg-emerald-50 text-emerald-600"
                        : isPending
                          ? "bg-amber-50 text-amber-600"
                          : "bg-red-50 text-red-600"
                    }`}
                  >
                    {item.payment.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Amount
                    </p>
                    <p className="text-sm font-bold text-[#00284F]">
                      £{item.training.price}
                    </p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Gateway
                    </p>
                    <p className="text-sm font-bold text-[#00284F] capitalize">
                      {item.payment.gateway.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#424750] font-medium">
                      <Clock size={14} className="text-teal" />
                      {item.training.duration_weeks} Weeks
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(item)}
                    className="flex items-center gap-1.5 text-sm font-bold text-teal hover:underline transition-all"
                  >
                    View Details
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <EnrollmentDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        enrollment={selectedEnrollment}
      />
    </div>
  );
}

// Sub-component Helper
const BookOpen = ({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
