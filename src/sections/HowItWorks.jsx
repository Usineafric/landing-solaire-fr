import { ClipboardList, Search, PhoneCall } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how" className="py-18 md:py-20">
      <div className="container-page">
        <p className="text-indigo-600 font-semibold text-sm tracking-widest uppercase mb-3">
          Déroulé
        </p>

        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Comment se déroule une étude solaire ?
        </h2>

        <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl">
          Process simple, sans promesse chiffrée : on qualifie, on vérifie la cohérence, puis un professionnel peut vous recontacter.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: ClipboardList,
              step: "01",
              title: "Vous décrivez votre logement",
              text: "Quelques informations utiles (propriété, maison, code postal, délai).",
            },
            {
              icon: Search,
              step: "02",
              title: "Étude de cohérence",
              text: "Un professionnel évalue la faisabilité selon votre situation et votre projet.",
            },
            {
              icon: PhoneCall,
              step: "03",
              title: "Contact si projet pertinent",
              text: "Vous êtes recontacté uniquement si la demande correspond à un projet cohérent.",
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="card card-hover p-7">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                    {s.step}
                  </div>
                </div>

                <div className="mt-5 font-semibold text-lg">{s.title}</div>
                <div className="mt-2 text-gray-600 leading-relaxed">{s.text}</div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Les informations générales sur le solaire sont disponibles sur les sites institutionnels français.
        </p>
      </div>
    </section>
  );
}
