import { ClipboardList, Search, PhoneCall, ArrowRight, Zap, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  const steps = [
    {
      icon: ClipboardList,
      step: "01",
      title: "Renseignez vos informations",
      description: "Complétez le formulaire en 2 minutes avec les caractéristiques de votre logement et les détails de votre projet."
    },
    {
      icon: Search,
      step: "02",
      title: "Analyse de faisabilité",
      description: "Un professionnel certifié évalue la viabilité technique et économique de votre installation selon votre situation."
    },
    {
      icon: PhoneCall,
      step: "03",
      title: "Mise en relation qualifiée",
      description: "Vous êtes recontacté sous 48h uniquement si votre projet présente une cohérence technique et financière avérée."
    }
  ];

  return (
    <section id="how" className="py-24 bg-white">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Zap className="inline w-4 h-4 mr-1" />
            Processus
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Comment se déroule
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
              votre étude ?
            </span>
          </h2>

          <p className="text-lg text-gray-600 font-light">
            Un processus simple et transparent, sans promesse chiffrée hasardeuse. 
            Nous privilégions la qualité et la pertinence des projets.
          </p>
        </div>

        {/* Timeline moderne */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Ligne verticale */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-200 via-yellow-200 to-orange-200 -translate-x-1/2" />

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`relative flex items-center gap-8 ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Content Card */}
                    <div className={`flex-1 ${isEven ? "lg:text-right" : "lg:text-left"}`}>
                      <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-lg hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1">
                        <div className={`flex items-center gap-3 mb-4 ${isEven ? "lg:justify-end" : "lg:justify-start"}`}>
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                            Étape {step.step}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed font-light">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Icon central */}
                    <div className="hidden lg:flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl flex-shrink-0 z-10">
                      <Icon className="w-9 h-9 text-white" />
                    </div>

                    {/* Spacer pour alignement */}
                    <div className="flex-1 hidden lg:block" />

                    {/* Icon mobile */}
                    <div className="lg:hidden flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg flex-shrink-0">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 🆕 BOUTON VERS PAGE PROCESSUS DÉTAILLÉE */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-6 max-w-2xl">
            <p className="text-gray-700 mb-4 font-light">
              Vous voulez en savoir plus sur le processus complet d'installation ?
            </p>
            <Link
              to="/processus"
              className="inline-flex items-center gap-2 bg-white border-2 border-orange-300 text-orange-700 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-all hover:scale-105"
            >
              <ExternalLink className="w-5 h-5" />
              Découvrir les 6 étapes détaillées
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-gray-50 to-orange-50 border border-orange-100 rounded-2xl p-8 max-w-2xl">
            <p className="text-gray-700 mb-6 font-light">
              <strong className="font-semibold">Important :</strong> Les informations générales sur le photovoltaïque sont disponibles 
              sur les sites institutionnels français (ADEME, Ministère de la Transition Écologique).
            </p>
            <a
              href="#form"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Démarrer mon étude
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}