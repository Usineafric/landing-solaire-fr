import { useEffect } from "react";
import { ArrowLeft, Shield, Award, CheckCircle, Zap, FileText, Euro, Home, Clock, Users, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Garanties() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const certifications = [
    {
      icon: Shield,
      logo: "/logos/qualibat-rge.webp",
      title: "Certification RGE",
      subtitle: "Reconnu Garant de l'Environnement",
      longDescription: [
        "La certification RGE (Reconnu Garant de l'Environnement) est un label officiel délivré par l'État français aux professionnels du bâtiment spécialisés dans les travaux de rénovation énergétique et l'installation d'équipements utilisant des énergies renouvelables.",
        "Cette qualification garantit que l'installateur dispose des compétences techniques nécessaires pour réaliser des travaux conformes aux normes en vigueur. Elle impose également des critères stricts en matière de formation continue, d'assurances professionnelles et de solidité financière.",
        "Pour vos projets photovoltaïques, faire appel à un installateur RGE est indispensable pour bénéficier des aides de l'État telles que MaPrimeRénov', l'éco-prêt à taux zéro ou les Certificats d'Économies d'Énergie (CEE). Sans cette certification, vous ne pourrez pas accéder à ces dispositifs d'aide financière.",
        "La certification RGE est délivrée pour une durée de 4 ans et fait l'objet d'un contrôle annuel. Les installateurs doivent prouver leur sérieux à travers des audits réguliers de leurs chantiers et maintenir leurs compétences à jour via des formations obligatoires."
      ],
      checkpoints: [
        "Label officiel reconnu par l'État",
        "Formation continue obligatoire",
        "Contrôles qualité réguliers",
        "Accès aux aides publiques garanti"
      ]
    },
    {
      icon: Zap,
      logo: "/logos/qualipv.jpg",
      title: "Qualification QualiPV",
      subtitle: "Expertise photovoltaïque certifiée",
      longDescription: [
        "QualiPV est une qualification spécifique délivrée par Qualit'EnR, l'association française pour la qualité d'installation des systèmes à énergies renouvelables. Cette qualification est dédiée exclusivement aux installateurs de panneaux solaires photovoltaïques.",
        "Pour obtenir QualiPV, l'installateur doit justifier d'une formation spécialisée dans le domaine photovoltaïque et prouver son expérience terrain à travers des références de chantiers réalisés. Un audit technique vérifie également la conformité des installations aux normes NF et DTU en vigueur.",
        "QualiPV se décline en plusieurs modules selon la puissance et le type d'installation : QualiPV Bât pour l'intégration au bâti, QualiPV 36 pour les installations jusqu'à 36 kVA, et QualiPV 500 pour les installations de plus grande puissance. Cette spécialisation garantit une expertise adaptée à votre projet.",
        "Les installateurs QualiPV sont référencés dans l'annuaire officiel de Qualit'EnR et font l'objet d'un suivi régulier. Des contrôles inopinés sur chantier permettent de vérifier le maintien du niveau de qualité et le respect des règles de l'art."
      ],
      checkpoints: [
        "Spécialisation photovoltaïque exclusive",
        "Formation technique obligatoire",
        "Audit des installations réalisées",
        "Référencement officiel Qualit'EnR"
      ]
    },
    {
      icon: Shield,
      logo: null,
      title: "Assurance Décennale",
      subtitle: "10 ans de protection juridique",
      longDescription: [
        "L'assurance décennale est une garantie légale obligatoire qui protège votre installation photovoltaïque pendant 10 ans à compter de la réception des travaux. Elle couvre tous les dommages qui compromettent la solidité de l'ouvrage ou le rendent impropre à sa destination.",
        "Cette assurance intervient en cas de vices cachés, malfaçons, ou défauts de conception qui n'auraient pas été détectés lors de la réception des travaux. Elle permet une prise en charge rapide des réparations sans avoir à engager une procédure judiciaire longue et coûteuse contre l'installateur.",
        "Pour les installations photovoltaïques, l'assurance décennale couvre notamment : les infiltrations d'eau suite à une mauvaise étanchéité de la toiture, les dommages structurels causés par une fixation inadaptée, ou encore les défaillances électriques majeures dues à une installation non conforme.",
        "Avant de signer tout devis, exigez systématiquement l'attestation d'assurance décennale de votre installateur. Cette attestation doit être à jour, mentionner explicitement les travaux photovoltaïques dans son champ d'application, et couvrir la période de vos travaux."
      ],
      checkpoints: [
        "Couverture obligatoire de 10 ans",
        "Protection contre les vices cachés",
        "Prise en charge sans procès",
        "Attestation à exiger avant signature"
      ]
    },
    {
      icon: Award,
      logo: null,
      title: "Garantie Fabricant",
      subtitle: "25 à 30 ans sur les panneaux",
      longDescription: [
        "Les panneaux solaires photovoltaïques bénéficient d'une double garantie fabricant : une garantie produit de 10 à 12 ans contre les défauts de fabrication, et une garantie de performance linéaire de 25 à 30 ans sur le rendement énergétique.",
        "La garantie de performance certifie que vos panneaux conserveront au minimum 80% de leur puissance initiale après 25 ans d'utilisation. Cette garantie est une assurance de rentabilité sur le long terme, car elle garantit que votre production d'électricité restera substantielle pendant des décennies.",
        "Les grands fabricants comme SunPower, LG, Panasonic ou Longi proposent des garanties particulièrement généreuses, certaines allant jusqu'à 30 ans avec un maintien de 87% de la puissance initiale. Ces garanties constructeur constituent un critère de choix essentiel lors de la sélection de vos équipements.",
        "En cas de défaillance couverte par la garantie, le fabricant s'engage à remplacer ou réparer les panneaux défectueux gratuitement. Conservez précieusement vos certificats de garantie et vérifiez que le fabricant dispose d'une présence solide en France pour faciliter les éventuelles démarches."
      ],
      checkpoints: [
        "Garantie produit : 10-12 ans",
        "Garantie performance : 25-30 ans",
        "Minimum 80% de rendement après 25 ans",
        "Remplacement gratuit si défaut"
      ]
    }
  ];

  const aides = [
    {
      icon: Home,
      logo: "/logos/maprimerenov.png",
      title: "MaPrimeRénov'",
      description: "Prime forfaitaire versée par l'Anah pour financer vos travaux de rénovation énergétique. Montant variable selon vos revenus et la localisation du bien.",
      montant: "Jusqu'à 11 000€",
      conditions: ["Propriétaire occupant ou bailleur", "Logement construit depuis +15 ans", "Installateur RGE obligatoire"]
    },
    {
      icon: Euro,
      logo: "/logos/cee.jpg",
      title: "Certificats d'Économies d'Énergie (CEE)",
      description: "Prime énergie financée par les fournisseurs d'énergie pour encourager les économies d'énergie. Cumulable avec MaPrimeRénov'.",
      montant: "Variable selon projet",
      conditions: ["Tous types de logements", "Installation par professionnel RGE", "Demande avant signature du devis"]
    },
    {
      icon: FileText,
      title: "TVA à taux réduit",
      description: "Taux de TVA réduit à 10% pour les installations photovoltaïques de puissance inférieure ou égale à 3 kWc.",
      montant: "10% au lieu de 20%",
      conditions: ["Puissance ≤ 3 kWc", "Logement achevé depuis +2 ans", "Pose par professionnel"]
    },
    {
      icon: Clock,
      title: "Éco-prêt à taux zéro (Éco-PTZ)",
      description: "Prêt sans intérêt pour financer vos travaux de rénovation énergétique, sans conditions de ressources.",
      montant: "Jusqu'à 50 000€",
      conditions: ["Propriétaire occupant ou bailleur", "Logement achevé depuis +2 ans", "Travaux par entreprise RGE"]
    }
  ];

  const additionalProtections = [
    {
      icon: Shield,
      title: "Assurance RC Professionnelle",
      description: "Couvre les dommages causés à des tiers pendant et après les travaux (blessures, dégâts matériels). Obligatoire pour tous les professionnels du bâtiment."
    },
    {
      icon: FileText,
      title: "Garantie de Parfait Achèvement",
      description: "Valable 1 an après réception, elle couvre tous les désordres signalés par le client, même mineurs (défauts d'étanchéité, problèmes esthétiques)."
    },
    {
      icon: Users,
      title: "Service Après-Vente",
      description: "Assistance technique et maintenance préventive pour garantir le bon fonctionnement de votre installation dans le temps. Contrats de maintenance disponibles."
    },
    {
      icon: CheckCircle,
      title: "Garantie Biennale",
      description: "Pendant 2 ans, couvre les équipements dissociables de la construction (onduleurs, coffrets électriques) contre les défauts de fonctionnement."
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
              <Shield className="inline w-4 h-4 mr-1" />
              Garanties & Certifications Complètes
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Vos garanties
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
                professionnelles détaillées
              </span>
            </h1>

            <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">
              Nous travaillons exclusivement avec des installateurs certifiés <strong className="font-semibold">RGE et QualiPV</strong>,
              pour vous garantir une installation conforme, sécurisée et éligible aux aides de l'État.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <img src="/logos/qualibat-rge.webp" alt="RGE" className="h-12 opacity-80" />
              <img src="/logos/qualipv.jpg" alt="QualiPV" className="h-12 opacity-80" />
              <img src="/logos/cee.jpg" alt="CEE" className="h-12 opacity-80" />
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-lg">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 font-semibold text-gray-900">4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Certifications détaillées */}
      <section className="py-24 bg-white">
        <div className="container-page">
          <div className="max-w-7xl mx-auto space-y-24">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image/Logo côté */}
                  <div className={!isEven ? "lg:order-2" : ""}>
                    <div className="sticky top-8">
                      <div className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-3xl p-12 border-2 border-orange-100">
                        {cert.logo ? (
                          <div className="bg-white rounded-2xl p-8 mb-8 inline-block shadow-lg">
                            <img
                              src={cert.logo}
                              alt={cert.title}
                              className="h-24 w-auto object-contain"
                            />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl mb-8">
                            <Icon className="w-12 h-12 text-white" />
                          </div>
                        )}

                        <div className="space-y-4">
                          {cert.checkpoints.map((point, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 font-medium">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contenu texte */}
                  <div className={!isEven ? "lg:order-1" : ""}>
                    <div className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                      Certification {index + 1}/4
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                      {cert.title}
                    </h2>

                    <p className="text-lg text-orange-600 font-semibold mb-8">
                      {cert.subtitle}
                    </p>

                    <div className="prose prose-lg max-w-none">
                      {cert.longDescription.map((paragraph, i) => (
                        <p key={i} className="text-gray-700 leading-relaxed mb-6 font-light">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Aides d'État */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-page">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Euro className="inline w-4 h-4 mr-1" />
              Aides Financières
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Les aides de l'État
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
                pour votre projet solaire
              </span>
            </h2>

            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Profitez des dispositifs d'aide publique pour réduire significativement le coût de votre installation photovoltaïque.
              <strong className="font-semibold"> Un installateur RGE est obligatoire</strong> pour en bénéficier.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {aides.map((aide, index) => {
              const Icon = aide.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border-2 border-gray-100 p-8 hover:border-orange-200 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4 mb-6">
                    {aide.logo ? (
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                        <img src={aide.logo} alt={aide.title} className="h-8 w-auto object-contain" />
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {aide.title}
                      </h3>
                      <div className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                        {aide.montant}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6 font-light">
                    {aide.description}
                  </p>

                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-900 mb-3">
                      Conditions d'éligibilité :
                    </div>
                    {aide.conditions.map((condition, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  Cumul des aides possible
                </h4>
                <p className="text-gray-700 leading-relaxed font-light">
                  La plupart de ces aides sont <strong className="font-semibold">cumulables entre elles</strong>. 
                  Par exemple, vous pouvez bénéficier simultanément de MaPrimeRénov', des CEE, de la TVA réduite 
                  et de l'éco-PTZ. Nos installateurs partenaires vous accompagnent dans toutes les démarches administratives 
                  pour maximiser vos aides et réduire votre reste à charge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Protections complémentaires */}
      <section className="py-24 bg-white">
        <div className="container-page">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Protections
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
                complémentaires
              </span>
            </h2>

            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Au-delà des garanties principales, nos installateurs partenaires vous offrent 
              une protection complète à toutes les étapes de votre projet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {additionalProtections.map((protection, index) => {
              const Icon = protection.icon;

              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl border-2 border-orange-100 p-6 hover:shadow-lg transition-all"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {protection.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    {protection.description}
                  </p>
                </div>
              );
            })}
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
              Prêt à bénéficier de ces garanties ?
            </h2>

            <p className="text-xl text-gray-300 mb-10 font-light">
              Recevez votre étude personnalisée gratuite réalisée par un installateur 
              <strong className="font-semibold text-white"> certifié RGE et QualiPV</strong>.
            </p>

            <Link
              to="/#form"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-5 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-yellow-500/50 transition-all hover:scale-105"
            >
              <Zap className="w-6 h-6" />
              Démarrer mon étude gratuite
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-sm text-gray-400 mt-6 font-light">
              ✓ Sans engagement · ✓ Réponse sous 48h · ✓ 100% gratuit
            </p>
          </div>
        </div>
      </section>
    </div>
  </>
);
}