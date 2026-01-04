import { ArrowRight, Zap } from "lucide-react";

export default function StickyCta() {
  const goForm = () => {
    const el = document.getElementById("form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="backdrop-blur-xl bg-white/90 border-t border-gray-200 shadow-2xl">
        <div className="container-page py-4">
          <div className="flex items-center gap-3">
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-gray-900 truncate">
                Étude solaire gratuite
              </div>
              <div className="text-xs text-gray-500 font-light">
                2 min · Sans engagement
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={goForm}
              className="flex-shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Zap className="w-4 h-4" />
              Démarrer
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}