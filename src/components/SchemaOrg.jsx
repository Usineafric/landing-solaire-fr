import { Helmet } from "react-helmet";

// Schema LocalBusiness pour l'entreprise
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Le Panneau Solaire",
    "description": "Installation de panneaux solaires photovoltaïques en France. Installateurs certifiés RGE et QualiPV.",
    "url": "https://lepanneausolaire.com",
    "logo": "https://lepanneausolaire.com/logo.png",
    "image": "https://lepanneausolaire.com/og-image.jpg",
    "telephone": "+33-contact",
    "email": "contact@lepanneausolaire.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "FR"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "priceRange": "€€€",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "2847"
    },
    "sameAs": []
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Schema Service pour les installations solaires
export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Installation de panneaux solaires photovoltaïques",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Le Panneau Solaire"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "description": "Installation complète de panneaux solaires : étude de faisabilité, démarches administratives, pose par professionnels RGE, mise en service et suivi.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": "8000",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Installations solaires",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Installation 3 kWc",
            "description": "Installation de panneaux solaires 3 kWc pour petit foyer"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Installation 6 kWc",
            "description": "Installation de panneaux solaires 6 kWc pour foyer moyen"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Installation 9 kWc",
            "description": "Installation de panneaux solaires 9 kWc pour grand foyer"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Schema FAQ
export function FAQSchema({ faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Schema BreadcrumbList pour la navigation
export function BreadcrumbSchema({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://lepanneausolaire.com${item.path}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Schema WebSite avec SearchAction
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Le Panneau Solaire",
    "url": "https://lepanneausolaire.com",
    "description": "Installation de panneaux solaires photovoltaïques en France par des professionnels certifiés RGE et QualiPV.",
    "publisher": {
      "@type": "Organization",
      "name": "Le Panneau Solaire",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lepanneausolaire.com/logo.png"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
