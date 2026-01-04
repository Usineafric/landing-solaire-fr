import { CheckCircle2, ClipboardList, ShieldCheck, UserCheck } from "lucide-react";

export default function WhatYouGet() {
  const benefits = [
    {
      icon: ClipboardList,
      title: "Qualification rigoureuse",
      description: "Vérification systématique de la conformité de votre demande aux critères d'éligibilité pour garantir sa pertinence."
    },
    {
      icon: UserCheck,
      title: "Analyse professionnelle",
      description: "Évaluation détaillée de la faisabilité technique et économique par un expert certifié du secteur photovoltaïque."
    },
    {
      icon: ShieldCheck,
      title: "Mise en relation encadrée",
      description: "Contact uniquement si votre projet présente une réelle cohérence. Aucune sollicitation commerciale agressive."
    },
    {
      icon: CheckCircle2,
      title: "Approche transparente",
      description: "Aucune promesse de rendement fictive. Pas de simulation d'aides trompeuse. Uniquement des faits vérifiables."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Nos engagements
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Ce que vous recevez
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
              vraiment
            </span>
          </h2>

          <p className="text-lg text-gray-600 font-light">
            Une démarche professionnelle et honnête, sans artifice marketing. 
            Notre objectif : une mise en relation pertinente, pas un volume maximal.
          </p>
        </div>

        {/* Grid moderne */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border-2 border-gray-100 p-8 hover:border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient subtil au hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm font-light">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 rounded-xl px-6 py-4 max-w-2xl">
            <p className="text-sm text-gray-800 font-light">
              <strong className="font-semibold">Notre philosophie :</strong> Éviter les faux espoirs et les démarches inutiles. 
              Une demande exploitable vaut mieux que dix contacts non qualifiés.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}