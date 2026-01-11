import Hero from "../sections/Hero";
import Avantages from "../sections/Avantages";
import PreFilter from "../sections/PreFilter";
import GarantiesMini from "../sections/GarantiesMini";
import HowItWorks from "../sections/HowItWorks";
import WhatYouGet from "../sections/WhatYouGet";
import FAQ from "../sections/FAQ";
import Testimonials from "../sections/Testimonials";
import LeadForm from "../sections/LeadForm";
import Reassurance from "../sections/Reassurance";
import FooterLegal from "../sections/FooterLegal";
import StickyCta from "../sections/StickyCta";
import Header from "../components/Header";

// 🗑️ SECTIONS RETIRÉES (à utiliser dans pages satellites futures)
// import InteractiveMap from "../sections/InteractiveMap";        // → /realisations
// import ProjectGallery from "../sections/ProjectGallery";        // → /realisations
// import SavingsCalculator from "../sections/SavingsCalculator";  // → /simulateur

export default function HomePage() {
  return (
    <>
      {/* ✅ SECTIONS ESSENTIELLES (10 sections optimisées) */}
      <Header />
      <Hero />                    {/* 1. Accroche + CTA principal */}
      <Avantages />               {/* 2. Bénéfices du solaire */}
      <PreFilter />               {/* 3. Qualification rapide */}
      <GarantiesMini />           {/* 4. Réassurance certifications */}
      <HowItWorks />              {/* 5. Processus en 3 étapes */}
      <WhatYouGet />              {/* 6. Valeur de l'étude */}
      <FAQ />                     {/* 7. Réponses aux objections */}
      <Testimonials />            {/* 8. Social proof */}
      <LeadForm />                {/* 9. CONVERSION (formulaire) */}
      <Reassurance />             {/* 10. Confiance finale */}
      
      <FooterLegal />             {/* Footer légal */}
      <StickyCta />               {/* CTA flottant */}
    </>
  );
}