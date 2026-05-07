import React from "react";
import TrackDetailClient from "@/components/training/TrackDetailClient";

import { getTracks } from "@/services/training/tracks";

export async function generateStaticParams() {
  try {
    const tracks = await getTracks();
    return tracks.map((track) => ({
      slug: track.slug,
    }));
  } catch (error) {
    console.error("Failed to fetch tracks for generateStaticParams:", error);
    return [];
  }
}

export default function TrackDetailPage() {
  return <TrackDetailClient />;
}
