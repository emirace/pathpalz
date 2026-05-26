"use client";

import React from "react";
import { useGetStudents } from "@/query/admin/student";
import { Loader2 } from "lucide-react";

export default function AdminStudentsPage() {
  const { data: students, isLoading } = useGetStudents();

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#00284F]">Students</h1>
        <p className="text-sm text-gray-500">Manage registered students.</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-teal" />
          </div>
        ) : !students || students.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            No students found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="text-xs text-gray-500 uppercase">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Roles</th>
                  <th className="px-4 py-3">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {students.map((s: any) => (
                  <tr key={s.id} className="text-gray-500">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">
                        {s.first_name} {s.last_name || ""}
                      </div>
                    </td>
                    <td className="px-4 py-3">{s.email}</td>
                    <td className="px-4 py-3">{(s.roles || []).join(", ")}</td>
                    <td className="px-4 py-3">
                      {new Date(s.joined_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
