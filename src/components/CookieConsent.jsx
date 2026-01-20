import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

const CONSENT_KEY = "cookie_consent";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === null) {
      // Attendre un peu avant d'afficher pour ne pas bloquer le rendu initial
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else if (consent === "accepted") {
      loadAnalytics();
    }
  }, []);

  const loadAnalytics = () => {
    // Google Analytics 4
    if (!document.querySelector('script[src*="googletagmanager"]')) {
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-6BR1NTYQMN";
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", "G-6BR1NTYQMN");
    }

    // Meta Pixel
    if (!window.fbq) {
      !function(f,b,e,v,n,t,s) {
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', '1886621805392952');
      window.fbq('track', 'PageView');
    }
  };

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShowBanner(false);
    loadAnalytics();
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex-shrink-0">
            <Cookie className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Nous utilisons des cookies
            </h3>
            <p className="text-gray-600 text-sm font-light mb-4">
              Ce site utilise des cookies analytiques (Google Analytics, Meta Pixel) pour
              améliorer votre expérience et mesurer l'audience. Vous pouvez accepter ou
              refuser ces cookies non essentiels.{" "}
              <a
                href="/cookies"
                className="text-orange-600 hover:text-orange-700 underline"
              >
                En savoir plus
              </a>
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAccept}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all hover:scale-105"
              >
                Accepter tout
              </button>
              <button
                onClick={handleDecline}
                className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                Refuser
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleDecline}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Export pour réinitialiser le consentement (utile pour les tests)
export function resetCookieConsent() {
  localStorage.removeItem(CONSENT_KEY);
}

// Export pour vérifier le statut du consentement
export function getCookieConsent() {
  return localStorage.getItem(CONSENT_KEY);
}
