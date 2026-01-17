import { useEffect } from "react";
import { ArrowLeft, Calculator, Zap, TrendingDown, Euro, ArrowRight, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SavingsCalculator from "../sections/SavingsCalculator";
import Header from "../components/Header";

export default function Simulateur() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const avantages = [
    {
      icon: TrendingDown,
      title: "Réduisez vos factures",
      description: "Jusqu'à -70% sur vos dépenses d'électricité"
    },
    {
      icon: Euro,
      title: "Aides de l'État",
      description: "Jusqu'à 11 000€ de subventions cumulables"
    },
    {
      icon: Zap,
      title: "Production garantie",
      description: "Panneaux garantis 25-30 ans en performance"
    },
    {
      icon: Shield,
      title: "Installation RGE",
      description: "Installateurs certifiés et assurés"
    }
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
              <Calculator className="inline w-4 h-4 mr-1" />
              Simulateur d'Économies
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Estimez vos économies
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
                avec le solaire
              </span>
            </h1>

            <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">
              Calculez en quelques clics <strong className="font-semibold">combien vous pourriez économiser</strong> 
              {" "}avec une installation photovoltaïque adaptée à votre situation.
            </p>

            <div className="inline-block bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-2xl p-6">
              <p className="text-sm text-gray-700 font-light">
                <strong className="font-semibold">💡 Simulation gratuite et sans engagement</strong>
                <br />
                Les résultats sont indicatifs et peuvent varier selon votre situation précise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculateur intégré */}
      <SavingsCalculator />

      {/* Section Avantages */}
      <section className="py-24 bg-white">
        <div className="container-page">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Pourquoi passer
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
                au solaire maintenant ?
              </span>
            </h2>

            <p className="text-lg text-gray-600 font-light">
              Les avantages d'une installation photovoltaïque en 2026
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {avantages.map((avantage, index) => {
              const Icon = avantage.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl border-2 border-orange-100 p-8 hover:shadow-xl transition-all"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {avantage.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed font-light">
                    {avantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Méthodologie */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comment fonctionne notre simulateur ?
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Une estimation basée sur des données réelles
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-orange-100 p-8 space-y-6">
              {[
                {
                  title: "1. Analyse de votre consommation",
                  text: "À partir de votre facture mensuelle, nous estimons votre consommation annuelle d'électricité."
                },
                {
                  title: "2. Calcul de l'ensoleillement",
                  text: "Selon votre code postal, nous déterminons le potentiel de production solaire de votre région."
                },
                {
                  title: "3. Dimensionnement optimal",
                  text: "En fonction de votre surface de toiture, nous calculons la puissance installable et la production attendue."
                },
                {
                  title: "4. Estimation des économies",
                  text: "Nous croisons tous ces paramètres pour estimer vos économies réelles sur 25 ans, en tenant compte de l'évolution des tarifs."
                }
              ].map((etape, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{etape.title}</h3>
                    <p className="text-gray-600 leading-relaxed font-light text-sm">
                      {etape.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-2xl p-6">
              <p className="text-sm text-gray-700 font-light leading-relaxed">
                <strong className="font-semibold">⚠️ Attention :</strong> Ce simulateur fournit une estimation indicative. 
                Pour obtenir un chiffrage précis adapté à votre situation (orientation toiture, ombrages, etc.), 
                demandez une <strong className="font-semibold">étude de faisabilité gratuite</strong> réalisée par un professionnel certifié.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ rapide */}
      <section className="py-24 bg-white">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Questions fréquentes
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "Le simulateur est-il fiable ?",
                  a: "Le simulateur fournit une estimation basée sur des moyennes régionales. Pour un chiffrage précis, une étude personnalisée est nécessaire."
                },
                {
                  q: "Combien coûte une installation solaire ?",
                  a: "Le coût varie entre 8 000€ et 18 000€ selon la puissance, avant déduction des aides de l'État (jusqu'à 11 000€)."
                },
                {
                  q: "Quel est le retour sur investissement ?",
                  a: "En moyenne, une installation est amortie en 8 à 12 ans, pour une durée de vie garantie de 25-30 ans minimum."
                },
                {
                  q: "Puis-je vendre mon surplus ?",
                  a: "Oui, vous pouvez revendre votre surplus à EDF OA avec un contrat de rachat garanti sur 20 ans."
                }
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl border-2 border-orange-100 p-6"
                >
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
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
            <Calculator className="w-16 h-16 text-yellow-400 mx-auto mb-8" />

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Vous voulez un chiffrage précis ?
            </h2>

            <p className="text-xl text-gray-300 mb-10 font-light">
              Recevez une <strong className="font-semibold text-white">étude de faisabilité personnalisée</strong>
              {" "}réalisée par un professionnel certifié RGE, 100% gratuite et sans engagement.
            </p>

            <Link
              to="/#form"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-5 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-yellow-500/50 transition-all hover:scale-105"
            >
              <Zap className="w-6 h-6" />
              Demander mon étude gratuite
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-sm text-gray-400 mt-6 font-light">
              ✓ Sans engagement · ✓ Réponse sous 48h · ✓ Étude complète · ✓ Installateurs RGE
            </p>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}