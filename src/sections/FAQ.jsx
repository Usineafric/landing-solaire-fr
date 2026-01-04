import { CheckCircle2, ClipboardList, ShieldCheck, UserCheck } from "lucide-react";

export default function WhatYouGet() {
  const items = [
    {
      icon: ClipboardList,
      title: "Qualification claire",
      text: "Nous vérifions que la demande correspond à une maison individuelle en France métropolitaine.",
    },
    {
      icon: UserCheck,
      title: "Étude de cohérence",
      text: "Un professionnel évalue la faisabilité selon les informations transmises.",
    },
    {
      icon: ShieldCheck,
      title: "Mise en relation encadrée",
      text: "Vous êtes recontacté uniquement si le projet est cohérent et pertinent.",
    },
    {
      icon: CheckCircle2,
      title: "Sans pression",
      text: "Aucune obligation. Pas de promesses chiffrées, pas de discours trompeur.",
    },
  ];

  return (
    <section className="py-18 md:py-20">
      <div className="container-page">
        <p className="text-indigo-600 font-semibold text-sm tracking-widest uppercase mb-3">
          Ce que vous recevez
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Une demande utile, pas un discours marketing
        </h2>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl">
          Le but est simple : transmettre une demande exploitable, et éviter les faux espoirs comme les démarches inutiles.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <div key={i} className="card card-hover p-6">
                <div className="h-11 w-11 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="mt-4 font-semibold">{it.title}</div>
                <div className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {it.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
