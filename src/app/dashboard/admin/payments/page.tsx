"use client";

import React from "react";
import { useGetPayments } from "@/query/admin/payment";
import { Loader2 } from "lucide-react";

export default function AdminPaymentsPage() {
  const { data: payments, isLoading } = useGetPayments();

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#00284F]">Payments</h1>
        <p className="text-sm text-gray-500">
          View recent payments and orders.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-teal" />
          </div>
        ) : !payments || payments.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            No payments found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="text-xs text-gray-500 uppercase">
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payments.map((p: any) => (
                  <tr key={p.enrollment_id} className="text-gray-500">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">
                        {p.student.first_name || ""} {p.student.last_name || ""}
                      </div>
                      <div className="text-xs text-gray-500">
                        {p.student.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">{p.purchased_course?.title}</td>
                    <td className="px-4 py-3">
                      {p.payment?.currency} {p.payment?.amount}
                    </td>
                    <td className="px-4 py-3">{p.payment?.status}</td>
                    <td className="px-4 py-3">
                      {p.payment?.gateway?.name}/{p.payment?.method}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(p.purchased_at).toLocaleString()}
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
