"use client";

import { useFetchWaitingList, useNotifyUserOfWaitingList } from "@/query/training/enquiry";
import { Loader2, Bell, CheckCircle2 } from "lucide-react";

export default function AdminWaitingListPage() {
  const { data: waitingList, isLoading } = useFetchWaitingList();
  const notifyMutation = useNotifyUserOfWaitingList();

  const entries = Array.isArray(waitingList) ? waitingList : waitingList ? [waitingList] : [];

  const handleNotify = (id: string) => {
    notifyMutation.mutate(id, {
      onSuccess: (data) => {
        // toast.success(data.message || "User notified successfully");
      },
      onError: () => {
        // toast.error("Failed to notify user");
      },
    });
  };

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#00284F]">Waiting List</h1>
        <p className="text-sm text-gray-500">
          View and manage users on the waiting list.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-teal" />
          </div>
        ) : entries.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            No waiting list entries found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="text-xs text-gray-500 uppercase">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Track</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {entries.map((entry: any) => (
                  <tr key={entry.id} className="text-gray-500">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">
                        {entry.full_name}
                      </div>
                    </td>
                    <td className="px-4 py-3">{entry.email}</td>
                    <td className="px-4 py-3">
                      {entry.track?.name || `Track #${entry.training_track_id}`}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${entry.notified_at
                            ? "bg-green-50 text-green-700"
                            : entry.status === "pending"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {entry.notified_at ? (
                          <>
                            <CheckCircle2 size={12} />
                            Notified
                          </>
                        ) : (
                          entry.status || "Pending"
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleNotify(String(entry.id))}
                        disabled={notifyMutation.isPending || !!entry.notified_at}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-teal/10 px-3 py-1.5 text-xs font-semibold text-teal hover:bg-teal hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {notifyMutation.isPending ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Bell size={12} />
                        )}
                        {entry.notified_at ? "Notified" : "Notify"}
                      </button>
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
