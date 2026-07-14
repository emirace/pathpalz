"use client";

import { TrainingProvider, useTraining } from "@/context/TrainingContext";
import ApplicationModal from "@/components/training/ApplicationModal";

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TrainingProvider>
      <SolutionsLayoutInner>{children}</SolutionsLayoutInner>
    </TrainingProvider>
  );
}

function SolutionsLayoutInner({ children }: { children: React.ReactNode }) {
  const { isModalOpen, modalTab, closeModal } = useTraining();

  return (
    <>
      <main className="flex-1">{children}</main>
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultTab={modalTab}
      />
    </>
  );
}
