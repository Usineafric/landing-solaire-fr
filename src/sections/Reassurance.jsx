import { ShieldCheck, Lock, UserCheck, CheckCircle2 } from "lucide-react";

export default function Reassurance() {
  const guarantees = [
    {
      icon: UserCheck,
      title: "Contact humain qualifié",
      description: "Vous êtes recontacté par un professionnel certifié uniquement si votre demande présente une réelle cohérence."
    },
    {
      icon: ShieldCheck,
      title: "Aucune obligation",
      description: "Vous conservez votre totale liberté de décision. Aucune pression commerciale, aucun engagement contractuel."
    },
    {
      icon: Lock,
      title: "Données sécurisées",
      description: "Transmission cryptée SSL. Vos informations personnelles sont uniquement partagées avec un professionnel dans le cadre strict de votre demande."
    },
    {
      icon: CheckCircle2,
      title: "Transparence absolue",
      description: "Aucune promesse de rendement fictive. Pas de simulation d'aides trompeuse. Uniquement des informations vérifiables et honnêtes."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Vos garanties
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Une démarche
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
              sécurisée et transparente
            </span>
          </h2>

          <p className="text-lg text-gray-600 font-light">
            Votre confiance est notre priorité. Découvrez nos engagements concrets pour une expérience sereine et professionnelle.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {guarantees.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl border-2 border-gray-100 p-8 hover:border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient overlay au hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom banner */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-10 text-center shadow-2xl">
            <h3 className="text-3xl font-bold text-black mb-4">
              Notre engagement qualité
            </h3>
            <p className="text-xl text-black/80 mb-8 font-light max-w-2xl mx-auto">
              Vous orienter correctement sans vous faire perdre de temps, 
              et sans promesses irréalistes. C'est notre signature.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-black">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">100%</div>
                <div className="text-sm text-black/70 font-light">Gratuit</div>
              </div>
              <div className="h-12 w-px bg-black/20" />
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">0</div>
                <div className="text-sm text-black/70 font-light">Engagement</div>
              </div>
              <div className="h-12 w-px bg-black/20" />
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">48h</div>
                <div className="text-sm text-black/70 font-light">Réponse max</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}