import { Link } from "react-router-dom";
import { MapPin, Zap, Clock, ShieldCheck, PhoneCall, CheckCircle2 } from "lucide-react";

export default function ProjectGallery() {
  return (
    <section className="py-24 bg-white">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Zap className="inline w-4 h-4 mr-1" />
            Devis panneaux solaires
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Recevez votre devis
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
              gratuitement
            </span>
          </h2>

          <p className="text-lg text-gray-600 font-light">
            Décrivez votre projet en 1 minute. Un professionnel vous recontacte pour vous proposer une étude adaptée.
          </p>
        </div>

        {/* How it works */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: "1) Décrivez votre maison",
              desc: "Ville, type de logement, consommation et contraintes. Ça permet d’estimer la puissance possible.",
              icon: <MapPin className="w-7 h-7" />,
            },
            {
              title: "2) Vérification rapide",
              desc: "Nous filtrons les demandes incohérentes / doublons pour éviter les appels inutiles.",
              icon: <ShieldCheck className="w-7 h-7" />,
            },
            {
              title: "3) Un pro vous rappelle",
              desc: "Vous recevez une proposition de devis/étude selon votre zone et votre situation.",
              icon: <PhoneCall className="w-7 h-7" />,
            },
          ].map((step, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center text-orange-700 mb-5">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 font-light leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust / Mini FAQ */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
            <div className="text-2xl font-bold mb-3">Ce que vous obtenez</div>
            <ul className="space-y-3 text-gray-200 font-light">
              {[
                "Une étude/devis adapté à votre maison",
                "Un contact rapide (selon disponibilité des partenaires)",
                "Une démarche sans engagement",
                "Des informations claires avant toute décision",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-lg">
            <div className="text-2xl font-bold text-gray-900 mb-4">Questions fréquentes</div>

            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-900">Est-ce gratuit ?</div>
                <div className="text-gray-600 font-light">
                  Oui, la demande d’étude est gratuite. Vous êtes libre d’accepter ou non une proposition.
                </div>
              </div>

              <div>
                <div className="font-semibold text-gray-900">En combien de temps je suis rappelé ?</div>
                <div className="text-gray-600 font-light">
                  En général sous 24–48h, selon votre zone et la disponibilité des professionnels.
                </div>
              </div>

              <div>
                <div className="font-semibold text-gray-900">Vous êtes l’installateur ?</div>
                <div className="text-gray-600 font-light">
                  Non : vous êtes mis en relation avec un professionnel partenaire pour réaliser l’étude et le devis.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            to="/#form"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Faire ma demande de devis
            <Zap className="w-5 h-5" />
          </Link>

          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Formulaire en 1 minute • Sans engagement</span>
          </div>
        </div>
      </div>
    </section>
  );
}
