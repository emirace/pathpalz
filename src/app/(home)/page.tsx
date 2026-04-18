import Hero from "@/components/home/Hero";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CoreValues from "@/components/home/CoreValues";
import CTASection from "@/components/home/CTASection";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Hero />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUs />
      <CTASection />
      <CoreValues />
      <FinalCTA />
    </div>
  );
}
