import TrackDetailPage from "./client-page";

export function generateStaticParams() {
  return [
    { slug: "software-development" },
    { slug: "data-ai" },
    { slug: "devops" },
  ];
}

export default function Page() {
  return <TrackDetailPage />;
}
