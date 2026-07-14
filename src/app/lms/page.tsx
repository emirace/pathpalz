import LMSPageContent from "@/components/lms/LMSPageContent";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function LMSPage() {
  return (
    <Suspense fallback={
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-teal" size={32} />
      </div>
    }>
      <LMSPageContent />
    </Suspense>
  );
}
