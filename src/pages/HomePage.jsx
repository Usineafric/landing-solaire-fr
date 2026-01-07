import Hero from "../sections/Hero";
import Avantages from "../sections/Avantages";
import PreFilter from "../sections/PreFilter";
import HowItWorks from "../sections/HowItWorks";
import WhatYouGet from "../sections/WhatYouGet";
import FAQ from "../sections/FAQ";
import LeadForm from "../sections/LeadForm";
import Reassurance from "../sections/Reassurance";
import FooterLegal from "../sections/FooterLegal";
import StickyCta from "../sections/StickyCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Avantages />
      <PreFilter />
      <HowItWorks />
      <WhatYouGet />
      <FAQ />
      <LeadForm />
      <Reassurance />
      <FooterLegal />
      <StickyCta />
    </>
  );
}