"use client";

import React from "react";
import {
  X,
  CreditCard,
  Banknote,
  ShieldCheck,
  Landmark,
  ArrowLeft,
  Mail,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";
import { useSetting } from "@/states/setting";
import {
  OFFLINE_ACCOUNTS,
  SUPPORT_EMAIL,
  SUPPORT_WHATSAPP,
} from "@/constants/offlinePayment";

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (gateway: "stripe" | "paystack") => void;
  isSubmitting?: boolean;
}

type Step = "method" | "online" | "offline";

const WHATSAPP_MESSAGE =
  "Hi, I've made a bank transfer for my PathPalz enrolment and would like to verify it.";

const PaymentGatewayModal = ({
  isOpen,
  onClose,
  onSelect,
  isSubmitting = false,
}: PaymentGatewayModalProps) => {
  const country = useSetting((state) => state.country);
  const [step, setStep] = React.useState<Step>("method");
  const [showVerify, setShowVerify] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // Reset the flow whenever the modal is (re)opened so it never shows stale state.
  React.useEffect(() => {
    if (isOpen) {
      setStep("method");
      setShowVerify(false);
      setCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const account = OFFLINE_ACCOUNTS[country.code] ?? OFFLINE_ACCOUNTS.GB;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable (e.g. insecure context) — fail silently.
    }
  };

  const whatsappUrl = `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

  const subtitle =
    step === "method"
      ? "Choose how you'd like to pay"
      : step === "online"
        ? "Select your preferred payment gateway"
        : "Pay via bank transfer";

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

          {step !== "method" && (
            <button
              onClick={() => {
                setStep("method");
                setShowVerify(false);
              }}
              className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-teal transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          <h3 className="text-2xl font-bold font-manrope text-[#00284F] mb-1">
            Secure Checkout
          </h3>
          <p className="text-[#424750] text-sm font-medium">{subtitle}</p>
        </div>

        {/* Options */}
        <div className="p-8 pt-0 space-y-4">
          {/* STEP: Choose payment method */}
          {step === "method" && (
            <>
              <button
                onClick={() => setStep("online")}
                className="w-full group relative flex items-center p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-teal hover:bg-teal/2 transition-all duration-200 text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mr-5 group-hover:bg-violet-100 transition-colors">
                  <CreditCard className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[#00284F] text-lg">
                    Pay Online
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    Card, Bank & Mobile Money
                  </p>
                </div>
                <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ShieldCheck className="w-5 h-5 text-teal" />
                </div>
              </button>

              <button
                onClick={() => setStep("offline")}
                className="w-full group relative flex items-center p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-teal hover:bg-teal/2 transition-all duration-200 text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mr-5 group-hover:bg-amber-100 transition-colors">
                  <Landmark className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[#00284F] text-lg">
                    Bank Transfer
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    Pay offline & verify manually
                  </p>
                </div>
                <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ShieldCheck className="w-5 h-5 text-teal" />
                </div>
              </button>
            </>
          )}

          {/* STEP: Online gateway */}
          {step === "online" &&
            (country.code === "NG" ? (
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
            ) : (
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
            ))}

          {/* STEP: Offline bank transfer */}
          {step === "offline" && (
            <>
              <div className="rounded-2xl border-2 border-gray-100 divide-y divide-gray-100 overflow-hidden">
                {account.bankName && (
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      Bank
                    </span>
                    <span className="text-sm font-bold text-[#00284F] text-right">
                      {account.bankName}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Account Name
                  </span>
                  <span className="text-sm font-bold text-[#00284F] text-right">
                    {account.accountName}
                  </span>
                </div>
                <div className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Account No.
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#00284F]">
                      {account.accountNumber}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Copy account number"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-teal" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </span>
                </div>
                {account.sortCode && (
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      Sort Code
                    </span>
                    <span className="text-sm font-bold text-[#00284F] text-right">
                      {account.sortCode}
                    </span>
                  </div>
                )}
                {account.note && (
                  <div className="px-5 py-3.5">
                    <p className="text-xs text-gray-500 font-medium">
                      {account.note}
                    </p>
                  </div>
                )}
              </div>

              {!showVerify ? (
                <button
                  onClick={() => setShowVerify(true)}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-[#00284F] text-white rounded-2xl font-bold hover:bg-[#00284F]/90 transition-colors"
                >
                  I have made transfer
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400 text-center">
                    Verify your transfer
                  </p>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
                      "Bank Transfer Verification",
                    )}`}
                    className="w-full group flex items-center p-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-teal hover:bg-teal/2 transition-all duration-200 text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-blue-100 transition-colors">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#00284F] text-sm">
                        Verify via Email
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">
                        {SUPPORT_EMAIL}
                      </p>
                    </div>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full group flex items-center p-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-teal hover:bg-teal/2 transition-all duration-200 text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mr-4 group-hover:bg-green-100 transition-colors">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#00284F] text-sm">
                        Verify via Phone
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">
                        Chat with us on WhatsApp
                      </p>
                    </div>
                  </a>
                </div>
              )}
            </>
          )}
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
