import { Euro, Leaf, TrendingUp, Battery, ArrowRight, Zap } from "lucide-react";

export default function Avantages() {
  const benefits = [
    {
      icon: Euro,
      title: "Réduisez vos factures",
      subtitle: "Économies substantielles",
      description:
        "Diminuez vos dépenses énergétiques de 60 à 70% grâce à votre production photovoltaïque. Amortissement sur 8-12 ans selon votre installation.",
      image:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=85",
      stats: [
        { value: "60-70%", label: "d'économies" },
        { value: "8-12 ans", label: "amortissement" },
      ],
    },
    {
      icon: TrendingUp,
      title: "Valorisation immobilière",
      subtitle: "Investissement pérenne",
      description:
        "Augmentez la valeur de votre bien de 3 à 10%. Un atout majeur lors d'une revente avec un diagnostic énergétique amélioré.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85",
      stats: [
        { value: "+3-10%", label: "valeur du bien" },
        { value: "DPE", label: "notation améliorée" },
      ],
    },
    {
      icon: Battery,
      title: "Autonomie énergétique",
      subtitle: "Indépendance et sécurité",
      description:
        "Produisez votre propre électricité et protégez-vous des hausses tarifaires futures. Batteries optionnelles pour stockage 24h/24.",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=85",
      stats: [
        { value: "24/7", label: "production possible" },
        { value: "30 ans", label: "garantie panneaux" },
      ],
    },
    {
      icon: Leaf,
      title: "Impact environnemental",
      subtitle: "Énergie propre et renouvelable",
      description:
        "Production 100% verte. Réduisez votre empreinte carbone de 3 tonnes de CO₂ par an en moyenne.",
      image:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=85",
      stats: [
        { value: "100%", label: "énergie verte" },
        { value: "-3T", label: "CO₂/an évités" },
      ],
    },
  ];

  return (
    <section id="avantages" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Zap className="inline w-4 h-4 mr-1" />
            Pourquoi le solaire ?
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Les avantages du
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
              photovoltaïque
            </span>
          </h2>

          <p className="text-lg text-gray-600 font-light">
            Une solution rentable, écologique et pérenne pour votre habitation.
          </p>
        </div>

        {/* Benefits alternés */}
        <div className="max-w-7xl mx-auto space-y-24">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className={!isEven ? "lg:order-2" : ""}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                      <img
                        src={benefit.image}
                        alt={benefit.title}
                        className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Stats overlay */}
                      <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                        {benefit.stats.map((stat, i) => (
                          <div
                            key={i}
                            className="flex-1 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 text-center"
                          >
                            <div className="text-2xl font-bold text-white mb-1">
                              {stat.value}
                            </div>
                            <div className="text-xs text-white/80 font-light">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={!isEven ? "lg:order-1" : ""}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="text-sm font-semibold text-orange-600 mb-3 uppercase tracking-wider">
                    {benefit.subtitle}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 tracking-tight">
                    {benefit.title}
                  </h3>

                  <p className="text-lg text-gray-600 leading-relaxed mb-8 font-light">
                    {benefit.description}
                  </p>

                  <a
                    href="#form"
                    className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all group"
                  >
                    En savoir plus
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Final */}
        <div className="mt-24 relative overflow-hidden rounded-3xl shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=90"
            alt="Installation solaire"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />

          <div className="relative z-10 py-20 px-8 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Combien vous pouvez économiser avec votre maison ?
            </h3>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
              Obtenez votre étude personnalisée en 2 minutes. 100% gratuit, sans engagement.
            </p>

            <a
              href="#form"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-5 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-yellow-500/50 transition-all hover:scale-105"
            >
              <Zap className="w-6 h-6" />
              Démarrer mon étude gratuite
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
