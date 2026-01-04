import { ShieldCheck, Lock, UserCheck, CheckCircle2 } from "lucide-react";

export default function Reassurance() {
  const items = [
    {
      icon: UserCheck,
      title: "Contact humain",
      text: "Vous êtes recontacté uniquement si la demande est cohérente.",
    },
    {
      icon: ShieldCheck,
      title: "Aucune obligation",
      text: "Vous restez libre de donner suite ou non.",
    },
    {
      icon: Lock,
      title: "Données encadrées",
      text: "Transmission uniquement à un professionnel, dans le cadre de la demande.",
    },
    {
      icon: CheckCircle2,
      title: "Transparence",
      text: "Pas de promesses chiffrées, pas de “simulation d’aides”.",
    },
  ];

  return (
    <section className="py-18 md:py-20 bg-gray-50 border-y border-gray-100">
      <div className="container-page">
        <p className="text-indigo-600 font-semibold text-sm tracking-widest uppercase mb-3">
          Réassurance
        </p>

        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Une demande simple, encadrée, sans pression
        </h2>

        <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl">
          Objectif : vous orienter correctement, sans vous faire perdre de temps et sans promesses irréalistes.
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
