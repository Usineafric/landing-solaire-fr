import { CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function PreFilter() {
  return (
    <section className="py-18 md:py-20 bg-gray-50 border-y border-gray-100">
      <div className="container-page grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-indigo-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Pré-filtrage
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            À qui s’adresse cette demande ?
          </h2>

          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Cette demande concerne uniquement :
          </p>

          <ul className="mt-7 space-y-3 text-gray-800">
            {[
              "Les propriétaires de maison individuelle",
              "Situés en France métropolitaine",
              "Souhaitant étudier un projet photovoltaïque",
            ].map((x, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </span>
                <span className="font-medium">{x}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 mt-0.5" />
              <div>
                <div className="font-semibold">Important</div>
                <div className="text-sm mt-1">
                  Cette demande ne concerne pas les appartements ou locations.
                  Si votre situation ne correspond pas, le formulaire ne sera pas envoyé.
                </div>
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm text-gray-500">
            Objectif : conserver des demandes exploitables, sans faire perdre de temps aux particuliers ni aux professionnels.
          </p>
        </div>

        <div className="card p-7">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-indigo-50 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <div className="font-semibold">Pourquoi ce filtre ?</div>
              <div className="text-sm text-gray-600">
                Pour privilégier la qualité plutôt que le volume.
              </div>
            </div>
          </div>

          <div className="mt-5 text-sm text-gray-700 leading-relaxed">
            Nous posons quelques questions pour vérifier que la demande correspond à un projet de maison individuelle.
            Cela permet d’éviter les demandes non adaptées et d’améliorer la pertinence des mises en relation.
          </div>

          <div className="mt-6 grid gap-3">
            {[
              { t: "Données transmises uniquement à un professionnel", s: "Dans le cadre strict de votre demande." },
              { t: "Aucune obligation", s: "Vous restez libre de donner suite ou non." },
              { t: "Pas de promesses chiffrées", s: "On parle faisabilité, pas “gains garantis”." },
            ].map((b, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="font-semibold text-gray-900">{b.t}</div>
                <div className="text-sm text-gray-600 mt-1">{b.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
