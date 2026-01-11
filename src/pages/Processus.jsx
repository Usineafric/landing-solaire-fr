import { useEffect } from "react";
import { ArrowLeft, FileSearch, FileText, CheckSquare, Wrench, Zap, LineChart, Shield, ArrowRight, Clock, Calendar, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Processus() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const etapes = [
    {
      number: 1,
      icon: FileSearch,
      title: "Étude de faisabilité technique",
      subtitle: "Analyse approfondie de votre projet",
      duree: "2-3 jours",
      description: [
        "L'étude de faisabilité constitue la première étape cruciale de votre projet photovoltaïque. Nos experts réalisent une analyse complète et gratuite de votre habitation pour déterminer la viabilité technique et économique de votre installation solaire.",
        "Nous commençons par une étude détaillée de votre toiture : orientation (idéalement plein sud, mais sud-est et sud-ouest sont également acceptables), inclinaison (entre 30° et 35° pour un rendement optimal en France), surface disponible, type de couverture (tuiles, ardoises, bac acier), et état général de la charpente. Une toiture en bon état est indispensable car les panneaux solaires ont une durée de vie de 25 à 30 ans.",
        "Ensuite, nous analysons l'ensoleillement de votre région et les éventuels ombrages. À l'aide d'outils professionnels de simulation 3D, nous identifions tous les obstacles susceptibles de projeter une ombre sur vos panneaux : arbres, cheminées, bâtiments voisins, antennes. Même une ombre partielle peut réduire significativement la production de votre installation, d'où l'importance d'une étude précise.",
        "Nous calculons ensuite le dimensionnement optimal de votre installation en fonction de votre consommation électrique actuelle. L'objectif est de maximiser votre taux d'autoconsommation tout en restant dans un budget cohérent. Une installation surdimensionnée n'est pas forcément rentable si vous consommez peu. Nous analysons vos factures d'électricité pour déterminer la puissance idéale, généralement entre 3 kWc et 9 kWc pour une maison individuelle.",
        "L'étude intègre également une simulation de production sur 25 ans, un calcul du retour sur investissement, et une estimation précise des économies générées. Nous prenons en compte l'évolution probable du prix de l'électricité, les coûts de maintenance prévisionnels, et la dégradation naturelle du rendement des panneaux (environ 0,5% par an)."
      ],
      checkpoints: [
        "Analyse orientation et inclinaison toiture",
        "Étude ombrages et ensoleillement",
        "Dimensionnement optimal selon consommation",
        "Simulation production sur 25 ans",
        "Calcul retour sur investissement"
      ],
      color: "from-yellow-400 to-orange-500"
    },
    {
      number: 2,
      icon: FileText,
      title: "Démarches administratives",
      subtitle: "Accompagnement complet dans vos formalités",
      duree: "3-4 semaines",
      description: [
        "Les démarches administratives sont souvent perçues comme un frein majeur, mais nous prenons en charge l'intégralité de ces formalités pour vous simplifier la vie. Notre expérience nous permet de naviguer efficacement dans les méandres administratifs et d'accélérer considérablement les délais.",
        "La première étape consiste à déposer une déclaration préalable de travaux auprès de votre mairie. Cette formalité est obligatoire pour toute installation de panneaux solaires en surimposition ou intégration au bâti. Le délai d'instruction est d'un mois, durant lequel la mairie vérifie la conformité de votre projet avec le Plan Local d'Urbanisme (PLU) et les règles d'urbanisme locales. Dans certaines zones protégées (monuments historiques, sites classés), l'autorisation de l'Architecte des Bâtiments de France (ABF) peut être nécessaire, ce qui rallonge les délais.",
        "Parallèlement, nous déposons une demande de raccordement auprès d'Enedis (ou votre gestionnaire de réseau local). Cette demande, appelée Contrat d'Accès et d'Exploitation (CAE), est indispensable pour pouvoir injecter votre surplus de production sur le réseau public. Enedis dispose de trois mois pour étudier votre demande et vous proposer une solution de raccordement. Dans la plupart des cas pour les installations résidentielles, le raccordement s'effectue sur le réseau basse tension existant sans nécessiter de travaux d'extension.",
        "Nous constituons également votre dossier de demande d'aides financières : MaPrimeRénov' auprès de l'Anah, dossier CEE (Certificats d'Économies d'Énergie) auprès d'un obligé, et demande d'éco-prêt à taux zéro si vous le souhaitez. Chaque dispositif d'aide a ses propres critères d'éligibilité et ses propres documents justificatifs. Notre maîtrise de ces dossiers vous garantit de maximiser vos aides et d'éviter tout rejet pour pièce manquante.",
        "Enfin, si vous optez pour la vente de surplus ou la vente totale de votre production, nous vous assistons dans la signature du contrat d'achat avec EDF OA (Obligation d'Achat) ou un autre acheteur agréé. Ce contrat, d'une durée de 20 ans, fixe le tarif de rachat de votre électricité et sécurise vos revenus futurs."
      ],
      checkpoints: [
        "Déclaration préalable mairie (1 mois)",
        "Demande raccordement Enedis (3 mois)",
        "Constitution dossiers aides (MaPrimeRénov', CEE)",
        "Contrat rachat électricité EDF OA",
        "Suivi et relances administratives"
      ],
      color: "from-yellow-400 to-orange-500"
    },
    {
      number: 3,
      icon: CheckSquare,
      title: "Validation technique et contractuelle",
      subtitle: "Visite sur site et confirmation du projet",
      duree: "1 semaine",
      description: [
        "Une fois les autorisations administratives obtenues, nous organisons une visite technique approfondie à votre domicile. Cette étape permet de confirmer tous les éléments de l'étude initiale et d'identifier les éventuelles contraintes techniques non détectées lors de l'étude préliminaire.",
        "Le technicien inspecte minutieusement votre toiture : il vérifie l'état de la charpente (présence de poutres porteuses suffisamment solides pour supporter le poids des panneaux), l'accessibilité pour les travaux, les zones de fixation optimales, et la compatibilité de votre couverture avec notre système de montage. Pour une toiture en tuiles par exemple, nous vérifions qu'elles ne sont pas trop fragiles et qu'il est possible de les retirer temporairement sans casse.",
        "Il inspecte également votre installation électrique existante : emplacement du tableau électrique, disponibilité de place pour installer les protections AC et DC obligatoires, distance entre le toit et le tableau (qui impacte la section des câbles), conformité aux normes NF C 15-100. Si votre installation électrique est trop ancienne ou non conforme, une mise aux normes partielle peut être nécessaire avant l'installation des panneaux.",
        "Le technicien détermine l'emplacement optimal de l'onduleur, élément central qui transforme le courant continu produit par les panneaux en courant alternatif utilisable dans votre maison. L'onduleur doit être installé dans un local ventilé, à l'abri des intempéries et des températures extrêmes, idéalement proche des panneaux pour limiter les pertes en ligne. Il repère également le meilleur emplacement pour le coffret de protection AC/DC et le compteur de production.",
        "Suite à cette visite, nous finalisons le devis définitif avec le détail complet de la prestation : nombre et type de panneaux, puissance de l'onduleur, longueur de câbles, système de fixation, main d'œuvre, garanties. Nous vous présentons également le planning prévisionnel des travaux avec les dates d'intervention. Une fois le devis signé et l'acompte versé (généralement 30% du montant total), nous commandons le matériel et bloquons les dates d'installation."
      ],
      checkpoints: [
        "Visite technique complète du site",
        "Inspection toiture et charpente",
        "Vérification installation électrique",
        "Devis définitif détaillé",
        "Signature contrat et commande matériel"
      ],
      color: "from-yellow-400 to-orange-500"
    },
    {
      number: 4,
      icon: Wrench,
      title: "Installation des panneaux solaires",
      subtitle: "Pose professionnelle par équipe certifiée",
      duree: "1-2 jours",
      description: [
        "Le jour J, une équipe de techniciens certifiés RGE et QualiPV intervient à votre domicile pour réaliser l'installation complète de votre système photovoltaïque. La durée des travaux varie selon la complexité et la taille de l'installation, mais pour une installation résidentielle standard (entre 3 et 9 kWc), comptez 1 à 2 jours de travaux.",
        "La première étape consiste à sécuriser le chantier : installation d'échafaudages ou de nacelle si nécessaire, mise en place des protections anti-chute pour les techniciens travaillant en hauteur, balisage de la zone de travail au sol. La sécurité est notre priorité absolue et nous respectons scrupuleusement toutes les normes de sécurité du travail en hauteur.",
        "Ensuite, les techniciens procèdent à la pose du système de fixation sur votre toiture. Selon le type de couverture, nous utilisons des crochets de toiture spécifiques qui s'insèrent sous les tuiles sans percer l'étanchéité, ou des rails fixés directement sur la charpente. Les rails en aluminium sont positionnés avec une précision millimétrique pour garantir un alignement parfait des panneaux et une résistance optimale au vent (nous dimensionnons les fixations pour résister à des vents jusqu'à 150 km/h).",
        "Les panneaux solaires sont ensuite montés un par un sur le toit et fixés sur les rails. Chaque panneau pèse environ 20 kg et mesure généralement 1,7m x 1m. Les techniciens les manipulent avec précaution pour éviter toute détérioration. Une fois tous les panneaux en place, ils procèdent au câblage série et parallèle selon le schéma électrique préétabli. Les câbles solaires spéciaux, résistants aux UV et aux intempéries, sont soigneusement acheminés jusqu'au coffret de protection DC.",
        "En parallèle, un technicien travaille sur l'installation électrique interne : pose de l'onduleur au mur, raccordement des câbles DC provenant des panneaux, installation du coffret de protection AC avec disjoncteur différentiel, câblage jusqu'au tableau électrique principal, pose du compteur de production Enedis. Tous les travaux électriques sont réalisés hors tension et conformément à la norme NF C 15-100. À l'issue de l'installation, nous effectuons des tests de fonctionnement complets : mesure de tension, test de bon fonctionnement de l'onduleur, vérification des protections électriques, test de production. Nous remettons votre chantier en parfait état de propreté avant de partir."
      ],
      checkpoints: [
        "Sécurisation du chantier",
        "Pose système de fixation",
        "Installation panneaux sur toiture",
        "Câblage électrique DC et AC",
        "Installation onduleur et protections",
        "Tests de conformité et fonctionnement"
      ],
      color: "from-yellow-400 to-orange-500"
    },
    {
      number: 5,
      icon: Zap,
      title: "Mise en service et raccordement",
      subtitle: "Activation de votre installation",
      duree: "2-4 semaines",
      description: [
        "Une fois l'installation physiquement terminée, nous entamons la phase de mise en service officielle de votre système photovoltaïque. Cette étape implique plusieurs acteurs et nécessite le respect d'un protocole strict pour être en conformité avec la réglementation.",
        "Nous commençons par établir l'attestation de conformité Consuel (Comité National pour la Sécurité des Usagers de l'Électricité). Ce document officiel atteste que votre installation électrique est conforme aux normes en vigueur et peut être raccordée au réseau public en toute sécurité. Nous remplissons le formulaire Consuel avec toutes les caractéristiques techniques de votre installation et le transmettons avec les pièces justificatives requises. Le Consuel dispose de trois semaines pour instruire le dossier et délivrer l'attestation.",
        "En parallèle, si vous avez opté pour la vente de surplus ou la vente totale, nous finalisons la signature de votre contrat d'achat avec EDF OA. Ce contrat de 20 ans garantit un tarif de rachat fixe de votre électricité, indexé selon l'arrêté tarifaire en vigueur au moment de votre demande de raccordement. Les tarifs évoluent tous les trimestres, d'où l'importance d'anticiper votre projet.",
        "Une fois l'attestation Consuel obtenue, Enedis peut procéder au raccordement physique de votre installation au réseau public. Un technicien Enedis se déplace pour installer le compteur Linky de production (si vous n'en avez pas déjà un), paramétrer les index de production et de soutirage, et activer le raccordement. À partir de ce moment, votre installation est officiellement en service et commence à produire de l'électricité comptabilisée.",
        "Nous vous formons ensuite à l'utilisation de votre installation : fonctionnement de l'onduleur, lecture des écrans de monitoring, accès à l'application de suivi de production (la plupart des onduleurs modernes proposent une application smartphone pour suivre en temps réel votre production et détecter d'éventuelles anomalies). Nous vous remettons l'ensemble de la documentation technique : notices des équipements, certificats de garantie, attestations d'assurance, schémas électriques, guide d'utilisation et d'entretien. Nous vous expliquons également les gestes simples d'entretien (nettoyage des panneaux une à deux fois par an si nécessaire) et les signes d'alerte à surveiller."
      ],
      checkpoints: [
        "Attestation Consuel conformité",
        "Signature contrat achat EDF OA",
        "Raccordement Enedis",
        "Installation compteur production",
        "Formation utilisateur complète",
        "Remise documentation technique"
      ],
      color: "from-yellow-400 to-orange-500"
    },
    {
      number: 6,
      icon: LineChart,
      title: "Suivi et maintenance longue durée",
      subtitle: "Accompagnement sur 25 ans",
      duree: "Continu",
      description: [
        "Votre installation photovoltaïque est désormais en service, mais notre engagement ne s'arrête pas là. Nous assurons un suivi et une maintenance sur la durée de vie complète de votre installation, soit 25 à 30 ans minimum.",
        "Tout d'abord, nous mettons en place un système de monitoring à distance de votre production. Grâce aux technologies connectées intégrées aux onduleurs modernes, nous pouvons surveiller en permanence les performances de votre installation. Nous recevons des alertes automatiques en cas de dysfonctionnement, de baisse anormale de production, ou de panne d'un équipement. Cette télésurveillance nous permet d'intervenir rapidement avant que vous ne constatiez vous-même le problème, limitant ainsi les pertes de production.",
        "Nous réalisons également un bilan de production annuel : comparaison entre la production réelle et la production théorique attendue, analyse des écarts éventuels, vérification du bon fonctionnement de tous les équipements. Ce bilan nous permet d'identifier les éventuelles dégradations de performance et d'anticiper les opérations de maintenance nécessaires. Par exemple, un nettoyage des panneaux peut être recommandé si l'accumulation de poussière, de pollution ou de fientes d'oiseaux impacte significativement la production.",
        "Notre service après-vente reste à votre disposition pendant toute la durée de vie de l'installation. En cas de panne ou de questionnement, vous pouvez nous contacter via une hotline dédiée ou l'application de suivi. Nos techniciens interviennent sous 48 à 72 heures maximum en cas de panne impactant la production. La plupart des interventions sont couvertes par les garanties constructeur (onduleur garanti 5 à 10 ans selon les modèles, panneaux garantis 25 à 30 ans en performance).",
        "Nous proposons également des contrats de maintenance préventive optionnels : visite annuelle d'un technicien, nettoyage professionnel des panneaux, vérification de tous les serrages et connexions électriques, contrôle thermographique pour détecter d'éventuels points chauds anormaux. Ces opérations préventives prolongent la durée de vie de votre installation et optimisent votre production sur le long terme. Enfin, lorsque votre onduleur arrive en fin de vie (généralement après 10 à 15 ans de service), nous vous accompagnons dans son remplacement par un modèle plus récent et plus performant, vous permettant ainsi de bénéficier des dernières innovations technologiques."
      ],
      checkpoints: [
        "Monitoring production à distance",
        "Bilan annuel de performance",
        "SAV réactif sous 48-72h",
        "Maintenance préventive optionnelle",
        "Accompagnement sur 25-30 ans",
        "Remplacement onduleur après 10-15 ans"
      ],
      color: "from-yellow-400 to-orange-500"
    }
  ];

  const timeline = [
    { phase: "Étude", duree: "3 jours", color: "bg-yellow-400" },
    { phase: "Admin", duree: "3-4 sem", color: "bg-orange-400" },
    { phase: "Validation", duree: "1 sem", color: "bg-yellow-500" },
    { phase: "Installation", duree: "1-2 jours", color: "bg-orange-500" },
    { phase: "Mise en service", duree: "2-4 sem", color: "bg-yellow-400" },
    { phase: "Suivi", duree: "25 ans", color: "bg-orange-600" }
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
              <Calendar className="inline w-4 h-4 mr-1" />
              Processus d'Installation Détaillé
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Comment se déroule
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
                votre installation solaire
              </span>
            </h1>

            <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">
              De l'étude initiale au suivi sur 25 ans, découvrez en détail les <strong className="font-semibold">6 étapes clés</strong> 
              de votre projet photovoltaïque. Un processus professionnel, transparent et sécurisé.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-gray-700 font-medium">Durée totale : 2-4 mois</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                <span className="text-gray-700 font-medium">Équipe certifiée RGE</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-600" />
                <span className="text-gray-700 font-medium">Garanties 25-30 ans</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Étapes détaillées */}
      <section className="py-24 bg-white">
        <div className="container-page">
          <div className="max-w-7xl mx-auto space-y-32">
            {etapes.map((etape, index) => {
              const Icon = etape.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Sidebar sticky */}
                  <div className={!isEven ? "lg:order-2" : ""}>
                    <div className="sticky top-8">
                      <div className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-3xl p-10 border-2 border-orange-100">
                        {/* Numéro étape */}
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl mb-6">
                          <span className="text-3xl font-bold text-white">{etape.number}</span>
                        </div>

                        {/* Icône */}
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white border-2 border-orange-200 shadow-lg mb-6 ml-4">
                          <Icon className="w-10 h-10 text-orange-600" />
                        </div>

                        {/* Durée */}
                        <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                          <Clock className="inline w-4 h-4 mr-1" />
                          Durée : {etape.duree}
                        </div>

                        {/* Checkpoints */}
                        <div className="space-y-3 mt-6">
                          {etape.checkpoints.map((point, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <CheckSquare className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700 font-medium leading-tight">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contenu texte */}
                  <div className={!isEven ? "lg:order-1" : ""}>
                    <div className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                      Étape {etape.number}/6
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                      {etape.title}
                    </h2>

                    <p className="text-lg text-orange-600 font-semibold mb-8">
                      {etape.subtitle}
                    </p>

                    <div className="prose prose-lg max-w-none">
                      {etape.description.map((paragraph, i) => (
                        <p key={i} className="text-gray-700 leading-relaxed mb-6 font-light text-justify">
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

      {/* Timeline visuelle */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-page">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Durée totale du projet
              </h2>
              <p className="text-lg text-gray-600 font-light">
                De la première étude à la mise en service : <strong className="font-semibold text-orange-600">2 à 4 mois</strong> en moyenne
              </p>
            </div>

            {/* Timeline horizontale */}
            <div className="relative">
              {/* Ligne */}
              <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-600" />

              {/* Points */}
              <div className="relative grid grid-cols-6 gap-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center text-white font-bold shadow-lg mb-4 relative z-10`}>
                      {index + 1}
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 text-sm mb-1">{item.phase}</div>
                      <div className="text-xs text-gray-600">{item.duree}</div>
                    </div>
                  </div>
                ))}
              </div>
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
            <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-8" />

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à démarrer votre projet ?
            </h2>

            <p className="text-xl text-gray-300 mb-10 font-light">
              Obtenez votre <strong className="font-semibold text-white">étude de faisabilité gratuite</strong> et 
              découvrez comment nous pouvons transformer votre toiture en source d'énergie verte.
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