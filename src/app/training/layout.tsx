"use client";

import TrainingNavbar from "@/components/layout/TrainingNavbar";
import TrainingFooter from "@/components/layout/TrainingFooter";
import { TrainingProvider, useTraining } from "@/context/TrainingContext";
import ApplicationModal from "@/components/training/ApplicationModal";

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TrainingProvider>
      <TrainingLayoutInner>{children}</TrainingLayoutInner>
    </TrainingProvider>
  );
}

function TrainingLayoutInner({ children }: { children: React.ReactNode }) {
  const { isModalOpen, modalTab, closeModal } = useTraining();

  return (
    <>
      <TrainingNavbar />
      <main className="flex-1">{children}</main>
      <TrainingFooter />
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultTab={modalTab}
      />
    </>
  );
}
