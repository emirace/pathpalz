import { create } from "zustand";

interface ISetting {
  country: {
    value: string;
    code: string;
    currency: string;
  };
  updateCountry: (value: {
    value: string;
    code: string;
    currency: string;
  }) => void;
}

export const useSetting = create<ISetting>((set) => ({
  country: {
    value: "United Kingdom",
    currency: "GBP",
    code: "GB",
  },
  updateCountry: (value: { value: string; code: string; currency: string }) =>
    set({ country: value }),
}));
