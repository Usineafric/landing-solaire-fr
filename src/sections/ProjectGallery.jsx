import { useState } from "react";
import { MapPin, Zap, TrendingDown, Clock, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      location: "Lyon (69)",
      type: "Maison individuelle",
      power: "6 kWc",
      panels: "15 panneaux",
      savings: "1 250 €/an",
      savingsPercent: "-68%",
      date: "Septembre 2024",
      testimonial: "Installation rapide et soignée. L'équipe était très professionnelle et a respecté tous les délais. Je recommande vivement !",
      client: "M. Martin",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80" // Solar panels on house
    },
    {
      id: 2,
      location: "Bordeaux (33)",
      type: "Maison plain-pied",
      power: "9 kWc",
      panels: "22 panneaux",
      savings: "1 850 €/an",
      savingsPercent: "-75%",
      date: "Août 2024",
      testimonial: "Excellent accompagnement du début à la fin. Les économies sont déjà visibles sur mes factures. Très satisfait du résultat.",
      client: "Mme Dubois",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80"
    },
    {
      id: 3,
      location: "Marseille (13)",
      type: "Villa avec piscine",
      power: "12 kWc",
      panels: "30 panneaux",
      savings: "2 400 €/an",
      savingsPercent: "-82%",
      date: "Juillet 2024",
      testimonial: "Installation parfaite, esthétique impeccable. La production dépasse même les prévisions grâce au bon ensoleillement.",
      client: "M. Rousseau",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1560254412-46a93de8fddd?w=800&q=80"
    },
    {
      id: 4,
      location: "Toulouse (31)",
      type: "Maison récente",
      power: "7.5 kWc",
      panels: "19 panneaux",
      savings: "1 550 €/an",
      savingsPercent: "-71%",
      date: "Juin 2024",
      testimonial: "Projet clé en main sans aucun stress. Très bon rapport qualité-prix et équipe à l'écoute. Je recommande sans hésiter.",
      client: "M. Bernard",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=800&q=80"
    },
    {
      id: 5,
      location: "Nantes (44)",
      type: "Maison 2 étages",
      power: "8 kWc",
      panels: "20 panneaux",
      savings: "1 650 €/an",
      savingsPercent: "-73%",
      date: "Mai 2024",
      testimonial: "Travail soigné et propre. Installation terminée en une journée. Les panneaux se fondent parfaitement avec la toiture.",
      client: "Mme Petit",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80"
    },
    {
      id: 6,
      location: "Strasbourg (67)",
      type: "Maison contemporaine",
      power: "10 kWc",
      panels: "25 panneaux",
      savings: "2 100 €/an",
      savingsPercent: "-78%",
      date: "Avril 2024",
      testimonial: "Excellente expérience du début à la fin. Conseils pertinents, installation rapide, suivi après vente au top.",
      client: "M. Lambert",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container-page">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Zap className="inline w-4 h-4 mr-1" />
            Réalisations
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Nos derniers
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
              projets réalisés
            </span>
          </h2>

          <p className="text-lg text-gray-600 font-light">
            Découvrez les installations récentes de nos clients satisfaits 
            dans toute la France.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={project.imageUrl}
                  alt={`Installation ${project.location}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {project.power}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-orange-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="font-semibold">{project.location}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {project.type}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-light">Installation</span>
                    <span className="font-semibold text-gray-900">{project.panels}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-light">Économies/an</span>
                    <span className="font-semibold text-green-600">{project.savings}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-light">Réduction facture</span>
                    <span className="font-semibold text-orange-600">{project.savingsPercent}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 font-light">{project.date}</span>
                </div>

                {/* CTA */}
                <button className="mt-4 w-full py-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                  Voir les détails →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid md:grid-cols-4 gap-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
          {[
            { label: "Projets réalisés", value: "2 847", icon: "🏠" },
            { label: "Puissance totale", value: "17.2 MW", icon: "⚡" },
            { label: "Économies générées", value: "4.2M €", icon: "💰" },
            { label: "Satisfaction client", value: "4.8/5", icon: "⭐" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400 font-light">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="sticky top-4 float-right mr-4 mt-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="relative h-96">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.location}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold text-lg">{selectedProject.location}</span>
                </div>
                <h3 className="text-3xl font-bold text-white">{selectedProject.type}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              
              {/* Technical Details */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                  <Zap className="w-8 h-8 text-green-600 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{selectedProject.power}</div>
                  <div className="text-sm text-gray-600 font-light">Puissance installée</div>
                  <div className="text-xs text-gray-500 mt-2">{selectedProject.panels}</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200">
                  <TrendingDown className="w-8 h-8 text-orange-600 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{selectedProject.savingsPercent}</div>
                  <div className="text-sm text-gray-600 font-light">Réduction facture</div>
                  <div className="text-xs text-gray-500 mt-2">{selectedProject.savings} économisés</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                  <Clock className="w-8 h-8 text-blue-600 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">1 jour</div>
                  <div className="text-sm text-gray-600 font-light">Durée installation</div>
                  <div className="text-xs text-gray-500 mt-2">{selectedProject.date}</div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-orange-200">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(selectedProject.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-2xl">⭐</span>
                  ))}
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed font-light mb-4 italic">
                  "{selectedProject.testimonial}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                    {selectedProject.client.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{selectedProject.client}</div>
                    <div className="text-sm text-gray-600 font-light">{selectedProject.location}</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Demander mon étude gratuite
                  <Zap className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}