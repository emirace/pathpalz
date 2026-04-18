"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "apply" | "waitlist";
}

const ApplicationModal = ({
  isOpen,
  onClose,
  defaultTab = "apply",
}: ApplicationModalProps) => {
  const [activeTab, setActiveTab] = useState<"apply" | "waitlist">(defaultTab);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    track: "Software Development",
    experience: "Never",
    commitment: "Yes, I can commit to this",
    working: "Full-time",
    hardware: "Yes to both",
    source: "LinkedIn/WhatsApp",
    availability: "Weekend Mornings",
    motivation: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setActiveTab(defaultTab);
    if (defaultTab === "apply") {
      setFormData((prev) => ({ ...prev, track: "Software Development" }));
    }
  }, [defaultTab, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.country) newErrors.country = "Required";
    if (!formData.motivation.trim()) newErrors.motivation = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Application submitted successfully!");
      onClose();
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#00284F]/40 backdrop-blur-sm transition-all duration-300"
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col relative overflow-hidden animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab("apply")}
            className={`flex-1 py-5 text-center text-sm font-bold transition-all relative ${
              activeTab === "apply"
                ? "text-[#00284F]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Apply — Software Development
            {activeTab === "apply" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("waitlist")}
            className={`flex-1 py-5 text-center text-sm font-bold transition-all relative ${
              activeTab === "waitlist"
                ? "text-[#00284F]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Join the waiting list
            {activeTab === "waitlist" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal" />
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#424750] uppercase">
                  First Name{" "}
                  {errors.firstName && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 bg-[#EAEFF1] rounded-lg focus:outline-none focus:ring-2 transition-all text-[#00284F] ${
                    errors.firstName
                      ? "ring-2 ring-red-500/20"
                      : "focus:ring-teal/20"
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#424750] uppercase">
                  Last Name{" "}
                  {errors.lastName && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 bg-[#EAEFF1] rounded-lg focus:outline-none focus:ring-2 transition-all text-[#00284F] ${
                    errors.lastName
                      ? "ring-2 ring-red-500/20"
                      : "focus:ring-teal/20"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#424750] uppercase">
                  Email Address{" "}
                  {errors.email && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 bg-[#EAEFF1] rounded-lg focus:outline-none focus:ring-2 transition-all text-[#00284F] ${
                    errors.email
                      ? "ring-2 ring-red-500/20"
                      : "focus:ring-teal/20"
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#424750] uppercase">
                  Country{" "}
                  {errors.country && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full h-12 px-4 bg-[#EAEFF1] rounded-lg appearance-none focus:outline-none focus:ring-2 transition-all text-[#00284F] cursor-pointer pr-10 ${
                      errors.country
                        ? "ring-2 ring-red-500/20"
                        : "focus:ring-teal/20"
                    }`}
                  >
                    <option value="">Select country</option>
                    <option value="uk">United Kingdom</option>
                    <option value="nigeria">Nigeria</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#424750] uppercase">
                  Which track are you applying for?
                </label>
                <div className="relative">
                  <select
                    name="track"
                    value={formData.track}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-[#EAEFF1] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all text-[#00284F] cursor-pointer pr-10"
                  >
                    <option value="Software Development">
                      Software Development
                    </option>
                    <option value="Data & AI">Data & AI</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#424750] uppercase">
                  Have you ever written code before?
                </label>
                <div className="relative">
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-[#EAEFF1] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all text-[#00284F] cursor-pointer pr-10"
                  >
                    <option value="Never">Never</option>
                    <option value="A little (tutorials)">
                      A little (tutorials)
                    </option>
                    <option value="Some projects">Some projects</option>
                    <option value="Yes, regularly">Yes, regularly</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#424750] uppercase">
                  Can you commit a minimum of 12 hours per week?
                </label>
                <div className="relative">
                  <select
                    name="commitment"
                    value={formData.commitment}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-[#EAEFF1] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all text-[#00284F] cursor-pointer pr-10"
                  >
                    <option value="Yes, I can commit to this">
                      Yes, I can commit to this
                    </option>
                    <option value="I am not sure — I would like to discuss">
                      I am not sure — I would like to discuss
                    </option>
                    <option value="No, not right now">No, not right now</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#424750] uppercase">
                  Are you currently working?
                </label>
                <div className="relative">
                  <select
                    name="working"
                    value={formData.working}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-[#EAEFF1] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all text-[#00284F] cursor-pointer pr-10"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Not currently">Not currently</option>
                    <option value="Student">Student</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#424750] uppercase">
                  Do you have a laptop or desktop computer and reliable
                  internet?
                </label>
                <div className="relative">
                  <select
                    name="hardware"
                    value={formData.hardware}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-[#EAEFF1] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all text-[#00284F] cursor-pointer pr-10"
                  >
                    <option value="Yes to both">Yes to both</option>
                    <option value="I have a computer but internet is sometimes unreliable">
                      I have a computer but internet is sometimes unreliable
                    </option>
                    <option value="I would like to discuss this">
                      I would like to discuss this
                    </option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#424750] uppercase">
                  How did you hear about PathPalz?
                </label>
                <div className="relative">
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-[#EAEFF1] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all text-[#00284F] cursor-pointer pr-10"
                  >
                    <option value="LinkedIn/WhatsApp">LinkedIn/WhatsApp</option>
                    <option value="Discord">Discord</option>
                    <option value="A friend">A friend</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#424750] uppercase">
                  What times are you available for live sessions?
                </label>
                <div className="relative">
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-[#EAEFF1] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all text-[#00284F] cursor-pointer pr-10"
                  >
                    <option value="Weekend Mornings">Weekend Mornings</option>
                    <option value="Weekend Evenings">Weekend Evenings</option>
                    <option value="Flexible">Flexible</option>
                    <option value="Limited">Very Limited</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#424750] uppercase">
                  Why do you want to join PathPalz? (Max 150 words){" "}
                  {errors.motivation && <span className="text-red-500">*</span>}
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full p-4 bg-[#EAEFF1] rounded-lg focus:outline-none focus:ring-2 transition-all text-[#00284F] resize-none ${
                    errors.motivation
                      ? "ring-2 ring-red-500/20"
                      : "focus:ring-teal/20"
                  }`}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-[#424750] uppercase">
                  Anything else you would like us to know? (Optional)
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={2}
                  className="w-full p-4 bg-[#EAEFF1] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all text-[#00284F] resize-none"
                ></textarea>
              </div>
            </div>

            <div className="pt-4 pb-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-teal text-white font-bold text-base uppercase tracking-widest rounded-xl shadow-lg shadow-teal/20 hover:bg-teal/90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
