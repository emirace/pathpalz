"use client";

import {
  useGetStudentAssignments,
  useGetStudentAssignmentsPermodule,
} from "@/query/training/student/assignment";
import AssignmentCard from "./AssignmentCard";
import { Calendar } from "lucide-react";

type Props = {
  enrollment: any;
  courseModuleHeaderId?: string;
};

export default function AssignmentsOverview({
  enrollment,
  courseModuleHeaderId,
}: Props) {
  console.log("enrollment", enrollment);
  const { data: assignments } = useGetStudentAssignments({
    purchasable_type: courseModuleHeaderId ? undefined : "type",
  });
  const { data: assignmentsPerModule } = useGetStudentAssignmentsPermodule({
    courseModuleHeaderId: courseModuleHeaderId,
  });

  return (
    <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-[#00284F]">
            Assignments Overview
          </h2>
          <p className="text-sm text-gray-500">
            All assignments for {enrollment?.purchased_course.title}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-[#00284F] text-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-teal flex items-center font-bold gap-1">
              <Calendar /> TO DO
            </p>
            <div className="mt-2 font-bold">0</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-gray-400">Completed</p>
            <div className="mt-2 font-bold text-[#00284F]">0</div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold text-teal border-b-2 border-teal pb-2">
              All Items
            </button>
            <button className="text-sm text-gray-400">To Do</button>
            <button className="text-sm text-gray-400">Submitted</button>
            <button className="text-sm text-gray-400">Graded</button>
          </div>
        </div>

        <div className="space-y-4">
          {assignments?.data?.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No assignments found for this course.
            </div>
          )}

          <div className="space-y-4">
            {assignments?.data?.map((a) => (
              <AssignmentCard
                key={a.id}
                assignment={a}
                enrollmentId={enrollment.enrollment_id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
