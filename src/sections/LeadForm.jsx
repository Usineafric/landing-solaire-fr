import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, AlertTriangle, Zap, Lock, Shield, Home, MapPin, Clock, User, Mail, Phone } from "lucide-react";

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [blocked, setBlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
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

  const progress = useMemo(() => (step / 3) * 100, [step]);
  const isStep1Valid = useMemo(() => form.isOwner && form.housingType && form.postalCode.trim().length >= 4, [form]);
  const isStep2Valid = useMemo(() => Boolean(form.requestType) && Boolean(form.timeframe), [form]);
  const isStep3Valid = useMemo(() => {
    const emailOk = /\S+@\S+\.\S+/.test(form.email);
    const phoneOk = form.phone.trim().replace(/\s/g, "").length >= 8;
    return form.firstName.trim() && form.lastName.trim() && phoneOk && emailOk && form.consent;
  }, [form]);
  const isEligible = useMemo(() => form.isOwner === "yes" && form.housingType === "house", [form.isOwner, form.housingType]);

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
        return;
      }
    }
    if (step === 2 && !isStep2Valid) return;
    setStep((s) => Math.min(3, s + 1));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isStep3Valid || !isEligible) {
      setBlocked(true);
      return;
    }
    setSubmitting(true);
    try {
      // eslint-disable-next-line no-console
      console.log("LEAD_SOLAR_FR", { ...form, createdAt: new Date().toISOString() });
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSent(true);
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="form" className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="container-page relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full font-semibold mb-6 shadow-lg">
            <Zap className="w-5 h-5" />
            Étude gratuite · Sans engagement
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Votre étude solaire
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
              personnalisée
            </span>
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Réponse sous 48h · Données 100% sécurisées
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-7xl mx-auto">
          {/* Sidebar Progress */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-8 space-y-6">
              {/* Progress Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 text-lg">Votre progression</h3>
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-bold text-sm">
                    Étape {step}/3
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-700 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Steps */}
                <div className="space-y-4">
                  {[
                    { num: 1, label: "Informations logement", icon: Home },
                    { num: 2, label: "Détails du projet", icon: Clock },
                    { num: 3, label: "Coordonnées", icon: User }
                  ].map((s) => {
                    const Icon = s.icon;
                    const isActive = step === s.num;
                    const isComplete = step > s.num;
                    
                    return (
                      <div
                        key={s.num}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                          isActive ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200" :
                          isComplete ? "bg-gray-50" : "bg-white border border-gray-200"
                        }`}
                      >
                        <div
                          className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
                            isComplete ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white" :
                            isActive ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white" :
                            "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {isComplete ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                        </div>
                        <div className={`font-semibold ${isActive || isComplete ? "text-gray-900" : "text-gray-400"}`}>
                          {s.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trust badges */}
              {!blocked && (
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-6 border border-emerald-200">
                  <div className="flex items-start gap-3">
                    <Shield className="w-7 h-7 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-emerald-900 mb-3">Garanties</div>
                      <ul className="space-y-2.5 text-sm text-emerald-800">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          100% gratuit, aucun frais
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Données cryptées SSL
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Aucun spam garanti
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Réponse sous 48h ouvrées
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {blocked && (
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-6 border border-red-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-7 h-7 text-red-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-red-900 mb-2">Profil non éligible</div>
                      <p className="text-sm text-red-800 leading-relaxed">
                        Cette étude est exclusivement réservée aux propriétaires de maison individuelle en France métropolitaine.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {sent ? (
                <div className="p-16 text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-8 shadow-2xl">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-4">
                    Demande confirmée
                  </h3>
                  <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto font-light leading-relaxed">
                    Votre étude sera réalisée sous <strong className="font-semibold">48 heures ouvrées</strong>.
                    Un expert vous contactera si votre projet correspond à nos critères.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setStep(1);
                      setBlocked(false);
                      setForm({
                        isOwner: "", housingType: "", postalCode: "",
                        requestType: "Étude", timeframe: "< 6 mois",
                        firstName: "", lastName: "", phone: "", email: "",
                        consent: false,
                      });
                    }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2"
                  >
                    Nouvelle demande
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="p-10 md:p-12">
                  {step === 1 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                          Informations sur votre logement
                        </h3>

                        <div className="space-y-8">
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-4">
                              Statut d'occupation
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                              {[
                                { v: "yes", label: "Propriétaire", icon: CheckCircle2 },
                                { v: "no", label: "Locataire", icon: Home }
                              ].map((o) => {
                                const Icon = o.icon;
                                return (
                                  <button
                                    key={o.v}
                                    type="button"
                                    onClick={() => setForm((f) => ({ ...f, isOwner: o.v }))}
                                    className={`group relative p-6 rounded-2xl border-2 transition-all ${
                                      form.isOwner === o.v
                                        ? "border-orange-500 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg"
                                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                                    }`}
                                  >
                                    <Icon className={`w-8 h-8 mb-3 ${form.isOwner === o.v ? "text-orange-600" : "text-gray-400"}`} />
                                    <div className="font-semibold text-gray-900">{o.label}</div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-4">
                              Type de bien
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                              {[
                                { v: "house", label: "Maison individuelle", icon: Home },
                                { v: "other", label: "Autre (appartement...)", icon: MapPin }
                              ].map((o) => {
                                const Icon = o.icon;
                                return (
                                  <button
                                    key={o.v}
                                    type="button"
                                    onClick={() => setForm((f) => ({ ...f, housingType: o.v }))}
                                    className={`group relative p-6 rounded-2xl border-2 transition-all ${
                                      form.housingType === o.v
                                        ? "border-orange-500 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg"
                                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                                    }`}
                                  >
                                    <Icon className={`w-8 h-8 mb-3 ${form.housingType === o.v ? "text-orange-600" : "text-gray-400"}`} />
                                    <div className="font-semibold text-gray-900">{o.label}</div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-4">
                              Code postal
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                value={form.postalCode}
                                onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
                                placeholder="75001"
                                className="w-full border-2 border-gray-200 rounded-2xl pl-14 pr-6 py-5 text-lg font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                                inputMode="numeric"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={next}
                        disabled={!isStep1Valid}
                        className={`w-full py-5 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                          isStep1Valid
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-xl hover:scale-[1.02]"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Continuer
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-8">
                        Détails de votre projet
                      </h3>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-4">
                            Nature de la demande
                          </label>
                          <select
                            value={form.requestType}
                            onChange={(e) => setForm((f) => ({ ...f, requestType: e.target.value }))}
                            className="w-full border-2 border-gray-200 rounded-2xl px-6 py-5 text-lg font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all bg-white appearance-none cursor-pointer"
                          >
                            <option>Information</option>
                            <option>Étude de faisabilité</option>
                            <option>Demande de devis</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-4">
                            Échéance du projet
                          </label>
                          <select
                            value={form.timeframe}
                            onChange={(e) => setForm((f) => ({ ...f, timeframe: e.target.value }))}
                            className="w-full border-2 border-gray-200 rounded-2xl px-6 py-5 text-lg font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all bg-white appearance-none cursor-pointer"
                          >
                            <option>Projet immédiat</option>
                            <option>Moins de 6 mois</option>
                            <option>Simple information</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={back}
                          className="flex-1 border-2 border-gray-300 text-gray-700 py-5 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all"
                        >
                          Retour
                        </button>
                        <button
                          type="button"
                          onClick={next}
                          disabled={!isStep2Valid}
                          className={`flex-1 py-5 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                            isStep2Valid
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-xl hover:scale-[1.02]"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Continuer
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-8">
                        Vos coordonnées
                      </h3>

                      <div className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">Prénom</label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                value={form.firstName}
                                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                                className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-5 py-4 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                                placeholder="Jean"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">Nom</label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                value={form.lastName}
                                onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                                className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-5 py-4 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                                placeholder="Dupont"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">Téléphone</label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                value={form.phone}
                                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-5 py-4 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                                placeholder="06 12 34 56 78"
                                inputMode="tel"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">Email</label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-5 py-4 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                                placeholder="vous@email.com"
                              />
                            </div>
                          </div>
                        </div>

                        <label className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border-2 border-gray-200 cursor-pointer hover:border-orange-200 transition-all">
                          <input
                            type="checkbox"
                            checked={form.consent}
                            onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            required
                          />
                          <span className="text-sm text-gray-700 leading-relaxed font-light">
                            En soumettant ce formulaire, j'accepte que mes données soient utilisées par IDTRADING LLC 
                            pour traiter ma demande. Contact : <a href="mailto:privacy@leadspodium.com" className="underline font-medium text-orange-600">privacy@leadspodium.com</a>
                          </span>
                        </label>
                      </div>

                      {error && (
                        <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-5 text-red-800 font-medium">
                          {error}
                        </div>
                      )}

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={back}
                          className="flex-1 border-2 border-gray-300 text-gray-700 py-5 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all"
                        >
                          Retour
                        </button>
                        <button
                          type="submit"
                          disabled={!isStep3Valid || submitting}
                          className={`flex-1 py-5 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                            !isStep3Valid || submitting
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl hover:scale-[1.02]"
                          }`}
                        >
                          {submitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-5 h-5" />
                              Envoyer ma demande
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-2 pt-2">
                        <Lock className="w-4 h-4" />
                        <span className="font-light">Connexion sécurisée SSL · Données cryptées</span>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}