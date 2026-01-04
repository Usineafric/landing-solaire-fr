import { ArrowRight, CheckCircle2, Home, MapPin, ShieldCheck } from "lucide-react";

export default function Hero() {
  const goForm = () => {
    const el = document.getElementById("form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero-gradient pt-16 md:pt-20 pb-14">
      <div className="container-page grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            Étude solaire — France (maisons individuelles)
          </div>

          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight">
            Installation de panneaux solaires{" "}
            <span className="block gradient-text mt-2">pour maison individuelle</span>
          </h1>

          <p className="mt-5 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
            Recevez une étude personnalisée pour votre projet photovoltaïque, selon votre logement et votre situation.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button onClick={goForm} className="btn-primary group">
              Demander une étude
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a href="#how" className="btn-secondary">
              Comprendre le déroulé
            </a>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-xl">
            {[
              { icon: Home, title: "Maison individuelle", text: "Demande réservée aux propriétaires." },
              { icon: MapPin, title: "France métropolitaine", text: "Qualification par code postal." },
              { icon: ShieldCheck, title: "Sans engagement", text: "Aucune obligation de signature." },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="card card-hover p-5">
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="mt-3 font-semibold">{b.title}</div>
                  <div className="mt-1 text-sm text-gray-600">{b.text}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-sm text-gray-500 flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-gray-400 mt-0.5" />
            <span>Pas de promesses chiffrées, pas de “simulation d’aides”, pas de slogans trompeurs.</span>
          </div>
        </div>

        {/* Visuel (neutre, premium) */}
        <div className="relative">
          <div className="absolute -top-10 -right-10 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-60" />
          <div className="absolute top-10 -left-10 h-72 w-72 rounded-full bg-violet-100 blur-3xl opacity-50" />

          <div className="relative overflow-hidden rounded-3xl border border-gray-100 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2200&q=80"
              alt="Panneaux solaires sur toiture"
              className="h-[440px] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/50 bg-white/90 backdrop-blur p-4">
              <div className="font-semibold">Étude personnalisée</div>
              <div className="text-sm text-gray-600">
                Basée sur vos informations, sans promesse automatique.
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Important : cette page est une demande d’étude, pas une promesse de résultats financiers.
          </p>
        </div>
      </div>
    </section>
  );
}
