import { useEffect } from "react";
import { ArrowLeft, MapPin, Zap, Star, TrendingDown, ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import InteractiveMap from "../sections/InteractiveMap";
import ProjectGallery from "../sections/ProjectGallery";
import Header from "../components/Header";

export default function Realisations() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { icon: Zap, value: "2 847", label: "Installations réalisées" },
    { icon: MapPin, value: "13", label: "Régions couvertes" },
    { icon: Star, value: "4.9/5", label: "Satisfaction client" },
    { icon: TrendingDown, value: "-70%", label: "Économies moyennes" }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Header avec retour */}
        <div className="bg-gray-900 py-4 border-b border-gray-800">
          <div className="container-page">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Retour à l'accueil</span>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-page">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <MapPin className="inline w-4 h-4 mr-1" />
                Nos Réalisations
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                Plus de 2 800 projets
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
                  réalisés en France
                </span>
              </h1>

              <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">
                Découvrez nos installations photovoltaïques à travers toute la France. 
                Des <strong className="font-semibold">particuliers satisfaits</strong> qui font confiance 
                à notre expertise depuis 2019.
              </p>

              {/* Stats cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:border-orange-200 hover:shadow-lg transition-all"
                    >
                      <Icon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600 font-light">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Carte Interactive France */}
        <InteractiveMap />

        {/* Galerie Projets */}
        <ProjectGallery />

        {/* Témoignages supplémentaires */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-page">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Ce que disent
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
                  nos clients
                </span>
              </h2>

              <p className="text-lg text-gray-600 font-light">
                Des avis authentiques de propriétaires qui ont fait le choix du solaire
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Sophie L.",
                  location: "Paris (75)",
                  rating: 5,
                  text: "Installation impeccable et équipe très professionnelle. Ma facture d'électricité a été divisée par 3 dès les premiers mois !"
                },
                {
                  name: "Pierre M.",
                  location: "Nice (06)",
                  rating: 5,
                  text: "Excellent accompagnement du début à la fin. Les démarches administratives ont été gérées entièrement par l'équipe."
                },
                {
                  name: "Marie D.",
                  location: "Strasbourg (67)",
                  rating: 5,
                  text: "Projet clé en main parfaitement exécuté. La production dépasse même les estimations initiales. Très satisfaite !"
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border-2 border-gray-100 p-8 hover:border-orange-200 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6 font-light italic">
                    "{testimonial.text}"
                  </p>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-orange-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>

          <div className="container-page relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-8" />

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Rejoignez nos 2 847 clients satisfaits
              </h2>

              <p className="text-xl text-gray-300 mb-10 font-light">
                Faites comme eux : <strong className="font-semibold text-white">divisez votre facture EDF par 3</strong> 
                {" "}avec une installation solaire professionnelle.
              </p>

              <Link
                to="/#form"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-5 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-yellow-500/50 transition-all hover:scale-105"
              >
                <Zap className="w-6 h-6" />
                Recevoir mon étude gratuite
                <ArrowRight className="w-5 h-5" />
              </Link>

              <p className="text-sm text-gray-400 mt-6 font-light">
                ✓ Sans engagement · ✓ Réponse sous 48h · ✓ 100% gratuit · ✓ Installateurs RGE
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}