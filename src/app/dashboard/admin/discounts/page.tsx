"use client";

import React, { useState } from "react";
import {
  useGetDiscounts,
  useCreateDiscount,
  useUpdateDiscount,
  useDeleteDiscount,
  useGetDiscountCodes,
} from "@/query/admin/discount";
import {
  ICreateDiscountReponse,
  DISCOUNT_TYPE_LABELS,
  ICreateDiscountRequest,
  IDiscountType,
} from "@/types/discount";
import {
  Tag,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Check,
  ToggleLeft,
  ToggleRight,
  Percent,
} from "lucide-react";

const EMPTY_FORM = {
  name: "",
  percentage: 10,
  is_active: true,
  is_student: false,
  discount_type: "general" as IDiscountType,
  min_students: 0,
  max_students: 0,
  max_years_after_graduation: 0,
};

export default function AdminDiscountsPage() {
  const { data: discountsRaw, isLoading: isLoadingRules } = useGetDiscounts();
  const { mutate: createDiscount, isPending: isCreating } = useCreateDiscount();
  const { mutate: updateDiscount, isPending: isUpdating } = useUpdateDiscount();
  const { mutate: deleteDiscount, isPending: isDeleting } = useDeleteDiscount();
  const { data: discountCodesRaw, isLoading: isLoadingCodes } =
    useGetDiscountCodes();

  const [activeTab, setActiveTab] = useState<"rules" | "codes">("rules");

  // The API returns { message, data } or just an array — handle both shapes
  const discounts: ICreateDiscountReponse[] = Array.isArray(discountsRaw)
    ? discountsRaw
    : ((discountsRaw as any)?.data ?? []);

  const discountCodes = discountCodesRaw?.data ?? [];
  console.log("discountCodesRaw", discountCodesRaw, discountCodes);
  const usedCodesCount = discountCodes.filter((code) => code.is_used).length;
  const unusedCodesCount = discountCodes.length - usedCodesCount;

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ICreateDiscountReponse | null>(
    null,
  );
  const [form, setForm] = useState<ICreateDiscountRequest>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<{ minMax?: string } | null>(
    null,
  );
  const [deleteConfirm, setDeleteConfirm] =
    useState<ICreateDiscountReponse | null>(null);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (discount: ICreateDiscountReponse) => {
    setEditTarget(discount);
    setForm({
      name: discount.name,
      percentage: discount.percentage,
      is_active: discount.is_active ?? true,
      is_student: discount.is_student ?? false,
      discount_type: discount.discount_type ?? "general",
      min_students:
        discount.min_students != null ? discount.min_students : undefined,
      max_students:
        discount.max_students != null ? discount.max_students : undefined,
      max_years_after_graduation:
        discount.max_years_after_graduation != null
          ? discount.max_years_after_graduation
          : undefined,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditTarget(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // final validation
    if (form.min_students != null && form.max_students != null) {
      if (form.min_students > form.max_students) {
        setFormErrors({ minMax: "Min students cannot exceed Max students." });
        return;
      }
    }
    setFormErrors(null);
    const payload = {
      name: form?.name,
      percentage: Number(form?.percentage),
      is_active: form?.is_active,
      is_student: form?.is_student,
      discount_type: form?.discount_type,
      min_students: form?.min_students ? Number(form?.min_students) : undefined,
      max_students: form?.max_students ? Number(form?.max_students) : undefined,
      max_years_after_graduation: form?.max_years_after_graduation
        ? Number(form?.max_years_after_graduation)
        : undefined,
    };

    if (editTarget) {
      updateDiscount(
        { data: payload, discountId: String(editTarget.id) },
        { onSuccess: closeModal },
      );
    } else {
      createDiscount(payload, { onSuccess: closeModal });
    }
  };

  const handleToggleActive = (discount: ICreateDiscountReponse) => {
    // Send the full payload expected by the API, toggling is_active
    updateDiscount({
      data: {
        name: discount.name,
        percentage: discount.percentage,
        is_active: !discount.is_active,
        is_student: discount.is_student,
        discount_type: discount.discount_type,
        min_students: discount.min_students,
        max_students: discount.max_students,
        max_years_after_graduation: discount.max_years_after_graduation,
      },
      discountId: String(discount.id),
    });
  };

  const handleDelete = () => {
    if (!deleteConfirm) return;
    deleteDiscount(String(deleteConfirm.id), {
      onSuccess: () => setDeleteConfirm(null),
    });
  };

  // ── Render ───────────────────────────────────────────────────────────────

  const activeCount = discounts.filter((d) => d.is_active).length;

  return (
    <div className="mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00284F]">Discounts</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage promotional discount codes for course enrolments.
          </p>
        </div>
        {activeTab === "rules" && (
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00284F] text-white text-sm font-bold rounded-xl hover:bg-[#001D39] transition-colors shadow-sm"
          >
            <Plus size={16} />
            New Discount
          </button>
        )}
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveTab("rules")}
          className={`px-4 py-2 rounded-2xl border text-sm font-bold transition-colors ${
            activeTab === "rules"
              ? "bg-[#00284F] text-white border-[#00284F]"
              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Discount Rules
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("codes")}
          className={`px-4 py-2 rounded-2xl border text-sm font-bold transition-colors ${
            activeTab === "codes"
              ? "bg-[#00284F] text-white border-[#00284F]"
              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Discount Codes
        </button>
      </div>

      {/* ── Stats Strip ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {activeTab === "rules" ? (
          <>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Tag size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Total Rules
                </p>
                <p className="text-2xl font-extrabold text-[#00284F]">
                  {discounts.length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                <Check size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Active Rules
                </p>
                <p className="text-2xl font-extrabold text-[#00284F]">
                  {activeCount}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="p-3 bg-orange-50 text-orange-500 rounded-lg">
                <Percent size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Inactive Rules
                </p>
                <p className="text-2xl font-extrabold text-[#00284F]">
                  {discounts.length - activeCount}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Tag size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Total Codes
                </p>
                <p className="text-2xl font-extrabold text-[#00284F]">
                  {discountCodesRaw?.total ?? discountCodes.length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                <Check size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Used Codes
                </p>
                <p className="text-2xl font-extrabold text-[#00284F]">
                  {usedCodesCount}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="p-3 bg-orange-50 text-orange-500 rounded-lg">
                <Percent size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Available Codes
                </p>
                <p className="text-2xl font-extrabold text-[#00284F]">
                  {unusedCodesCount}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Discounts Table ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-sm font-bold text-[#00284F] uppercase tracking-wider">
            {activeTab === "rules"
              ? "All Discount Rules"
              : "All Discount Codes"}
          </h2>
        </div>

        {activeTab === "rules" ? (
          isLoadingRules ? (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-teal w-6 h-6" />
            </div>
          ) : discounts.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
              <Tag size={36} strokeWidth={1.5} />
              <p className="text-sm font-medium">
                No discounts yet. Create your first one.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100 font-black">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Discount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Created</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {discounts.map((discount) => (
                    <tr
                      key={discount.id}
                      className="hover:bg-gray-50/50 transition-colors text-gray-600"
                    >
                      {/* Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                            <Tag size={14} />
                          </div>
                          <span className="font-bold text-[#00284F]">
                            {discount.name}
                          </span>
                        </div>
                      </td>

                      {/* Percentage */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 font-extrabold text-[#00284F] text-base">
                          {discount.percentage}
                          <span className="text-xs font-bold text-gray-400">
                            %
                          </span>
                        </span>
                      </td>

                      {/* Active Badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            discount.is_active
                              ? "bg-green-50 text-green-600 border border-green-100"
                              : "bg-gray-100 text-gray-400 border border-gray-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${discount.is_active ? "bg-green-500" : "bg-gray-400"}`}
                          />
                          {discount.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="px-6 py-4 text-xs text-gray-400 font-medium">
                        {new Date(discount.created_at).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {/* Toggle active */}
                          <button
                            title={
                              discount.is_active ? "Deactivate" : "Activate"
                            }
                            onClick={() => handleToggleActive(discount)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            {discount.is_active ? (
                              <ToggleRight
                                size={18}
                                className="text-green-500"
                              />
                            ) : (
                              <ToggleLeft size={18} />
                            )}
                          </button>

                          {/* Edit */}
                          <button
                            title="Edit"
                            onClick={() => openEdit(discount)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#00284F] hover:bg-gray-100 transition-colors"
                          >
                            <Pencil size={15} />
                          </button>

                          {/* Delete */}
                          <button
                            title="Delete"
                            onClick={() => setDeleteConfirm(discount)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : isLoadingCodes ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-teal w-6 h-6" />
          </div>
        ) : discountCodes.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
            <Tag size={36} strokeWidth={1.5} />
            <p className="text-sm font-medium">
              No discount codes yet. Generate your first one.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100 font-black">
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Rule</th>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Used</th>
                  <th className="px-6 py-4">Expires</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {discountCodes.map((code) => (
                  <tr
                    key={code.id}
                    className="hover:bg-gray-50/50 transition-colors text-gray-600"
                  >
                    <td className="px-6 py-4 font-bold text-[#00284F]">
                      {code.code}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[#00284F] font-semibold">
                        {code.discount_rule?.name ?? "Unknown rule"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {code.discount_rule?.percentage}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {code.is_student ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 text-sm font-black uppercase tracking-wider">
                      {code.is_used ? "Used" : "Available"}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-medium">
                      {new Date(code.expires_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-medium">
                      {new Date(code.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {code.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Create / Edit Modal ──────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#00284F]/40 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Tag size={18} />
                </div>
                <h3 className="text-lg font-bold text-[#00284F]">
                  {editTarget ? "Edit Discount" : "New Discount"}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Discount Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Early Bird 20%"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 border text-black border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-colors"
                />
              </div>

              {/* Percentage */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Percentage (%) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={1}
                      max={100}
                      step={0.1}
                      value={Number(form.percentage) || 0}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          percentage: Number(e.target.value),
                        }))
                      }
                      className="w-full"
                      aria-label="Percentage slider"
                    />
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      step={0.01}
                      placeholder="e.g. 20"
                      value={form.percentage}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          percentage: Number(e.target.value),
                        }))
                      }
                      className="w-24 px-3 py-2.5 text-black tpr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-colors"
                    />
                  </div>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm pointer-events-none">
                    %
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Use the slider for quick selection or type an exact value.
                </p>
              </div>

              {/* Discount Type */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Discount Type
                </label>
                <select
                  value={form.discount_type}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      discount_type: e.target.value as IDiscountType,
                    }))
                  }
                  className="w-full px-4 py-2.5 border text-black border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-colors"
                >
                  {Object.keys(DISCOUNT_TYPE_LABELS).map((key) => (
                    <option key={key} value={key}>
                      {
                        DISCOUNT_TYPE_LABELS[
                          key as keyof typeof DISCOUNT_TYPE_LABELS
                        ]
                      }
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Choose the rule that best fits this discount.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Is Student */}
                <div>
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700 font-bold">
                    <input
                      type="checkbox"
                      checked={form.is_student}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, is_student: e.target.checked }))
                      }
                      className="w-4 h-4"
                    />
                    <span>Is Student</span>
                  </label>
                </div>

                {/* Is Active */}
                <div>
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700 font-bold">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, is_active: e.target.checked }))
                      }
                      className="w-4 h-4"
                    />
                    <span>Active</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-black">
                {form.discount_type === "school_based" && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">
                        Min Students
                      </label>
                      <input
                        type="number"
                        min={0}
                        placeholder="optional"
                        value={form.min_students ?? ""}
                        onChange={(e) => {
                          const val =
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value);
                          setForm((f) => ({ ...f, min_students: val }));
                          // validate against existing max
                          const max = form.max_students;
                          if (val != null && max != null && val > max) {
                            setFormErrors({
                              minMax:
                                "Min students cannot exceed Max students.",
                            });
                          } else {
                            setFormErrors(null);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Leave blank for no minimum requirement.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">
                        Max Students
                      </label>
                      <input
                        type="number"
                        min={0}
                        placeholder="optional"
                        value={form.max_students ?? ""}
                        onChange={(e) => {
                          const val =
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value);
                          setForm((f) => ({ ...f, max_students: val }));
                          const min = form.min_students;
                          if (min != null && val != null && min > val) {
                            setFormErrors({
                              minMax:
                                "Min students cannot exceed Max students.",
                            });
                          } else {
                            setFormErrors(null);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Leave blank for no maximum restriction.
                      </p>
                    </div>
                  </>
                )}
                {form.discount_type === "individual_student" && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      Max Years After Graduation
                    </label>
                    <input
                      type="number"
                      min={0}
                      placeholder="optional"
                      value={form.max_years_after_graduation ?? ""}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          max_years_after_graduation:
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value),
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Optional: limit eligibility by years since graduation.
                    </p>
                  </div>
                )}
              </div>

              {formErrors?.minMax && (
                <p className="text-sm text-red-600 font-medium">
                  {formErrors.minMax}
                </p>
              )}

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 border border-gray-200 text-gray-600 font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00284F] text-white font-bold rounded-xl text-sm hover:bg-[#001D39] transition-colors disabled:opacity-60"
                >
                  {(isCreating || isUpdating) && (
                    <Loader2 size={15} className="animate-spin" />
                  )}
                  {editTarget ? "Save Changes" : "Create Discount"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ─────────────────────────────────────────── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#00284F]/40 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0 mt-0.5">
                <Trash2 size={18} />
              </div>
              <div>
                <h3 className="font-bold text-[#00284F] text-base">
                  Delete Discount
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-[#00284F]">
                    "{deleteConfirm.name}"
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-200 text-gray-600 font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold rounded-xl text-sm hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {isDeleting && <Loader2 size={14} className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
