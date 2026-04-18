"use client";

import React, { createContext, useContext, useState } from "react";

type ModalTab = "apply" | "waitlist";

interface TrainingContextType {
  isModalOpen: boolean;
  modalTab: ModalTab;
  openModal: (tab?: ModalTab) => void;
  closeModal: () => void;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const TrainingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<ModalTab>("apply");

  const openModal = (tab: ModalTab = "apply") => {
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <TrainingContext.Provider value={{ isModalOpen, modalTab, openModal, closeModal }}>
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (context === undefined) {
    throw new Error("useTraining must be used within a TrainingProvider");
  }
  return context;
};
