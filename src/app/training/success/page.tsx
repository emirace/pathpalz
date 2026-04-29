"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyPayment } from "@/query/training/payments";
import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

function PaymentVerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const verifyMutation = useVerifyPayment();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;

    const reference =
      searchParams.get("reference") ||
      searchParams.get("trxref") ||
      searchParams.get("session_id");

    if (!reference) {
      setStatus("error");
      return;
    }

    hasVerified.current = true;
    verifyMutation.mutate(
      { reference },
      {
        onSuccess: () => {
          setStatus("success");
        },
        onError: (err) => {
          console.error("Payment verification failed", err);
          setStatus("error");
        },
      }
    );
  }, [searchParams, verifyMutation]);

  return (
    <div className="min-h-screen bg-[#F3F3F8] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden text-center p-8">
        {status === "verifying" && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mb-6">
              <Loader2 className="w-10 h-10 text-teal animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-[#00284F] mb-2 font-manrope">
              Verifying Payment
            </h2>
            <p className="text-gray-500 mb-8">
              Please wait while we confirm your payment with the gateway. This
              shouldn't take long.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#00284F] mb-2 font-manrope">
              Payment Successful!
            </h2>
            <p className="text-gray-500 mb-8">
              Your enrollment has been confirmed. Welcome to the track! You can
              now access your learning dashboard.
            </p>
            <button
              onClick={() => router.push("/dashboard/enrollments")}
              className="w-full h-14 bg-[#00284F] text-white rounded-xl font-bold hover:bg-[#00284F]/90 transition-all flex items-center justify-center group"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#00284F] mb-2 font-manrope">
              Verification Failed
            </h2>
            <p className="text-gray-500 mb-8">
              We couldn't verify your payment. The transaction might have failed
              or the reference is invalid.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={() => window.location.reload()}
                className="w-full h-14 bg-[#00284F] text-white rounded-xl font-bold hover:bg-[#00284F]/90 transition-all flex items-center justify-center"
              >
                Try Again
              </button>
              <Link
                href="/training"
                className="w-full h-14 bg-gray-100 text-[#00284F] rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center"
              >
                Return to Training
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F3F3F8] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden text-center p-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mb-6">
                <Loader2 className="w-10 h-10 text-teal animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-[#00284F] mb-2 font-manrope">
                Loading...
              </h2>
            </div>
          </div>
        </div>
      }
    >
      <PaymentVerifyContent />
    </Suspense>
  );
}
