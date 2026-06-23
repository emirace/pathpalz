"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Upload, CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";
import { useGetDiscounts } from "@/query/admin/discount";
import { useGenerateDiscountCode } from "@/query/training/student/student";
import {
  DISCOUNT_TYPE_LABELS,
  ICreateDiscountReponse,
  IDiscountType,
  IGenerateDiscountCodePayload,
} from "@/types/discount";
import { getApiErrorMessage, notify } from "@/utils/notify";

interface DiscountGenerateFormProps {
  defaultEmail?: string;
  onSuccess: (code: string) => void;
  submitLabel?: string;
}

const EMPTY_FORM = {
  discount_rule_id: "",
  institution_name: "",
  institution_address: "",
  email: "",
  student_id_card: null as File | null,
  beneficiary_emails: [] as string[],
};

function extractGeneratedCode(data: unknown): string {
  const result = data as Record<string, unknown>;
  const nested = result?.data as Record<string, unknown> | undefined;
  const code = result?.code || nested?.code || result?.discount_code || "";
  return String(code).toUpperCase();
}

export default function DiscountGenerateForm({
  defaultEmail = "",
  onSuccess,
  submitLabel = "Generate My Code",
}: DiscountGenerateFormProps) {
  const [form, setForm] = useState({ ...EMPTY_FORM, email: defaultEmail });
  const idCardRef = useRef<HTMLInputElement>(null);

  const { data: discountsRaw } = useGetDiscounts();
  const { mutate: generateCode, isPending: isGenerating } =
    useGenerateDiscountCode();

  const discountRules: ICreateDiscountReponse[] = (
    Array.isArray(discountsRaw)
      ? discountsRaw
      : ((discountsRaw as { data?: ICreateDiscountReponse[] })?.data ?? [])
  ).filter((d) => d.is_active);

  const selectedRule = useMemo(
    () =>
      discountRules.find((d) => String(d.id) === form.discount_rule_id) ?? null,
    [discountRules, form.discount_rule_id],
  );

  const discountType: IDiscountType | null =
    selectedRule?.discount_type ?? null;
  const isSchoolBased = discountType === "school_based";
  const isIndividualStudent = discountType === "individual_student";
  const isGeneral = discountType === "general";
  const requiresVerification = isSchoolBased || isIndividualStudent;

  useEffect(() => {
    if (defaultEmail) {
      setForm((f) => ({ ...f, email: defaultEmail }));
    }
  }, [defaultEmail]);

  const handleRuleChange = (ruleId: string) => {
    const rule = discountRules.find((d) => String(d.id) === ruleId);
    const minSlots =
      rule?.discount_type === "school_based" ? (rule.min_students ?? 1) : 0;

    setForm((f) => ({
      ...f,
      discount_rule_id: ruleId,
      student_id_card: null,
      beneficiary_emails:
        minSlots > 0 ? Array.from({ length: minSlots }, () => "") : [],
    }));
    if (idCardRef.current) idCardRef.current.value = "";
  };

  const addBeneficiaryEmail = () => {
    if (
      selectedRule?.max_students &&
      form.beneficiary_emails.length >= selectedRule.max_students
    ) {
      return;
    }
    setForm((f) => ({
      ...f,
      beneficiary_emails: [...f.beneficiary_emails, ""],
    }));
  };

  const removeBeneficiaryEmail = (index: number) => {
    const minRequired = selectedRule?.min_students ?? 1;
    if (form.beneficiary_emails.length <= minRequired) return;
    setForm((f) => ({
      ...f,
      beneficiary_emails: f.beneficiary_emails.filter((_, i) => i !== index),
    }));
  };

  const updateBeneficiaryEmail = (index: number, value: string) => {
    setForm((f) => ({
      ...f,
      beneficiary_emails: f.beneficiary_emails.map((email, i) =>
        i === index ? value : email,
      ),
    }));
  };

  const isSubmitDisabled = () => {
    if (isGenerating) return true;
    if (!form.discount_rule_id) return true;
    if (isIndividualStudent && !form.student_id_card) return true;
    if (isSchoolBased) {
      const validEmails = form.beneficiary_emails.filter((e) => e.trim());
      const min = selectedRule?.min_students ?? 1;
      return validEmails.length < min;
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: IGenerateDiscountCodePayload = {
      discount_rule_id: form.discount_rule_id,
      institution_name: form.institution_name,
      institution_address: form.institution_address,
      email: form.email,
    };

    if (isIndividualStudent && form.student_id_card) {
      payload.student_id_card = form.student_id_card;
    }

    if (isSchoolBased) {
      payload.beneficiary_emails = form.beneficiary_emails
        .map((e) => e.trim())
        .filter(Boolean);
    }

    generateCode(payload, {
      onSuccess: (data) => onSuccess(extractGeneratedCode(data)),
      onError: (err) => {
        notify.error(
          getApiErrorMessage(err, "Failed to generate code. Please try again."),
        );
      },
    });
  };

  const institutionPlaceholder = isGeneral
    ? "PathPalz"
    : isSchoolBased
      ? "ABC Secondary School"
      : "University of Lagos";

  const addressPlaceholder = isGeneral ? "Remote" : "Lagos, Nigeria";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-[#00284F]">
          Discount Type <span className="text-red-500">*</span>
        </label>
        <select
          required
          value={form.discount_rule_id}
          onChange={(e) => handleRuleChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#00284F] focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all bg-white"
        >
          <option value="">Select a discount rule</option>
          {discountRules.map((d) => (
            <option key={d.id} value={String(d.id)}>
              {d.name} — {d.percentage}% off (
              {DISCOUNT_TYPE_LABELS[d.discount_type] ?? d.discount_type})
            </option>
          ))}
        </select>
        {selectedRule && (
          <p className="text-xs text-gray-500">
            {isSchoolBased &&
              `For teachers registering ${selectedRule.min_students ?? 1}–${selectedRule.max_students ?? "∞"} students.`}
            {isIndividualStudent &&
              `For individual students (max ${selectedRule.max_years_after_graduation ?? 3} years after graduation).`}
            {isGeneral && "Open promo code — no student verification required."}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-[#00284F]">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          required
          placeholder={isSchoolBased ? "teacher@school.edu" : "your@email.com"}
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#00284F] focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-[#00284F]">
          {isGeneral ? "Organisation Name" : "Institution Name"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder={institutionPlaceholder}
          value={form.institution_name}
          onChange={(e) =>
            setForm((f) => ({ ...f, institution_name: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#00284F] focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-[#00284F]">
          {isGeneral ? "Organisation Address" : "Institution Address"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder={addressPlaceholder}
          value={form.institution_address}
          onChange={(e) =>
            setForm((f) => ({ ...f, institution_address: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#00284F] focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
        />
      </div>

      {isSchoolBased && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-[#00284F]">
              Student Emails <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={addBeneficiaryEmail}
              disabled={
                selectedRule?.max_students != null &&
                form.beneficiary_emails.length >= selectedRule.max_students
              }
              className="text-teal text-xs font-bold hover:underline inline-flex items-center gap-1 disabled:opacity-40 disabled:no-underline"
            >
              <Plus className="w-3 h-3" />
              Add email
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Enter at least {selectedRule?.min_students ?? 1} student email
            {(selectedRule?.min_students ?? 1) > 1 ? "s" : ""} to receive the
            discount.
          </p>
          <div className="space-y-2">
            {form.beneficiary_emails.map((email, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder={`student${index + 1}@email.com`}
                  value={email}
                  onChange={(e) =>
                    updateBeneficiaryEmail(index, e.target.value)
                  }
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-[#00284F] focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
                />
                {form.beneficiary_emails.length >
                  (selectedRule?.min_students ?? 1) && (
                  <button
                    type="button"
                    onClick={() => removeBeneficiaryEmail(index)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isIndividualStudent && (
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#00284F]">
            Student ID Card <span className="text-red-500">*</span>
          </label>
          <input
            ref={idCardRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setForm((f) => ({ ...f, student_id_card: file }));
            }}
          />
          <button
            type="button"
            onClick={() => idCardRef.current?.click()}
            className={`w-full border-2 border-dashed rounded-xl p-4 flex items-center gap-3 transition-colors ${
              form.student_id_card
                ? "border-teal bg-teal/5 text-teal"
                : "border-gray-200 hover:border-teal/40 text-gray-400 hover:text-teal"
            }`}
          >
            {form.student_id_card ? (
              <>
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="text-sm font-semibold truncate">
                  {form.student_id_card.name}
                </span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">
                  Click to upload ID card (image or PDF)
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {requiresVerification && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <svg
            className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-bold">Important:</span> The information
            provided will be verified. If any details are found to be false or
            misleading, the company reserves the right to revoke the discount
            and block access to the learning platform{" "}
            <span className="font-bold">without refund</span>.
          </p>
        </div>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitDisabled()}
          className="w-full h-12 bg-[#00284F] text-white rounded-xl font-bold hover:bg-[#00284F]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isGenerating && <Loader2 className="w-4 h-4 animate-spin" />}
          {isGenerating ? "Generating..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
