"use client";

import { useFetchIP } from "@/query/location";
import { useSetting } from "@/states/setting";
import { useEffect, useState } from "react";

const languages = [
  { code: "GB", country: "United Kingdom", currency: "GBP" },
  { code: "NG", country: "Nigeria", currency: "NGN" },
];

export default function LocationProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: userLocation } = useFetchIP();
  const updateCountry = useSetting((state) => state.updateCountry);

  async function loadLocation() {
    const countryCode = userLocation?.country?.toUpperCase();
    const matchedLang = languages.find((lang) => lang.code === countryCode);

    if (matchedLang) {
      updateCountry({
        value: matchedLang.country,
        code: matchedLang.code,
        currency: matchedLang.currency,
      });
    }
  }

  useEffect(() => {
    loadLocation();
  }, [userLocation]);

  return children;
}
