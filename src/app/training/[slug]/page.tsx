import React from "react";
import TrackDetailClient from "@/components/training/TrackDetailClient";

export async function generateStaticParams() {
  return [
    { slug: "software-development" },
    { slug: "data-ai" },
    { slug: "devops" },
  ];
}

export default function TrackDetailPage() {
  return <TrackDetailClient />;
}
