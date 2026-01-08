import { Star, Quote, ThumbsUp, MapPin } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sophie Martin",
      location: "Lyon (69)",
      rating: 5,
      date: "Il y a 2 semaines",
      text: "Installation impeccable réalisée en une journée. L'équipe était très professionnelle et a pris le temps de tout m'expliquer. Les économies sont déjà visibles sur ma première facture !",
      helpful: 12,
      avatar: "SM"
    },
    {
      id: 2,
      name: "Jean Dubois",
      location: "Bordeaux (33)",
      rating: 5,
      date: "Il y a 3 semaines",
      text: "Excellent accompagnement du début à la fin. Le conseiller a été très à l'écoute de mes besoins. La production dépasse même les prévisions. Je recommande vivement !",
      helpful: 18,
      avatar: "JD"
    },
    {
      id: 3,
      name: "Marie Rousseau",
      location: "Marseille (13)",
      rating: 5,
      date: "Il y a 1 mois",
      text: "Très satisfaite de mon installation. Le rapport qualité-prix est excellent. Les panneaux se fondent parfaitement avec ma toiture. Service après-vente réactif.",
      helpful: 9,
      avatar: "MR"
    },
    {
      id: 4,
      name: "Pierre Bernard",
      location: "Toulouse (31)",
      rating: 5,
      date: "Il y a 1 mois",
      text: "Projet clé en main sans aucun stress. Les démarches administratives ont été gérées de A à Z. Installation rapide et propre. Je recommande sans hésiter.",
      helpful: 15,
      avatar: "PB"
    },
    {
      id: 5,
      name: "Claire Petit",
      location: "Nantes (44)",
      rating: 5,
      date: "Il y a 2 mois",
      text: "Excellente expérience. L'équipe technique était ponctuelle et très soigneuse. Les panneaux produisent même mieux que prévu grâce au bon dimensionnement du projet.",
      helpful: 21,
      avatar: "CP"
    },
    {
      id: 6,
      name: "Thomas Lambert",
      location: "Strasbourg (67)",
      rating: 5,
      date: "Il y a 2 mois",
      text: "Service impeccable du début à la fin. Conseils pertinents, installation rapide, suivi après vente au top. Ma facture a baissé de 70%. Un investissement très rentable !",
      helpful: 14,
      avatar: "TL"
    }
  ];

  const averageRating = 4.8;
  const totalReviews = 2847;

  return (
    <section className="py-24 bg-white">
      <div className="container-page">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Star className="inline w-4 h-4 mr-1 fill-current" />
            Témoignages Clients
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Ils nous ont fait
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
              confiance
            </span>
          </h2>

          <p className="text-lg text-gray-600 font-light mb-8">
            Découvrez les retours d'expérience de nos clients satisfaits 
            dans toute la France.
          </p>

          {/* Overall Rating */}
          <div className="inline-flex items-center gap-8 bg-gradient-to-r from-gray-50 to-orange-50 border-2 border-orange-200 rounded-2xl px-8 py-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating}</div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating)
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600 font-light">Note moyenne</div>
            </div>

            <div className="h-16 w-px bg-gray-300" />

            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalReviews.toLocaleString()}</div>
              <div className="text-sm text-gray-600 font-light">Avis clients</div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:border-orange-300 relative overflow-hidden group"
            >
              {/* Quote Icon */}
              <Quote className="absolute -top-2 -right-2 w-20 h-20 text-orange-100 opacity-50 group-hover:opacity-100 transition-opacity" />

              {/* Header */}
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span className="font-light">{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-500 fill-current"
                  />
                ))}
                <span className="text-xs text-gray-500 ml-2 font-light">{testimonial.date}</span>
              </div>

              {/* Text */}
              <p className="text-gray-700 leading-relaxed font-light mb-4 relative z-10">
                {testimonial.text}
              </p>

              {/* Footer */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100 relative z-10">
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="font-light">Utile ({testimonial.helpful})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid md:grid-cols-4 gap-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
          {[
            { icon: "✅", label: "Certifié RGE", value: "QualiPV" },
            { icon: "🛡️", label: "Garantie", value: "25 ans" },
            { icon: "⭐", label: "Satisfaction", value: "4.8/5" },
            { icon: "🏆", label: "Expérience", value: "+5 ans" }
          ].map((badge, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl mb-3">{badge.icon}</div>
              <div className="text-xl font-bold mb-1">{badge.value}</div>
              <div className="text-sm text-gray-400 font-light">{badge.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Rejoignez nos {totalReviews.toLocaleString()}+ clients satisfaits
            </h3>
            <p className="text-gray-700 font-light mb-6">
              Demandez votre étude personnalisée gratuite et sans engagement
            </p>
            <button
              onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Star className="w-5 h-5 fill-current" />
              Démarrer mon projet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}