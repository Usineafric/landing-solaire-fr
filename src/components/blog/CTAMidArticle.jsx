import { Link } from "react-router-dom";
import { ArrowRight, Zap, Euro, Clock } from "lucide-react";

export default function CTAMidArticle() {
  const handleClick = () => {
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA',
        event_label: 'Mid Article CTA'
      });
    }
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout');
    }
  };

  return (
    <div className="my-10 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-2xl p-8 shadow-xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Combien pouvez-vous economiser avec des panneaux solaires ?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-3 text-white/90">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Euro className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Jusqu'a 70% d'economie</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Etude personnalisee</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Reponse en 24h</span>
          </div>
        </div>

        <Link
          to="/#form"
          onClick={handleClick}
          className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          Calculer mes economies gratuitement
          <ArrowRight className="w-5 h-5" />
        </Link>

        <p className="text-white/80 text-sm mt-4">
          Sans engagement - Devis gratuit en 2 minutes
        </p>
      </div>
    </div>
  );
}
