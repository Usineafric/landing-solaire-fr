import Hero from "../sections/Hero";
import Avantages from "../sections/Avantages";
import InteractiveMap from "../sections/InteractiveMap";
import ProjectGallery from "../sections/ProjectGallery";
import PreFilter from "../sections/PreFilter";
import GarantiesMini from "../sections/GarantiesMini";       // 🆕 NOUVEAU (ÉTAPE 2)
import HowItWorks from "../sections/HowItWorks";
import WhatYouGet from "../sections/WhatYouGet";
import SavingsCalculator from "../sections/SavingsCalculator";
import FAQ from "../sections/FAQ";
import Testimonials from "../sections/Testimonials";
import LeadForm from "../sections/LeadForm";
import Reassurance from "../sections/Reassurance";
import FooterLegal from "../sections/FooterLegal";
import StickyCta from "../sections/StickyCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Avantages />
      <InteractiveMap />
      <PreFilter />
      
      <GarantiesMini />              {/* 🆕 NOUVEAU (ÉTAPE 2) - Section Garanties */}
      
      <HowItWorks />
      <WhatYouGet />
      <ProjectGallery />
      <SavingsCalculator />
      <FAQ />
      <Testimonials />
      <LeadForm />
      <Reassurance />
      <FooterLegal />
      <StickyCta />
    </>
  );
}