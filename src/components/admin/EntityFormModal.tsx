import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export interface IFormField {
  name: string;
  label: string;
  type: "text" | "number" | "textarea" | "select";
  options?: { label: string; value: string | number }[];
  required?: boolean;
  placeholder?: string;
  autoSlug?: boolean;
}

interface EntityFormModalProps {
  title: string;
  fields: IFormField[];
  initialData?: any;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  onFormDataChange?: (data: any) => void;
  isLoading?: boolean;
}

export default function EntityFormModal({
  title,
  fields,
  initialData,
  isOpen,
  onClose,
  onSubmit,
  onFormDataChange,
  isLoading = false,
}: EntityFormModalProps) {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange(formData);
    }
  }, [formData, onFormDataChange]);

  useEffect(() => {
    if (isOpen) {
      // Only initialize if we haven't already or if initialData changed
      if (initialData) {
        setFormData(initialData);
      } else if (Object.keys(formData).length === 0) {
        const defaultData: any = {};
        fields.forEach((f) => {
          if (f.type === "select" && f.options && f.options.length > 0) {
            defaultData[f.name] = f.options[0].value;
          } else {
            defaultData[f.name] = "";
          }
        });
        setFormData(defaultData);
      }
    } else {
      // Clear data when modal closes
      setFormData({});
    }
  }, [isOpen, initialData]); // Remove fields from dependencies to prevent reset on option updates


  if (!isOpen) return null;

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const fieldConfig = fields.find((f) => f.name === name);
    const isNumberField = fieldConfig?.type === "number" || name.endsWith("_id");

    setFormData((prev: any) => {
      const newData = {
        ...prev,
        [name]: isNumberField ? (value === "" ? "" : Number(value)) : value,
      };


      // Auto-update slug if title changes and slug field is marked as autoSlug
      if (name === "title") {
        const slugField = fields.find((f) => f.name === "slug");
        if (slugField?.autoSlug) {
          newData.slug = slugify(value);
        }
      }

      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#00284F]/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#00284F]">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-[#00284F] hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="entity-form" onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-bold text-[#00284F] mb-1.5">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 bg-gray-50 border text-black border-gray-200 rounded-xl focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all outline-none min-h-[100px] resize-y"
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all outline-none"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-black rounded-xl focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all outline-none"
                  />
                )}
              </div>
            ))}
          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-xl transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="entity-form"
            disabled={isLoading}
            className="px-6 py-2.5 text-sm font-bold text-white bg-teal hover:bg-teal/90 rounded-xl transition-all shadow-md shadow-teal/20 disabled:opacity-70 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
