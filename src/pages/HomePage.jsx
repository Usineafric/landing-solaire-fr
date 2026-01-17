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
import SEO from "../components/SEO";
import { LocalBusinessSchema, ServiceSchema, WebSiteSchema } from "../components/SchemaOrg";
import { seoConfig } from "../utils/seoConfig";
import Header from "../components/Header";
import ExitIntentPopup from "../components/ExitIntentPopup";

export default function HomePage() {
  return (
    <>
      <SEO {...seoConfig.home} />
      <LocalBusinessSchema />
      <ServiceSchema />
      <WebSiteSchema />
      <Header />
      <Hero />
      <Avantages />
      <PreFilter />
      <GarantiesMini />
      <HowItWorks />
      <WhatYouGet />
      <FAQ />
      <Testimonials />
      <LeadForm />
      <Reassurance />
      
      <FooterLegal />
      <StickyCta />
      <ExitIntentPopup />
    </>
  );
}