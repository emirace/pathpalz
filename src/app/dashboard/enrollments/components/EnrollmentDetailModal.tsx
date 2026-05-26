"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  User,
  BookOpen,
  CreditCard,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Layers,
  Hash,
  ExternalLink,
  Video,
} from "lucide-react";
import { IEnrollment } from "@/types/training/enrollments";
import { useGetModuleSessions } from "@/query/training/student";

interface EnrollmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrollment: IEnrollment | null;
}

const EnrollmentDetailModal = ({
  isOpen,
  onClose,
  enrollment,
}: EnrollmentDetailModalProps) => {
  const [expandedHeaders, setExpandedHeaders] = useState<
    Record<number, boolean>
  >({});

  if (!isOpen || !enrollment) return null;

  const isPaid =
    enrollment.payment.status === "paid" ||
    enrollment.payment.status === "success";

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const toggleHeader = (headerId: number) => {
    setExpandedHeaders((prev) => ({ ...prev, [headerId]: !prev[headerId] }));
  };

  const studentName =
    [enrollment.student.first_name, enrollment.student.last_name]
      .filter(Boolean)
      .join(" ") || enrollment.student.email;

  const courseStructure = enrollment.purchased_course.course_structure ?? [];
  const instructors = enrollment.purchased_course.instructors ?? [];

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#00284F]/40 backdrop-blur-sm transition-all duration-300"
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-8 pb-4 flex justify-between items-start shrink-0">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold font-manrope text-[#00284F]">
              Enrollment Details
            </h3>
            <p className="text-[#424750] text-sm font-medium flex items-center gap-2">
              Order Ref:{" "}
              <span className="text-[#00284F] font-bold font-mono">
                {enrollment.payment.reference}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-0 space-y-6">
          {/* Status Banner */}
          <div
            className={`p-4 rounded-2xl flex items-center gap-4 ${
              isPaid
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {isPaid ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            <div>
              <p className="font-bold text-sm capitalize">
                Payment {enrollment.payment.status}
              </p>
              <p className="text-xs opacity-80">
                {isPaid
                  ? "Enrollment is confirmed and the seat is secured."
                  : "Payment is currently being processed. Please wait a few moments."}
              </p>
            </div>
          </div>

          {/* Student Info */}
          <Section icon={<User size={14} />} title="Student Information">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Full Name" value={studentName} />
              <Field label="Email" value={enrollment.student.email} mono />
              <Field
                label="Enrollment ID"
                value={`#${enrollment.enrollment_id}`}
                mono
              />
              <Field
                label="Order Status"
                value={enrollment.order_status}
                capitalize
              />
            </div>
          </Section>

          {/* Training Info */}
          <Section icon={<BookOpen size={14} />} title="Training Information">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Track Title"
                  value={enrollment.purchased_course.title}
                  className="col-span-2"
                />
                <Field
                  label="Type"
                  value={enrollment.purchased_course.type}
                  capitalize
                />
                <Field
                  label="Price"
                  value={`${enrollment.payment.currency?.toUpperCase() ?? "£"}${enrollment.purchased_course.price}`}
                />
              </div>

              {/* Instructors */}
              {instructors.length > 0 && (
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Instructor{instructors.length > 1 ? "s" : ""}
                  </label>
                  <div className="space-y-2">
                    {instructors.map((inst) => {
                      const name =
                        [inst.user.first_name, inst.user.last_name]
                          .filter(Boolean)
                          .join(" ") || inst.user.email;
                      return (
                        <div
                          key={inst.id}
                          className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#00284F]/10 flex items-center justify-center shrink-0">
                            <GraduationCap
                              size={14}
                              className="text-[#00284F]"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#00284F]">
                              {name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {inst.user.email}
                            </p>
                            {inst.description && (
                              <p className="text-xs text-gray-400 mt-0.5">
                                {inst.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* Course Structure */}
          {courseStructure.length > 0 && (
            <Section icon={<Layers size={14} />} title="Course Structure">
              <div className="space-y-2">
                {courseStructure.map((header) => {
                  const isExpanded = !!expandedHeaders[header.header_id];
                  return (
                    <div
                      key={header.header_id}
                      className="border border-gray-100 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleHeader(header.header_id)}
                        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#00284F]/10 flex items-center justify-center shrink-0">
                            <Hash size={11} className="text-[#00284F]" />
                          </div>
                          <span className="text-sm font-bold text-[#00284F]">
                            {header.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {header.modules.length} module
                            {header.modules.length !== 1 ? "s" : ""}
                          </span>
                          {isExpanded ? (
                            <ChevronDown size={16} className="text-gray-400" />
                          ) : (
                            <ChevronRight size={16} className="text-gray-400" />
                          )}
                        </div>
                      </button>

                      {isExpanded && header.modules.length > 0 && (
                        <div className="border-t border-gray-100 bg-[#F8F9FC] divide-y divide-gray-100">
                          {header.modules.map((mod, idx) => (
                            <ModuleItem key={mod.id} mod={mod} idx={idx} />
                          ))}
                        </div>
                      )}

                      {isExpanded && header.modules.length === 0 && (
                        <div className="border-t border-gray-100 bg-[#F8F9FC] px-4 py-3">
                          <p className="text-xs text-gray-400">
                            No modules in this section.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Section>
          )}

          {/* Payment Info */}
          <Section icon={<CreditCard size={14} />} title="Payment Information">
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Amount"
                value={`${enrollment.payment.currency?.toUpperCase() ?? "£"}${enrollment.payment.amount}`}
              />
              <Field
                label="Gateway"
                value={enrollment.payment.gateway.name}
                capitalize
              />
              <Field
                label="Method"
                value={enrollment.payment.method}
                capitalize
              />
              <Field
                label="Status"
                value={enrollment.payment.status}
                capitalize
              />
              <div className="col-span-2">
                <Field
                  label="Transaction Reference"
                  value={enrollment.payment.reference}
                  mono
                />
              </div>
            </div>
          </Section>

          {/* Enrollment Date */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="font-bold uppercase tracking-widest">
              Enrolled:
            </span>
            <span>
              {new Date(enrollment.purchased_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-[#F3F3F8] border-t border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Verified Enrollment
            </span>
          </div>
          <button
            onClick={onClose}
            className="h-10 px-6 bg-[#00284F] text-white rounded-xl font-bold text-sm hover:bg-[#00284F]/90 transition-all shadow-lg shadow-[#00284F]/10"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── helpers ── */

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1.5">
        {icon}
        {title}
      </h4>
      <div className="bg-[#F3F3F8] rounded-2xl p-5 border border-gray-100">
        {children}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  mono,
  capitalize,
  className,
}: {
  label: string;
  value: string;
  mono?: boolean;
  capitalize?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
        {label}
      </label>
      <p
        className={`text-sm font-bold text-[#00284F] break-all ${mono ? "font-mono" : ""} ${capitalize ? "capitalize" : ""}`}
      >
        {value || "—"}
      </p>
    </div>
  );
}

function ModuleItem({ mod, idx }: { mod: any; idx: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: sessionsResponse, isLoading } = useGetModuleSessions(mod.id);
  const sessions = sessionsResponse?.sessions || [];

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left"
      >
        <span className="text-[10px] font-bold text-gray-300 w-5 shrink-0 text-right">
          {idx + 1}
        </span>
        <BookOpen size={13} className="text-gray-400 shrink-0" />
        <p className="text-sm text-[#424750] flex-1 font-medium">{mod.title}</p>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      {isExpanded && (
        <div className="bg-white border-y border-gray-100 p-4 pl-13 space-y-3">
          {isLoading ? (
            <div className="text-xs text-gray-400 animate-pulse">
              Loading sessions...
            </div>
          ) : Array.isArray(sessions) && sessions.length > 0 ? (
            <div className="space-y-3">
              {sessions.map((session: any, sIdx: number) => (
                <div
                  key={sIdx}
                  className="flex flex-col gap-1.5 p-3 rounded-xl border border-gray-50 bg-[#F8F9FC]"
                >
                  <p className="text-sm font-bold text-[#00284F]">
                    Session {sIdx + 1}
                  </p>
                  {session.training_date && (
                    <div className="flex flex-col gap-1 mt-1">
                      <p className="text-xs text-[#424750]">
                        <span className="font-bold text-gray-500 uppercase tracking-widest text-[9px] mr-1">
                          Date:
                        </span>
                        {new Date(session.training_date).toLocaleString()}
                      </p>
                    </div>
                  )}
                  {session.status && (
                    <p className="text-xs text-[#424750]">
                      <span className="font-bold text-gray-500 uppercase tracking-widest text-[9px] mr-1">
                        Status:
                      </span>
                      <span className="capitalize">
                        {session.status.replace(/_/g, " ")}
                      </span>
                    </p>
                  )}
                  <div className="flex gap-2 mt-2">
                    {session.meeting_link && (
                      <a
                        href={session.meeting_link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-teal px-3 py-1.5 rounded-lg hover:bg-teal/90 transition-colors w-fit"
                      >
                        <Video size={12} /> Join Meeting
                      </a>
                    )}
                    {session.recorded_link && (
                      <a
                        href={session.recorded_link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00284F] bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors w-fit"
                      >
                        <ExternalLink size={12} /> View Recording
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-gray-400 italic">
              No sessions scheduled for this module yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EnrollmentDetailModal;
