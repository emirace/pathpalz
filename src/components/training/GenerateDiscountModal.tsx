"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Tag, Copy, Check } from "lucide-react";
import DiscountGenerateForm from "./DiscountGenerateForm";
import { useGetDiscountCodeRule } from "@/query/training/discount";

interface GenerateDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export default function GenerateDiscountModal({
  isOpen,
  onClose,
  defaultEmail = "",
}: GenerateDiscountModalProps) {
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleClose = () => {
    setGeneratedCode("");
    setCopied(false);
    onClose();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00284f]/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-[#00284F]">
              {generatedCode ? "Your Discount Code" : "Generate Discount Code"}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {generatedCode
                ? "Use this code when enrolling in a training track"
                : "Select a discount type and fill in the required details"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {generatedCode ? (
          <div className="p-6 space-y-5">
            <div className="flex flex-col items-center text-center space-y-4 py-4">
              <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-teal" />
              </div>
              <p className="text-sm text-gray-500">
                Your discount code is ready
              </p>
              <div className="relative w-full">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <div className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-teal/30 bg-teal/5 text-[#00284F] font-mono font-bold text-lg tracking-widest text-center">
                  {generatedCode}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 h-12 border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-teal" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Code
                  </>
                )}
              </button>
              <button
                onClick={handleClose}
                className="flex-1 h-12 bg-[#00284F] text-white rounded-xl font-bold text-sm hover:bg-[#00284F]/90 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 overflow-auto max-h-[70vh]">
            <DiscountGenerateForm
              defaultEmail={defaultEmail}
              onSuccess={setGeneratedCode}
            />
          </div>
        )}
      </div>
    </div>
  );
}
