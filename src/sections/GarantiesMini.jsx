import { Shield, Award, CheckCircle, Zap, ArrowRight } from "lucide-react";

export default function GarantiesMini() {
  const guarantees = [
    {
      icon: Shield,
      logo: "/logos/qualibat-rge.webp",
      title: "Certification RGE",
      subtitle: "Reconnu Garant Environnement",
      description: "Label officiel garantissant la qualité de nos installations et l'accès aux aides de l'État.",
      badge: "Officiel",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Zap,
      logo: "/logos/qualipv.jpg",
      title: "QualiPV",
      subtitle: "Qualification photovoltaïque",
      description: "Certification spécialisée délivrée par Qualit'EnR pour l'installation de systèmes solaires.",
      badge: "Expert",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Shield,
      logo: null,
      title: "Assurance Décennale",
      subtitle: "10 ans de protection",
      description: "Couverture obligatoire protégeant votre installation contre tous vices et malfaçons pendant 10 ans.",
      badge: "Protection",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Award,
      logo: null,
      title: "Garantie Fabricant",
      subtitle: "25-30 ans sur panneaux",
      description: "Les panneaux photovoltaïques bénéficient d'une garantie constructeur de 25 à 30 ans minimum.",
      badge: "Longévité",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Shield className="inline w-4 h-4 mr-1" />
            Garanties & Certifications
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Vos garanties
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
              professionnelles
            </span>
          </h2>

          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Nous travaillons exclusivement avec des installateurs certifiés RGE et QualiPV,
            pour vous garantir une installation conforme et de qualité.
          </p>
        </div>

        {/* Grid 4 garanties */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border-2 border-gray-100 p-6 hover:border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient subtil au hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${guarantee.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity -z-10`} />
                
                {/* Badge en haut à droite */}
                <div className="absolute top-4 right-4">
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold">
                    {guarantee.badge}
                  </span>
                </div>

                {/* Logo ou Icon */}
                <div className="mb-6">
                  {guarantee.logo ? (
                    <div className="bg-white rounded-xl p-3 border border-gray-200 inline-block">
                      <img
                        src={guarantee.logo}
                        alt={guarantee.title}
                        className="h-10 w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${guarantee.color} shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {guarantee.title}
                </h3>
                
                <div className="text-sm font-semibold text-orange-600 mb-3">
                  {guarantee.subtitle}
                </div>
                
                <p className="text-gray-600 leading-relaxed text-sm font-light">
                  {guarantee.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <div className="inline-block bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 rounded-2xl p-8 max-w-3xl">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h4 className="font-bold text-gray-900 mb-2">
                  Protection complète garantie
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed font-light">
                  Tous nos installateurs partenaires sont rigoureusement sélectionnés et disposent 
                  des certifications <strong className="font-semibold">RGE et QualiPV</strong>, 
                  ainsi que des assurances <strong className="font-semibold">décennale et RC professionnelle</strong>. 
                  Votre projet est entre de bonnes mains.
                </p>
              </div>
            </div>

            {/* Bouton CTA */}
            <a
              href="#form"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
            >
              <Shield className="w-4 h-4" />
              Recevoir mon étude sécurisée
              <ArrowRight className="w-4 h-4" />
            </a>

            <p className="text-xs text-gray-500 mt-4 font-light">
              💡 Vous souhaitez en savoir plus sur nos garanties détaillées ? 
              Elles seront expliquées lors de votre étude personnalisée.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}