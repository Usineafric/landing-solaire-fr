import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

export default function LeadForm() {
  const [step, setStep] = useState(1); // 1..3
  const [blocked, setBlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    isOwner: "", // "yes" | "no"
    housingType: "", // "house" | "other"
    postalCode: "",

    requestType: "Étude", // "Information" | "Étude" | "Devis"
    timeframe: "< 6 mois", // "Immédiat" | "< 6 mois" | "Information"

    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    consent: false,
  });

  const progress = useMemo(() => (step / 3) * 100, [step]);

  const isStep1Valid = useMemo(() => {
    return (
      form.isOwner &&
      form.housingType &&
      form.postalCode.trim().length >= 4
    );
  }, [form]);

  const isStep2Valid = useMemo(() => Boolean(form.requestType) && Boolean(form.timeframe), [form]);

  const isStep3Valid = useMemo(() => {
    const emailOk = /\S+@\S+\.\S+/.test(form.email);
    const phoneOk = form.phone.trim().replace(/\s/g, "").length >= 8;
    return (
      form.firstName.trim() &&
      form.lastName.trim() &&
      phoneOk &&
      emailOk &&
      form.consent
    );
  }, [form]);

  const isEligible = useMemo(() => {
    return form.isOwner === "yes" && form.housingType === "house";
  }, [form.isOwner, form.housingType]);

  const back = () => {
    setError("");
    setBlocked(false);
    setStep((s) => Math.max(1, s - 1));
  };

  const next = () => {
    setError("");
    if (step === 1) {
      if (!isStep1Valid) return;
      if (!isEligible) {
        setBlocked(true);
        return; // on ne passe pas à l’étape 2
      }
    }
    if (step === 2 && !isStep2Valid) return;
    setStep((s) => Math.min(3, s + 1));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isStep3Valid) return;
    if (!isEligible) {
      setBlocked(true);
      return;
    }

    setSubmitting(true);

    try {
      // Étape 2 (prochaine) : on remplacera par l’URL Google Apps Script
      // Pour l’instant on simule l’envoi proprement
      // eslint-disable-next-line no-console
      console.log("LEAD_SOLAR_FR", { ...form, createdAt: new Date().toISOString() });

      // Quand l’endpoint sera prêt, on fera:
      // await fetch(import.meta.env.VITE_SHEETS_ENDPOINT, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(...) })

      setSent(true);
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="form" className="py-18 md:py-20 bg-gray-50 border-t border-gray-100">
      <div className="container-page grid lg:grid-cols-2 gap-10 items-start">
        {/* Colonne gauche */}
        <div>
          <p className="text-indigo-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Demande
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Votre étude personnalisée
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-xl">
            Formulaire en 3 étapes. Nous filtrons pour conserver des demandes exploitables.
          </p>

          <div className="mt-8 card p-7">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-gray-900">Progression</div>
              <div className="text-sm text-gray-500">Étape {step}/3</div>
            </div>

            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-2 bg-indigo-600 rounded-full" style={{ width: `${progress}%` }} />
            </div>

            <div className="mt-6 space-y-3 text-sm text-gray-700">
              <div className={`flex items-center gap-2 ${step >= 1 ? "text-gray-900" : "text-gray-400"}`}>
                <CheckCircle2 className={`h-4 w-4 ${step >= 1 ? "text-indigo-600" : "text-gray-300"}`} />
                Profil logement
              </div>
              <div className={`flex items-center gap-2 ${step >= 2 ? "text-gray-900" : "text-gray-400"}`}>
                <CheckCircle2 className={`h-4 w-4 ${step >= 2 ? "text-indigo-600" : "text-gray-300"}`} />
                Projet
              </div>
              <div className={`flex items-center gap-2 ${step >= 3 ? "text-gray-900" : "text-gray-400"}`}>
                <CheckCircle2 className={`h-4 w-4 ${step >= 3 ? "text-indigo-600" : "text-gray-300"}`} />
                Contact & consentement
              </div>
            </div>
          </div>

          {blocked && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <div>
                  <div className="font-semibold">Profil non éligible</div>
                  <div className="text-sm mt-1">
                    Cette demande est réservée aux <strong>propriétaires</strong> de <strong>maison individuelle</strong>.
                    Le formulaire ne sera pas envoyé pour les locations ou appartements.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Colonne droite - Form */}
        <div className="card p-8">
          {sent ? (
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 px-4 py-2 text-sm font-semibold border border-indigo-100">
                <CheckCircle2 className="h-4 w-4" />
                Demande envoyée
              </div>
              <h3 className="mt-5 text-2xl font-extrabold tracking-tight">
                Merci, votre demande est bien enregistrée.
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Un professionnel pourra vous recontacter uniquement si votre projet est cohérent avec les informations transmises.
              </p>

              <button
                className="mt-7 btn-primary"
                onClick={() => {
                  setSent(false);
                  setStep(1);
                  setBlocked(false);
                  setForm({
                    isOwner: "",
                    housingType: "",
                    postalCode: "",
                    requestType: "Étude",
                    timeframe: "< 6 mois",
                    firstName: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    consent: false,
                  });
                }}
              >
                Faire une nouvelle demande
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              {step === 1 && (
                <>
                  <div className="text-lg font-semibold">Étape 1 — Profil logement</div>

                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-2">Êtes-vous propriétaire ?</div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { v: "yes", label: "Oui" },
                        { v: "no", label: "Non" },
                      ].map((o) => (
                        <button
                          key={o.v}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, isOwner: o.v }))}
                          className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${
                            form.isOwner === o.v
                              ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                              : "border-gray-200 hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-2">Type de logement</div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { v: "house", label: "Maison individuelle" },
                        { v: "other", label: "Autre" },
                      ].map((o) => (
                        <button
                          key={o.v}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, housingType: o.v }))}
                          className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${
                            form.housingType === o.v
                              ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                              : "border-gray-200 hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Code postal
                    </label>
                    <input
                      value={form.postalCode}
                      onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
                      placeholder="Ex : 13006"
                      className="w-full border border-gray-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 bg-white"
                      inputMode="numeric"
                    />
                  </div>

                  <button type="button" onClick={next} className="w-full btn-primary">
                    Continuer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>

                  <p className="text-xs text-gray-500">
                    Si vous n’êtes pas propriétaire ou si ce n’est pas une maison individuelle, la demande n’est pas envoyée.
                  </p>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="text-lg font-semibold">Étape 2 — Projet</div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Type de demande
                    </label>
                    <select
                      value={form.requestType}
                      onChange={(e) => setForm((f) => ({ ...f, requestType: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 bg-white"
                    >
                      <option>Information</option>
                      <option>Étude</option>
                      <option>Devis</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Délai du projet
                    </label>
                    <select
                      value={form.timeframe}
                      onChange={(e) => setForm((f) => ({ ...f, timeframe: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 bg-white"
                    >
                      <option>Immédiat</option>
                      <option>{"< 6 mois"}</option>
                      <option>Information</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={back} className="w-1/2 btn-secondary">
                      Retour
                    </button>
                    <button type="button" onClick={next} className="w-1/2 btn-primary">
                      Continuer
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="text-lg font-semibold">Étape 3 — Contact</div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                      <input
                        value={form.firstName}
                        onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                      <input
                        value={form.lastName}
                        onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="Ex : 06 12 34 56 78"
                        className="w-full border border-gray-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 bg-white"
                        inputMode="tel"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="vous@email.com"
                        className="w-full border border-gray-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                      className="mt-1 h-4 w-4"
                      required
                    />
                    <span>
                      En soumettant ce formulaire, vous acceptez que les informations saisies soient utilisées par IDTRADING LLC afin de traiter votre demande et de vous recontacter dans ce cadre.
                      Vous pouvez exercer vos droits en écrivant à{" "}
                      <a className="underline" href="mailto:privacy@leadspodium.com">
                        privacy@leadspodium.com
                      </a>
                      .
                    </span>
                  </label>

                  {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={back} className="w-1/2 btn-secondary">
                      Retour
                    </button>
                    <button
                      type="submit"
                      disabled={!isStep3Valid || submitting}
                      className={`w-1/2 inline-flex items-center justify-center rounded-full px-7 py-3.5 font-semibold transition-colors duration-200 ${
                        !isStep3Valid || submitting
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {submitting ? "Envoi..." : "Envoyer"}
                    </button>
                  </div>

                  <p className="text-xs text-gray-500">
                    Liens :{" "}
                    <a className="underline" href="/politique-de-confidentialite">Politique de confidentialité</a>{" "}
                    ·{" "}
                    <a className="underline" href="/mentions-legales">Mentions légales</a>{" "}
                    ·{" "}
                    <a className="underline" href="/cookies">Cookies</a>
                  </p>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
