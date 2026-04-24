import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Announcement from "@/components/home/Announcement";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Announcement />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
