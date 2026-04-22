"use client";

import React, { createContext, useContext, useState } from "react";

type ModalTab = "apply" | "waitlist";

interface TrainingContextType {
  isModalOpen: boolean;
  modalTab: ModalTab;
  selectedTrackId: string | null;
  openModal: (tab?: ModalTab, trackId?: string | number) => void;
  closeModal: () => void;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const TrainingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<ModalTab>("apply");
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  const openModal = (tab: ModalTab = "apply", trackId?: string | number) => {
    setModalTab(tab);
    if (trackId) {
      setSelectedTrackId(trackId.toString());
    } else {
      setSelectedTrackId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrackId(null);
  };

  return (
    <TrainingContext.Provider value={{ isModalOpen, modalTab, selectedTrackId, openModal, closeModal }}>
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
