import { useState } from "react";
import { FileText, CheckCircle, ArrowRight, X } from "lucide-react";

export default function LeadCaptureForm({ variant = "inline" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'lead_magnet_download', {
        event_category: 'Lead',
        event_label: 'Guide PDF Download'
      });
    }
    if (window.fbq) {
      window.fbq('track', 'Lead', { content_name: 'Guide PDF' });
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className={`${variant === "inline" ? "my-10" : ""} bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 text-center`}>
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Merci !
        </h3>
        <p className="text-gray-700 mb-4">
          Votre guide a ete envoye a <strong>{email}</strong>
        </p>
        <p className="text-sm text-gray-500">
          Verifiez votre boite mail (et les spams) dans les prochaines minutes.
        </p>
      </div>
    );
  }

  return (
    <div className={`${variant === "inline" ? "my-10" : ""} bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8`}>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Guide gratuit : 10 erreurs a eviter avant d'installer des panneaux solaires
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Recevez notre checklist complete pour reussir votre projet solaire et eviter les pieges courants.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              required
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  Telecharger
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-3">
            Pas de spam. Desabonnement en 1 clic.
          </p>
        </div>
      </div>
    </div>
  );
}
