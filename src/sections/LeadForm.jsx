import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, AlertTriangle, Zap, Lock, Shield, Home, MapPin, User, Mail, Phone, Calendar, FileText } from "lucide-react";
import { saveLead, checkDuplicateEmail } from "../lib/supabase";
import { sendConfirmationEmail, sendAdminNotification } from "../lib/resend";
import { step1Schema, step2Schema, step3Schema, validateStep, checkEligibility } from "../lib/validation";
import { trackLeadConversion, trackFormStart, trackFormStep } from "../utils/tracking";

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
    requestType: "Étude de faisabilité gratuite",
    projectDeadline: "",
    description: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    consent: false,
  });

  const progress = useMemo(() => (step / 3) * 100, [step]);

  // Validation avec Zod
  const step1Validation = useMemo(() => validateStep(step1Schema, form), [form]);
  const step2Validation = useMemo(() => validateStep(step2Schema, form), [form]);
  const step3Validation = useMemo(() => validateStep(step3Schema, form), [form]);

  const isStep1Valid = step1Validation.success;
  const isStep2Valid = step2Validation.success;
  const isStep3Valid = step3Validation.success;
  const isEligible = useMemo(() => checkEligibility(form), [form.isOwner, form.housingType]);

  const back = () => {
    setError("");
    setBlocked(false);
    setStep((s) => Math.max(1, s - 1));
    setTimeout(() => {
      document.getElementById('lead-form-card')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 100);
  };

  const next = () => {
    setError("");
    if (step === 1) {
      if (!isStep1Valid) {
        const firstError = step1Validation.errors ? Object.values(step1Validation.errors)[0] : null;
        if (firstError) setError(firstError);
        return;
      }
      if (!isEligible) {
        setBlocked(true);
        return;
      }
    }
    if (step === 2 && !isStep2Valid) {
      const firstError = step2Validation.errors ? Object.values(step2Validation.errors)[0] : null;
      if (firstError) setError(firstError);
      return;
    }
    const nextStep = Math.min(3, step + 1);
    setStep(nextStep);

    // Tracking des etapes du formulaire
    if (step === 1) trackFormStart();
    trackFormStep(nextStep);

    setTimeout(() => {
      document.getElementById('lead-form-card')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isStep3Valid) {
      const firstError = step3Validation.errors ? Object.values(step3Validation.errors)[0] : null;
      if (firstError) setError(firstError);
      return;
    }

    if (!isEligible) {
      setBlocked(true);
      return;
    }

    setSubmitting(true);
    const cleanPhone = form.phone.replace(/\s/g, "");

    try {
      const isDuplicate = await checkDuplicateEmail(form.email);
      if (isDuplicate) {
        setError("Une demande avec cet email a déjà été envoyée récemment.");
        setSubmitting(false);
        return;
      }

      const leadData = {
        ...form,
        phone: cleanPhone,
        timeframe: form.projectDeadline,
      };

      await saveLead(leadData);
      await sendConfirmationEmail(leadData);
      await sendAdminNotification(leadData);

      // Tracking de la conversion
      trackLeadConversion({
        postal_code: form.postalCode,
        timeframe: form.projectDeadline
      });

      setSent(true);
      setSubmitting(false);
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      setSubmitting(false);
    }
  };

  return (
    <section id="form" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-50/30 to-orange-50/30 pointer-events-none" />
      
      <div className="container-page relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left info */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Zap className="inline w-4 h-4 mr-1" />
              Étape {step}/3
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Recevez votre
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
                étude personnalisée
              </span>
            </h2>

            <p className="text-lg text-gray-600 mb-10 font-light leading-relaxed">
              Complétez ce formulaire en <strong className="font-semibold">moins de 2 minutes</strong> pour recevoir 
              une analyse technique détaillée de votre projet solaire.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Shield, text: "Sans engagement" },
                { icon: Lock, text: "100% gratuit" },
                { icon: CheckCircle2, text: "Conforme RGPD" },
                { icon: Zap, text: "1 seul professionnel contacté" }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-bold text-blue-900 mb-2">
                    Engagement de confidentialité
                  </div>
                  <p className="text-sm text-blue-800 leading-relaxed font-light">
                    Vos données ne sont jamais revendues. Un seul professionnel certifié RGE vous contacte pour une étude personnalisée.
                  </p>
                </div>
              </div>
            </div>

            {blocked && (
              <div className="mt-8 bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-red-900 mb-2">
                      Projet non éligible
                    </div>
                    <p className="text-sm text-red-800 leading-relaxed font-light">
                      Cette étude est réservée aux propriétaires de maison individuelle en France métropolitaine.
                    </p>
                  </div>
                </div>
              </div>
            )}
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
                  <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto font-light leading-relaxed">
                    Votre étude sera réalisée sous <strong className="font-semibold">48 heures ouvrées</strong>.
                  </p>
                  <p className="text-md text-gray-600 mb-10 max-w-md mx-auto font-light leading-relaxed">
                    📧 Vous recevrez un <strong className="font-semibold">email de confirmation</strong> dans quelques minutes.
                    Vérifiez vos spams si besoin.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setStep(1);
                      setBlocked(false);
                      setForm({
                        isOwner: "", housingType: "", postalCode: "",
                        requestType: "Étude de faisabilité gratuite",
                        projectDeadline: "", description: "",
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
                <form 
                  id="lead-form-card"
                  onSubmit={submit} 
                  className="p-10 md:p-12"
                >
                  {/* Progress bar */}
                  <div className="mb-10">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* STEP 1 */}
                  {step === 1 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                          Informations sur votre logement
                        </h3>

                        <div className="space-y-8">
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-4">
                              Êtes-vous propriétaire de votre logement ?
                            </label>
                            <div className="grid sm:grid-cols-2 gap-4">
                              {[
                                { value: "yes", label: "Oui", icon: CheckCircle2 },
                                { value: "no", label: "Non", icon: AlertTriangle }
                              ].map((opt) => {
                                const Icon = opt.icon;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setForm((f) => ({ ...f, isOwner: opt.value }))}
                                    className={`flex items-center gap-3 p-5 rounded-xl border-2 font-semibold transition-all ${
                                      form.isOwner === opt.value
                                        ? "border-orange-500 bg-gradient-to-br from-yellow-50 to-orange-50 text-orange-700"
                                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                                    }`}
                                  >
                                    <Icon className="w-5 h-5" />
                                    {opt.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-4">
                              Type de bien
                            </label>
                            <div className="grid sm:grid-cols-2 gap-4">
                              {[
                                { value: "house", label: "Maison", icon: Home },
                                { value: "apartment", label: "Appartement", icon: Home }
                              ].map((opt) => {
                                const Icon = opt.icon;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setForm((f) => ({ ...f, housingType: opt.value }))}
                                    className={`flex items-center gap-3 p-5 rounded-xl border-2 font-semibold transition-all ${
                                      form.housingType === opt.value
                                        ? "border-orange-500 bg-gradient-to-br from-yellow-50 to-orange-50 text-orange-700"
                                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                                    }`}
                                  >
                                    <Icon className="w-5 h-5" />
                                    {opt.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                              Code postal
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="text"
                                value={form.postalCode}
                                onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
                                className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-5 py-4 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                                placeholder="75001"
                                maxLength="5"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-800 text-sm">
                          {error}
                        </div>
                      )}

                      <div className="flex justify-end pt-4">
                        <button
                          type="button"
                          onClick={next}
                          disabled={!isStep1Valid}
                          className={`px-8 py-4 rounded-xl font-semibold shadow-lg transition-all inline-flex items-center gap-2 ${
                            isStep1Valid
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

                  {/* STEP 2 */}
                  {step === 2 && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-8">
                        Détails de votre projet
                      </h3>

                      <div className="space-y-8">
                        {/* Type de demande */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-4">
                            Type de demande
                          </label>
                          <div className="grid gap-4">
                            {[
                              "Étude de faisabilité gratuite",
                              "Devis détaillé avec visite",
                              "Informations générales"
                            ].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setForm((f) => ({ ...f, requestType: opt }))}
                                className={`text-left p-5 rounded-xl border-2 font-semibold transition-all ${
                                  form.requestType === opt
                                    ? "border-orange-500 bg-gradient-to-br from-yellow-50 to-orange-50 text-orange-700"
                                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-4">
                            <Calendar className="inline w-5 h-5 mr-2 text-orange-600" />
                            Quand souhaitez-vous réaliser ce projet ?
                          </label>
                          <div className="grid gap-4">
                            {[
                              { value: "urgent", label: "Urgent (< 3 mois)", badge: "🔥 Prioritaire" },
                              { value: "3-6", label: "3 à 6 mois", badge: "" },
                              { value: "6-12", label: "6 à 12 mois", badge: "" },
                              { value: "+12", label: "Plus de 12 mois", badge: "" },
                              { value: "thinking", label: "Encore en réflexion", badge: "" }
                            ].map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => setForm((f) => ({ ...f, projectDeadline: opt.value }))}
                                className={`text-left p-5 rounded-xl border-2 font-semibold transition-all relative ${
                                  form.projectDeadline === opt.value
                                    ? "border-orange-500 bg-gradient-to-br from-yellow-50 to-orange-50 text-orange-700"
                                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{opt.label}</span>
                                  {opt.badge && (
                                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-bold">
                                      {opt.badge}
                                    </span>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-2 ml-1">
                            💡 Cette information nous aide à prioriser votre demande
                          </p>
                        </div>

                        {/* Description optionnelle */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-3">
                            <FileText className="inline w-5 h-5 mr-2 text-orange-600" />
                            Informations complémentaires <span className="text-gray-400 font-normal">(optionnel)</span>
                          </label>
                          <textarea
                            value={form.description}
                            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                            className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
                            placeholder="Ex : toiture en ardoise, présence d'arbres à proximité, projet de rénovation en cours..."
                            rows="3"
                          />
                          <p className="text-xs text-gray-500 mt-2 ml-1">
                            💡 Partagez tout détail utile pour affiner votre étude
                          </p>
                        </div>
                      </div>

                      {/* Réassurance */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                          <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                          <div>
                            <div className="font-bold text-green-900 mb-2">
                              ✓ Sans engagement ✓ 100% gratuit ✓ Conforme RGPD
                            </div>
                            <p className="text-sm text-green-800 leading-relaxed font-light">
                              Un seul professionnel certifié vous contacte. Aucune revente de données.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={back}
                          className="px-8 py-4 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                        >
                          Retour
                        </button>
                        <button
                          type="button"
                          onClick={next}
                          disabled={!isStep2Valid}
                          className={`flex-1 px-8 py-4 rounded-xl font-semibold shadow-lg transition-all inline-flex items-center justify-center gap-2 ${
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

                  {/* STEP 3 */}
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
                            J'accepte que mes données soient utilisées pour traiter ma demande.
                            <a href="/politique-confidentialite" target="_blank" className="text-orange-600 hover:underline ml-1">
                              En savoir plus
                            </a>
                          </span>
                        </label>
                      </div>

                      {error && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-800 text-sm">
                          {error}
                        </div>
                      )}

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={back}
                          className="px-8 py-4 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                        >
                          Retour
                        </button>
                        <button
                          type="submit"
                          disabled={!isStep3Valid || submitting}
                          className={`flex-1 px-8 py-4 rounded-xl font-semibold shadow-lg transition-all inline-flex items-center justify-center gap-2 ${
                            isStep3Valid && !submitting
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-xl hover:scale-[1.02]"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {submitting ? "Envoi en cours..." : "Recevoir mon étude"}
                          {!submitting && <ArrowRight className="w-5 h-5" />}
                        </button>
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