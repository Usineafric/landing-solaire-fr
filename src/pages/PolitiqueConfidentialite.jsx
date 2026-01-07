import { ArrowLeft, Shield, Lock, Eye, Trash2, Mail, Download, UserCheck } from "lucide-react";

export default function PolitiqueConfidentialite() {
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
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Shield className="w-4 h-4" />
            Conformité RGPD
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Notre Engagement
          </h2>
          <p className="text-gray-700 leading-relaxed font-light">
            NECLID LTD accorde une importance capitale à la protection de vos 
            données personnelles. Cette politique de confidentialité vous informe 
            de manière transparente sur la collecte, l'utilisation et la protection 
            de vos informations personnelles, conformément au Règlement Général sur 
            la Protection des Données (RGPD) et à la loi Informatique et Libertés.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* 1. Responsable du traitement */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex-shrink-0">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  1. Responsable du Traitement
                </h2>
                <p className="text-gray-600 font-light">
                  Qui traite vos données
                </p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700">
              <div className="border-l-4 border-purple-400 pl-4">
                <div className="font-semibold text-gray-900 mb-2">NECLID LTD</div>
                <div className="space-y-1 text-sm font-light">
                  <p>5 Hagdud Haivri</p>
                  <p>7745511 Ashdod</p>
                  <p className="pt-2">
                    Email :{" "}
                    <a
                      href="mailto:privacy@leadspodium.com"
                      className="text-orange-600 hover:text-orange-700 underline font-medium"
                    >
                      privacy@leadspodium.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Données collectées */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  2. Données Collectées
                </h2>
                <p className="text-gray-600 font-light">
                  Quelles informations nous recueillons
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Données que vous nous fournissez directement :
                </h3>
                <ul className="space-y-2 text-gray-700 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Informations d'identité : prénom, nom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Coordonnées : email, téléphone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Informations sur votre logement : statut propriétaire, type de bien, code postal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Détails du projet : type de demande, échéance souhaitée</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Données collectées automatiquement :
                </h3>
                <ul className="space-y-2 text-gray-700 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Données de navigation : adresse IP, type de navigateur, pages visitées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Données techniques : date et heure de connexion, URL de provenance</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Finalités du traitement */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              3. Pourquoi Collectons-nous ces Données ?
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  ✓ Traitement de votre demande d'étude
                </h3>
                <p className="text-sm text-gray-600 font-light">
                  Base légale : Exécution de mesures précontractuelles à votre demande
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  ✓ Mise en relation avec un professionnel qualifié
                </h3>
                <p className="text-sm text-gray-600 font-light">
                  Base légale : Intérêt légitime à vous fournir le service demandé
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  ✓ Amélioration de nos services
                </h3>
                <p className="text-sm text-gray-600 font-light">
                  Base légale : Intérêt légitime à améliorer la qualité de service
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  ✓ Respect de nos obligations légales
                </h3>
                <p className="text-sm text-gray-600 font-light">
                  Base légale : Obligation légale (conservation des données)
                </p>
              </div>
            </div>
          </section>

          {/* 4. Destinataires */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              4. Qui a Accès à vos Données ?
            </h2>

            <div className="space-y-4 text-gray-700 font-light">
              <p className="leading-relaxed">
                Vos données personnelles sont transmises uniquement aux destinataires suivants :
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3 bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <span className="text-orange-600 font-bold mt-1">1.</span>
                  <div>
                    <span className="font-semibold text-gray-900">Un professionnel certifié</span>
                    <p className="text-sm text-gray-600 mt-1">
                      Un seul installateur qualifié reçoit vos coordonnées si votre projet est éligible
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <span className="text-blue-600 font-bold mt-1">2.</span>
                  <div>
                    <span className="font-semibold text-gray-900">Nos prestataires techniques</span>
                    <p className="text-sm text-gray-600 mt-1">
                      Hébergement (Netlify, Supabase) - Serveurs situés en Europe
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <span className="text-gray-600 font-bold mt-1">3.</span>
                  <div>
                    <span className="font-semibold text-gray-900">Personnel autorisé de NECLID LTD</span>
                    <p className="text-sm text-gray-600 mt-1">
                      Pour la gestion administrative de votre demande
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-6 p-5 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">
                      Notre Engagement
                    </h4>
                    <p className="text-sm text-green-800">
                      <strong>Nous ne vendons JAMAIS vos données</strong> à des tiers ou à des 
                      plateformes de démarchage commercial. Vos informations sont uniquement 
                      utilisées pour traiter votre demande d'étude.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Durée de conservation */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              5. Combien de Temps Conservons-nous vos Données ?
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Leads traités et mis en relation
                  </h3>
                  <p className="text-sm text-gray-600 font-light">
                    Conservation pendant 3 ans à compter de la mise en relation, puis suppression
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Leads non éligibles ou non traités
                  </h3>
                  <p className="text-sm text-gray-600 font-light">
                    Conservation pendant 1 an maximum, puis suppression automatique
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-xl">∞</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Données de connexion (logs)
                  </h3>
                  <p className="text-sm text-gray-600 font-light">
                    Conservation pendant 1 an conformément aux obligations légales
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Vos droits */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  6. Vos Droits sur vos Données
                </h2>
                <p className="text-gray-600 font-light">
                  Conformément au RGPD
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Droit d'accès
                </h3>
                <p className="text-sm text-blue-800 font-light">
                  Obtenir une copie de vos données personnelles
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Droit de rectification
                </h3>
                <p className="text-sm text-purple-800 font-light">
                  Corriger ou mettre à jour vos informations
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
                <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Droit à l'effacement
                </h3>
                <p className="text-sm text-red-800 font-light">
                  Demander la suppression de vos données
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Droit à la portabilité
                </h3>
                <p className="text-sm text-orange-800 font-light">
                  Récupérer vos données dans un format exploitable
                </p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">
                Comment exercer vos droits ?
              </h3>
              <p className="text-gray-700 mb-4 font-light">
                Pour toute demande, contactez-nous à l'adresse suivante en précisant 
                votre nom, prénom et l'adresse email utilisée lors de votre demande :
              </p>
              <a
                href="mailto:privacy@leadspodium.com"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                privacy@leadspodium.com
              </a>
              <p className="text-sm text-gray-600 mt-4 font-light">
                Nous nous engageons à répondre sous <strong>30 jours maximum</strong>.
              </p>
            </div>
          </section>

          {/* 7. Sécurité */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-600 flex-shrink-0">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  7. Sécurité de vos Données
                </h2>
                <p className="text-gray-600 font-light">
                  Mesures de protection mises en œuvre
                </p>
              </div>
            </div>

            <div className="space-y-3 text-gray-700 font-light">
              <div className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span>Transmission cryptée via protocole SSL/TLS (HTTPS)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span>Stockage sécurisé sur des serveurs Supabase (Europe)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span>Accès restreint aux données par authentification</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span>Sauvegardes régulières et redondance des données</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span>Monitoring et détection des intrusions</span>
              </div>
            </div>
          </section>

          {/* 8. Cookies */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Politique de Cookies
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed font-light mb-4">
                Ce site utilise uniquement des cookies techniques nécessaires à son 
                bon fonctionnement (session, authentification anonyme). Aucun cookie 
                publicitaire ou de tracking tiers n'est déposé sans votre consentement.
              </p>
              <p className="text-gray-700 leading-relaxed font-light">
                Vous pouvez à tout moment refuser ou supprimer les cookies via les 
                paramètres de votre navigateur. Cependant, cela peut affecter certaines 
                fonctionnalités du site.
              </p>
            </div>
          </section>

          {/* 9. Modifications */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Modifications de cette Politique
            </h2>
            <p className="text-gray-700 leading-relaxed font-light">
              Nous nous réservons le droit de modifier cette politique de confidentialité 
              à tout moment. Toute modification sera publiée sur cette page avec une 
              nouvelle date de mise à jour. Nous vous encourageons à consulter régulièrement 
              cette page pour rester informé.
            </p>
          </section>

          {/* 10. Contact CNIL */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Réclamation auprès de la CNIL
            </h2>
            <p className="text-gray-700 leading-relaxed font-light mb-4">
              Si vous estimez que vos droits ne sont pas respectés, vous avez le droit 
              d'introduire une réclamation auprès de la Commission Nationale de 
              l'Informatique et des Libertés (CNIL) :
            </p>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="font-semibold text-gray-900 mb-2">CNIL</div>
              <div className="space-y-1 text-sm text-gray-700 font-light">
                <p>3 Place de Fontenoy</p>
                <p>TSA 80715</p>
                <p>75334 Paris Cedex 07</p>
                <p className="pt-2">
                  Site web :{" "}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 underline font-medium"
                  >
                    www.cnil.fr
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl text-center">
          <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Vos données sont en sécurité
          </h3>
          <p className="text-gray-700 mb-6 font-light max-w-2xl mx-auto">
            Nous prenons la protection de votre vie privée très au sérieux. 
            Pour toute question ou demande concernant vos données personnelles, 
            n'hésitez pas à nous contacter.
          </p>
          <a
            href="mailto:privacy@leadspodium.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            Contactez notre DPO
          </a>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="border-t border-gray-200 py-8 mt-16">
        <div className="container-page text-center">
          <p className="text-sm text-gray-500 font-light">
            © {new Date().getFullYear()} NECLID LTD · Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
}