import { Navbar } from "@/components/layouts/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { PreFooterCTA } from "@/components/sections/PreFooterCTA";
import { MegaFooter } from "@/components/layouts/MegaFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <StatsBar />
        <FeaturesGrid />
        <HowItWorks />
        <ComparisonTable />
        <PreFooterCTA />
      </main>
      <MegaFooter />
    </div>
  );
}
