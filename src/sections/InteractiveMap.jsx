import { useState } from "react";
import { MapPin, Phone, Check, Zap } from "lucide-react";

export default function InteractiveMap() {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const regions = [
    { name: "Île-de-France", zone: "Paris et région", coverage: "100%", projects: "847" },
    { name: "Provence-Alpes-Côte d'Azur", zone: "PACA", coverage: "100%", projects: "612" },
    { name: "Auvergne-Rhône-Alpes", zone: "Lyon et région", coverage: "100%", projects: "534" },
    { name: "Nouvelle-Aquitaine", zone: "Bordeaux et région", coverage: "100%", projects: "423" },
    { name: "Occitanie", zone: "Toulouse et région", coverage: "100%", projects: "398" },
    { name: "Hauts-de-France", zone: "Lille et région", coverage: "100%", projects: "287" },
    { name: "Bretagne", zone: "Rennes et région", coverage: "100%", projects: "256" },
    { name: "Grand Est", zone: "Strasbourg et région", coverage: "100%", projects: "234" },
    { name: "Normandie", zone: "Rouen et région", coverage: "100%", projects: "189" },
    { name: "Pays de la Loire", zone: "Nantes et région", coverage: "100%", projects: "176" },
    { name: "Centre-Val de Loire", zone: "Orléans et région", coverage: "100%", projects: "91" }
  ];

  const scrollToForm = () => {
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container-page">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <MapPin className="inline w-4 h-4 mr-1" />
            Couverture Nationale
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Interventions
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
              dans toute la France
            </span>
          </h2>

          <p className="text-lg text-gray-600 font-light">
            Plus de <strong>2 800 installations</strong> réalisées depuis 2019 
            dans toutes les régions métropolitaines.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Map Illustration */}
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 shadow-xl">
            <div className="relative">
              {/* France Map SVG Simple */}
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                
                {/* Animated dots representing coverage */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-orange-500 rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 90 + 5}%`,
                        top: `${Math.random() * 90 + 5}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        opacity: 0.6
                      }}
                    />
                  ))}
                </div>

                {/* Center France icon */}
                <div className="relative z-10 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                    <MapPin className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    France Métropolitaine
                  </h3>
                  <p className="text-gray-600 font-light">
                    100% du territoire couvert
                  </p>
                </div>
              </div>

              {/* Stats overlay */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { label: "Régions", value: "13" },
                  { label: "Projets", value: "2 847" },
                  { label: "Couverture", value: "100%" }
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                    <div className="text-2xl font-bold text-orange-600 mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-600 font-light">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regions List */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Check className="w-6 h-6 text-orange-600 flex-shrink-0" />
                <h3 className="text-xl font-bold text-gray-900">
                  Service disponible partout en France
                </h3>
              </div>
              <p className="text-sm text-gray-700 font-light">
                Nos partenaires installateurs certifiés RGE interviennent 
                dans toutes les régions pour votre projet solaire.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm max-h-[500px] overflow-y-auto">
              {regions.map((region, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredRegion(region.name)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  className={`p-4 border-b border-gray-100 last:border-b-0 transition-all cursor-pointer ${
                    hoveredRegion === region.name ? 'bg-orange-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{region.name}</div>
                        <div className="text-sm text-gray-600 font-light">{region.zone}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-orange-600">{region.projects} projets</div>
                      <div className="text-xs text-green-600 font-light flex items-center gap-1 justify-end">
                        <Check className="w-3 h-3" />
                        {region.coverage}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-center">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">
                Votre région est couverte !
              </h3>
              <p className="text-gray-300 font-light mb-6">
                Demandez votre étude personnalisée gratuite
              </p>
              <button
                onClick={scrollToForm}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Démarrer mon étude
              </button>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-light">Réponse sous 48h ouvrées</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { icon: "🏠", label: "Maisons équipées", value: "2 847" },
            { icon: "⚡", label: "MW installés", value: "17.2" },
            { icon: "🌱", label: "Tonnes CO₂ évitées", value: "12 400" },
            { icon: "⭐", label: "Satisfaction", value: "4.8/5" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-light">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}