"use client";

import { TrainingProvider, useTraining } from "@/context/TrainingContext";
import ApplicationModal from "@/components/training/ApplicationModal";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TrainingProvider>
      <AboutLayoutInner>{children}</AboutLayoutInner>
    </TrainingProvider>
  );
}

function AboutLayoutInner({ children }: { children: React.ReactNode }) {
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
