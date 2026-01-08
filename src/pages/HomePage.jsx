import Hero from "../sections/Hero";
import Avantages from "../sections/Avantages";
import InteractiveMap from "../sections/InteractiveMap";        // ← NOUVEAU
import ProjectGallery from "../sections/ProjectGallery";        // ← NOUVEAU
import PreFilter from "../sections/PreFilter";
import HowItWorks from "../sections/HowItWorks";
import WhatYouGet from "../sections/WhatYouGet";
import SavingsCalculator from "../sections/SavingsCalculator";  // ← NOUVEAU
import FAQ from "../sections/FAQ";
import Testimonials from "../sections/Testimonials";            // ← NOUVEAU
import LeadForm from "../sections/LeadForm";
import Reassurance from "../sections/Reassurance";
import FooterLegal from "../sections/FooterLegal";
import StickyCta from "../sections/StickyCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Avantages />
      <InteractiveMap />          {/* ← NOUVEAU - Après Avantages */}
      <PreFilter />
      <HowItWorks />
      <WhatYouGet />
      <ProjectGallery />          {/* ← NOUVEAU - Après WhatYouGet */}
      <SavingsCalculator />       {/* ← NOUVEAU - Avant FAQ */}
      <FAQ />
      <Testimonials />            {/* ← NOUVEAU - Après FAQ */}
      <LeadForm />
      <Reassurance />
      <FooterLegal />
      <StickyCta />
    </>
  );
}