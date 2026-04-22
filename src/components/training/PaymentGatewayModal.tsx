"use client";

import React from "react";
import { X, CreditCard, Banknote, ShieldCheck } from "lucide-react";

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (gateway: "stripe" | "paystack") => void;
  isSubmitting?: boolean;
}

const PaymentGatewayModal = ({
  isOpen,
  onClose,
  onSelect,
  isSubmitting = false,
}: PaymentGatewayModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#00284F]/40 backdrop-blur-sm transition-all duration-300"
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-8 pb-4">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>

          <h3 className="text-2xl font-bold font-manrope text-[#00284F] mb-1">
            Secure Checkout
          </h3>
          <p className="text-[#424750] text-sm font-medium">
            Select your preferred payment gateway
          </p>
        </div>

        {/* Options */}
        <div className="p-8 pt-0 space-y-4">
          {/* Stripe Option */}
          <button
            disabled={isSubmitting}
            onClick={() => onSelect("stripe")}
            className="w-full group relative flex items-center p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-teal hover:bg-teal/2 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mr-5 group-hover:bg-violet-100 transition-colors">
              <CreditCard className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h4 className="font-bold text-[#00284F] text-lg">Stripe</h4>
              <p className="text-xs text-gray-500 font-medium">
                International Cards & Apple Pay
              </p>
            </div>
            <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <ShieldCheck className="w-5 h-5 text-teal" />
            </div>
          </button>

          {/* Paystack Option */}
          <button
            disabled={isSubmitting}
            onClick={() => onSelect("paystack")}
            className="w-full group relative flex items-center p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-teal hover:bg-teal/2 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mr-5 group-hover:bg-sky-100 transition-colors">
              <Banknote className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <h4 className="font-bold text-[#00284F] text-lg">Paystack</h4>
              <p className="text-xs text-gray-500 font-medium">
                Cards, Bank, & Mobile Money
              </p>
            </div>
            <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <ShieldCheck className="w-5 h-5 text-teal" />
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gray-400" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
            SSL Secure & Encrypted Payments
          </span>
        </div>

        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex flex-col items-center justify-center gap-4 z-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal"></div>
            <p className="text-sm font-bold text-[#00284F] animate-pulse">
              Initializing Secure Checkout...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentGatewayModal;
