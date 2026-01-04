import { ArrowRight, Zap, Star, CheckCircle } from "lucide-react";

export default function Hero() {
  const goForm = () => {
    const el = document.getElementById("form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background Image avec overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=90"
          alt="Panneaux solaires"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
      </div>

      {/* Grid overlay subtil */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <div className="container-page relative z-10 py-20">
        <div className="max-w-4xl">
          {/* Badge professionnel */}
          <div className="inline-flex items-center gap-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-3 mb-8">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/90 font-medium text-sm">2 847 installations réalisées</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1 text-white/70 text-sm">4.9/5</span>
            </div>
          </div>

          {/* Titre principal */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
            L'énergie solaire
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500">
              accessible à tous
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl font-light">
            Économisez jusqu'à 70% sur vos factures d'électricité. 
            Étude personnalisée gratuite en 2 minutes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={goForm}
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-5 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="relative flex items-center justify-center gap-3">
                Démarrer mon étude gratuite
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <a
              href="#avantages"
              className="group backdrop-blur-xl bg-white/5 border border-white/10 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Découvrir les avantages
            </a>
          </div>

          {/* Stats cards modernes */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: "-70%", label: "d'économies moyennes", icon: CheckCircle },
              { value: "2 min", label: "pour l'étude complète", icon: Zap },
              { value: "48h", label: "délai de réponse", icon: Star }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
                >
                  <Icon className="h-6 w-6 text-yellow-400 mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-light">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator élégant */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
          </div>
          <span className="text-white/40 text-xs font-light">Défiler</span>
        </div>
      </div>
    </section>
  );
}