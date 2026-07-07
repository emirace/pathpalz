import React, { useMemo } from "react";
import { useGetStudentProgress } from "@/query/training/student";
import { BookOpen, CheckCircle2, CircleDashed, Loader2 } from "lucide-react";

function StudentProgress({ enrollment }: { enrollment: any }) {
  const course = enrollment?.purchased_course;

  const progressFilter = useMemo(() => {
    if (!course?.id) return {};

    if (course.type === "Track") {
      return { track_id: Number(course.id) };
    }

    if (course.type === "Type") {
      return { type_id: Number(course.id) };
    }

    if (course.type === "TypeSub") {
      return { sub_type_id: Number(course.id) };
    }

    return {};
  }, [course?.id, course?.type]);

  const { data: studentProgress, isLoading } =
    useGetStudentProgress(progressFilter);

  const progressPercent = Math.round(studentProgress?.progress || 0);
  const completedModules = studentProgress?.completed_modules || 0;
  const totalModules = studentProgress?.total_modules || 0;
  const modules = studentProgress?.modules || [];

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-teal" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="rounded-3xl bg-linear-to-br from-[#00284F] to-[#00677D] p-8 text-white shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
              Course progress
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              {course?.title || "Your learning progress"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-200">
              Track completion across the modules in this enrolled course.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
            <p className="text-3xl font-black">{progressPercent}%</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-200">
              completed
            </p>
          </div>
        </div>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-teal-300 transition-all"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-200">
          <span className="rounded-full bg-white/10 px-3 py-1">
            {completedModules} of {totalModules} modules complete
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1">
            Filtered by {course?.type || "course"}
          </span>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#00284F]">Module progress</h3>
          <span className="text-sm text-gray-500">
            {modules.length ? `${modules.length} modules` : "No modules"}
          </span>
        </div>

        {modules.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-gray-500">
            No progress data is available for this course yet.
          </div>
        ) : (
          <div className="space-y-3">
            {modules.map((module: any) => (
              <div
                key={module.module_id}
                className="flex flex-col gap-3 rounded-2xl border border-gray-100 p-4 transition hover:border-teal/30 hover:shadow-sm md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-start gap-3">
                  {module.is_completed ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                  ) : (
                    <CircleDashed className="mt-0.5 h-5 w-5 text-gray-400" />
                  )}
                  <div>
                    <p className="font-semibold text-[#00284F]">
                      {module.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {module.is_completed
                        ? "Completed"
                        : "In progress or not started yet"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 text-sm text-gray-600">
                  <BookOpen className="h-4 w-4" />
                  <span>{module.is_completed ? "Completed" : "Pending"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentProgress;
