import { ArrowLeft, Cookie, Info, Settings, Shield, Chrome, Check } from "lucide-react";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container-page py-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="container-page py-16 max-w-4xl">
        {/* Title */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Politique de Cookies
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          
          {/* 1. Qu'est-ce qu'un cookie */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  1. Qu'est-ce qu'un Cookie ?
                </h2>
                <p className="text-gray-600 font-light">
                  Définition et fonctionnement
                </p>
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed font-light">
                Un cookie est un petit fichier texte déposé sur votre ordinateur, tablette 
                ou smartphone lors de la visite d'un site web. Il permet de reconnaître votre 
                navigateur et de mémoriser certaines informations vous concernant, afin de 
                faciliter votre navigation ultérieure.
              </p>
            </div>
          </section>

          {/* 2. Cookies utilisés */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex-shrink-0">
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  2. Cookies Utilisés sur ce Site
                </h2>
                <p className="text-gray-600 font-light">
                  Liste exhaustive des cookies
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Cookies nécessaires */}
              <div className="border-l-4 border-green-400 pl-4 bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-green-900">Cookies Strictement Nécessaires</h3>
                </div>
                <p className="text-green-800 text-sm font-light mb-3">
                  Ces cookies sont indispensables au fonctionnement du site. 
                  Ils ne nécessitent pas votre consentement.
                </p>
                <div className="space-y-2 text-sm font-light">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <div className="font-semibold text-green-900 mb-1">Supabase Auth</div>
                    <p className="text-green-700">
                      <strong>Finalité :</strong> Authentification anonyme pour sauvegarder votre demande d'étude
                    </p>
                    <p className="text-green-700">
                      <strong>Durée :</strong> Session (supprimé à la fermeture du navigateur)
                    </p>
                  </div>
                </div>
              </div>

              {/* Cookies analytiques */}
              <div className="border-l-4 border-blue-400 pl-4 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Cookies Analytiques (Soumis à consentement)</h3>
                <p className="text-gray-700 text-sm font-light mb-3">
                  Ces cookies nous aident à comprendre comment vous utilisez le site
                  pour améliorer votre expérience. Ils ne sont activés qu'après votre consentement.
                </p>
                <div className="space-y-2 text-sm font-light">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <div className="font-semibold text-blue-900 mb-1">Google Analytics 4</div>
                    <p className="text-blue-700">
                      <strong>Finalité :</strong> Mesure d'audience, analyse du trafic et comportement utilisateur
                    </p>
                    <p className="text-blue-700">
                      <strong>Durée :</strong> 2 ans maximum
                    </p>
                    <p className="text-blue-700">
                      <strong>Plus d'infos :</strong>{" "}
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">
                        Politique Google
                      </a>
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <div className="font-semibold text-blue-900 mb-1">Meta Pixel (Facebook)</div>
                    <p className="text-blue-700">
                      <strong>Finalité :</strong> Mesure de l'efficacité publicitaire et remarketing
                    </p>
                    <p className="text-blue-700">
                      <strong>Durée :</strong> 90 jours maximum
                    </p>
                    <p className="text-blue-700">
                      <strong>Plus d'infos :</strong>{" "}
                      <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">
                        Politique Meta
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Gérer vos cookies */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex-shrink-0">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  3. Gérer vos Cookies
                </h2>
                <p className="text-gray-600 font-light">
                  Comment contrôler les cookies
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed font-light">
                Vous pouvez à tout moment choisir de désactiver les cookies via 
                les paramètres de votre navigateur. Voici comment procéder selon 
                les navigateurs les plus courants :
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "Google Chrome", path: "Paramètres → Confidentialité et sécurité → Cookies et autres données de sites" },
                  { name: "Mozilla Firefox", path: "Préférences → Vie privée et sécurité → Cookies et données de sites" },
                  { name: "Safari", path: "Préférences → Confidentialité → Cookies et données de sites web" },
                  { name: "Microsoft Edge", path: "Paramètres → Confidentialité, recherche et services → Cookies" }
                ].map((browser, i) => (
                  <div key={i} className="border-l-4 border-purple-400 pl-4 bg-purple-50 p-4 rounded-lg">
                    <div className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Chrome className="w-4 h-4 text-purple-600" />
                      {browser.name}
                    </div>
                    <p className="text-sm text-gray-700 font-light">{browser.path}</p>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
                <p className="text-amber-900 text-sm font-light">
                  <strong>⚠️ Attention :</strong> Bloquer tous les cookies peut affecter 
                  le fonctionnement du site, notamment l'impossibilité de soumettre le 
                  formulaire de demande d'étude.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Cookies tiers */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  4. Cookies Tiers
                </h2>
                <p className="text-gray-600 font-light">
                  Protection de votre vie privée
                </p>
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed font-light mb-4">
                Ce site utilise des cookies tiers (Google Analytics, Meta Pixel)
                <strong> uniquement après votre consentement explicite</strong>.
                Un bandeau de consentement vous est présenté lors de votre première visite.
              </p>
              <p className="text-gray-700 leading-relaxed font-light">
                Si vous refusez les cookies analytiques, aucune donnée n'est partagée
                avec ces services tiers.
              </p>
            </div>
          </section>

          {/* 5. Durée de conservation */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Durée de Conservation des Cookies
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed font-light mb-4">
                Les cookies strictement nécessaires utilisés sur ce site sont des 
                cookies de session. Ils sont automatiquement supprimés lorsque vous 
                fermez votre navigateur.
              </p>
              <p className="text-gray-700 leading-relaxed font-light">
                Aucune donnée n'est conservée au-delà de votre session de navigation.
              </p>
            </div>
          </section>

          {/* 6. Mise à jour de la politique */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Mise à Jour de la Politique
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed font-light mb-4">
                Cette politique de cookies peut être mise à jour à tout moment pour 
                refléter les changements apportés à notre utilisation des cookies.
              </p>
              <p className="text-gray-700 leading-relaxed font-light">
                Nous vous encourageons à consulter régulièrement cette page pour 
                prendre connaissance des éventuelles modifications.
              </p>
            </div>
          </section>

          {/* 7. Contact */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Contact
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed font-light mb-4">
                Pour toute question concernant notre politique de cookies ou pour 
                exercer vos droits, vous pouvez nous contacter :
              </p>
              <a
                href="mailto:contact@lepanneausolaire.com"
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
              >
                <Check className="w-4 h-4" />
                contact@lepanneausolaire.com
              </a>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Besoin d'aide ?
          </h3>
          <p className="text-gray-700 mb-6 font-light">
            Notre équipe est disponible pour répondre à toutes vos questions 
            concernant l'utilisation des cookies sur notre site.
          </p>
          <a
            href="mailto:contact@lepanneausolaire.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Check className="w-5 h-5" />
            Nous contacter
          </a>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="border-t border-gray-200 py-8 mt-16">
        <div className="container-page text-center">
          <p className="text-sm text-gray-500 font-light">
            © {new Date().getFullYear()} Le Panneau Solaire · Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
}