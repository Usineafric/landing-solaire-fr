import { useState, useEffect } from "react";
import { X, Zap, Gift, ArrowRight } from "lucide-react";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Ne pas afficher si deja vu dans cette session
    if (sessionStorage.getItem("exitPopupShown")) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e) => {
      // Detecter quand la souris quitte par le haut (intention de fermer)
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("exitPopupShown", "true");
      }
    };

    // Aussi afficher apres 45 secondes sur mobile (pas de mouse leave)
    const mobileTimer = setTimeout(() => {
      if (!hasShown && window.innerWidth < 768) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("exitPopupShown", "true");
      }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCta = () => {
    setIsVisible(false);
    const form = document.getElementById("form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Fermer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header gradient */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Attendez !
          </h2>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          <p className="text-xl font-semibold text-gray-900 text-center mb-4">
            Ne partez pas sans votre estimation gratuite
          </p>

          <p className="text-gray-600 text-center mb-6 font-light">
            Recevez en <strong className="font-semibold">2 minutes</strong> une estimation personnalisee
            de vos economies avec le solaire.
          </p>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-5 mb-6">
            <div className="space-y-3">
              {[
                "Etude 100% gratuite et sans engagement",
                "Estimation precise de vos economies",
                "Reponse sous 48h par un expert RGE"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleCta}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            <Zap className="w-5 h-5" />
            Obtenir mon estimation gratuite
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Skip link */}
          <button
            onClick={handleClose}
            className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors font-light"
          >
            Non merci, je prefere payer plus cher
          </button>
        </div>
      </div>
    </div>
  );
}
