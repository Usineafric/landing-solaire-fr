import { CheckCircle2, AlertTriangle, Shield, Home, MapPin } from "lucide-react";

export default function PreFilter() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Colonne gauche */}
          <div>
            <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Éligibilité
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              À qui s'adresse
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
                cette demande ?
              </span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-10 font-light">
              Cette étude personnalisée est exclusivement destinée aux propriétaires de maison individuelle en France métropolitaine.
            </p>

            {/* Liste des critères */}
            <div className="space-y-4">
              {[
                { icon: Home, text: "Propriétaire de maison individuelle" },
                { icon: MapPin, text: "Situé en France métropolitaine" },
                { icon: CheckCircle2, text: "Projet photovoltaïque sérieux" }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="font-semibold text-gray-900 text-lg">
                        {item.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Alert box */}
            <div className="mt-10 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-bold text-amber-900 mb-2">
                    Critères d'éligibilité stricts
                  </div>
                  <p className="text-sm text-amber-800 leading-relaxed font-light">
                    Les appartements, copropriétés et locations ne sont pas éligibles à cette étude. 
                    Le formulaire ne sera pas traité si ces critères ne sont pas respectés.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500 font-light">
              Notre objectif : garantir des demandes qualifiées et éviter les pertes de temps pour tous.
            </p>
          </div>

          {/* Colonne droite - Card explicative */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Pourquoi ce filtre ?</div>
                  <div className="text-sm text-gray-600 font-light">Qualité avant quantité</div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-8 font-light">
                Nous vérifions systématiquement que chaque demande correspond à un projet de maison individuelle. 
                Cette approche rigoureuse permet d'éviter les demandes inadaptées et d'optimiser la pertinence des mises en relation.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Transmission sécurisée",
                    desc: "Vos données sont uniquement transmises à un professionnel qualifié dans le cadre strict de votre demande."
                  },
                  {
                    title: "Sans engagement",
                    desc: "Vous restez totalement libre de donner suite ou non à la proposition qui vous sera faite."
                  },
                  {
                    title: "Transparence totale",
                    desc: "Aucune promesse chiffrée trompeuse. Nous parlons faisabilité réelle, pas de gains garantis fictifs."
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-orange-200 transition-all">
                    <div className="font-semibold text-gray-900 mb-2">{item.title}</div>
                    <div className="text-sm text-gray-600 leading-relaxed font-light">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}