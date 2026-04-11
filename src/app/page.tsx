import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CoreValues from "@/components/CoreValues";
import CTASection from "@/components/CTASection";
import FinalCTA from "@/components/FinalCTA";

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
