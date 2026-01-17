import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  // -1 = tout fermé au chargement (plus propre pour un accordéon)
  const [openIndex, setOpenIndex] = useState(-1);

  const faqs = [
    {
      question: "L'étude est-elle vraiment gratuite ?",
      answer:
        "Oui, absolument. L'étude de faisabilité est 100% gratuite et sans aucun engagement de votre part. Aucun frais caché, aucune obligation d'achat. Vous recevez une analyse professionnelle de votre projet sans contrepartie financière.",
    },
    {
      question: "Quelles économies puis-je espérer ?",
      answer:
        "Une installation bien dimensionnée génère 60-70% d'économies sur la partie production autoconsommée. Le calcul exact dépend de votre consommation actuelle, orientation toiture, ensoleillement local et taux d'autoconsommation. L'étude vous donne une estimation précise basée sur votre situation réelle.",
    },
    {
      question: "Quel est le délai de réponse ?",
      answer:
        "Un professionnel certifié vous recontacte sous 48 heures ouvrées si votre projet présente une cohérence technique et économique. Dans le cas contraire, vous en serez informé par email.",
    },
    {
      question: "Qui peut demander cette étude ?",
      answer:
        "Cette étude est exclusivement réservée aux propriétaires de maison individuelle située en France métropolitaine. Les copropriétés, appartements et locations ne sont pas éligibles à ce service.",
    },
    {
      question: "Vais-je être contacté par plusieurs entreprises ?",
      answer:
        "Non. Vos coordonnées sont transmises à un seul professionnel qualifié dans le cadre strict de votre demande. Nous ne revendons jamais vos données à des tiers et vous ne recevrez pas de démarchage commercial intempestif.",
    },
    {
      question: "L'installation est-elle adaptée à ma région ?",
      answer:
        "Le photovoltaïque fonctionne dans toute la France métropolitaine. L'ensoleillement varie selon les régions, mais même dans le Nord, une installation correctement dimensionnée reste rentable. L'étude déterminera précisément le potentiel de votre localisation.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container-page">
        <div className="grid lg:grid-cols-5 gap-16 max-w-7xl mx-auto">
          {/* Colonne gauche - Intro */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-8">
              <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Questions fréquentes
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Vos questions,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
                  nos réponses
                </span>
              </h2>

              <p className="text-lg text-gray-600 mb-8 font-light leading-relaxed">
                Tout ce que vous devez savoir sur notre processus d'étude et
                l'installation photovoltaïque.
              </p>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-orange-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">
                      Autre question ?
                    </div>
                    <p className="text-sm text-gray-700 font-light">
                      Contactez-nous à{" "}
                      <a
                        href="mailto:contact@lepanneausolaire.com"
                        className="underline font-medium text-orange-600 hover:text-orange-700"
                      >
                        contact@lepanneausolaire.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Accordéon */}
          <div className="lg:col-span-3 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`bg-white border-2 rounded-2xl overflow-hidden transition-all ${
                    isOpen
                      ? "border-orange-200 shadow-lg"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-all"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-6 h-6 flex-shrink-0 transition-all duration-300 ${
                        isOpen ? "rotate-180 text-orange-600" : "text-gray-400"
                      }`}
                    />
                  </button>

                  <div
                    id={`faq-panel-${index}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-gray-600 leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
