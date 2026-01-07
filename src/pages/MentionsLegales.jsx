import { ArrowLeft, Mail, MapPin, Server } from "lucide-react";

export default function MentionsLegales() {
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
            Mentions Légales
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
          {/* 1. Éditeur du site */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  1. Éditeur du Site
                </h2>
                <p className="text-gray-600 font-light">
                  Informations sur la société éditrice
                </p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700">
              <div className="border-l-4 border-orange-400 pl-4">
                <div className="font-semibold text-gray-900 mb-2">IDTRADING LLC</div>
                <div className="space-y-1 text-sm font-light">
                  <p>La villa Torrimar</p>
                  <p>Reina Margarita 112</p>
                  <p>Guaynabo, 00969</p>
                  <p>Puerto Rico</p>
                </div>
              </div>

              <div className="pt-4">
                <div className="font-semibold text-gray-900 mb-2">Contact</div>
                <a
                  href="mailto:privacy@leadspodium.com"
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                >
                  <Mail className="w-4 h-4" />
                  privacy@leadspodium.com
                </a>
              </div>
            </div>
          </section>

          {/* 2. Hébergement */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0">
                <Server className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  2. Hébergement
                </h2>
                <p className="text-gray-600 font-light">
                  Informations sur l'hébergeur du site
                </p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700">
              <div className="border-l-4 border-blue-400 pl-4">
                <div className="font-semibold text-gray-900 mb-2">Netlify, Inc.</div>
                <div className="space-y-1 text-sm font-light">
                  <p>2325 3rd Street, Suite 296</p>
                  <p>San Francisco, CA 94107</p>
                  <p>États-Unis</p>
                </div>
              </div>

              <div className="pt-4">
                <div className="font-semibold text-gray-900 mb-2">Base de données</div>
                <div className="space-y-1 text-sm font-light">
                  <p>Supabase, Inc.</p>
                  <p>Serveurs situés en Europe (Frankfurt, Allemagne)</p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Propriété intellectuelle */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Propriété Intellectuelle
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed font-light mb-4">
                L'ensemble du contenu de ce site (textes, images, graphismes, logos, 
                icônes, sons, logiciels) est la propriété exclusive d'IDTRADING LLC 
                ou de ses partenaires.
              </p>
              <p className="text-gray-700 leading-relaxed font-light">
                Toute reproduction, représentation, modification, publication, 
                adaptation de tout ou partie des éléments du site, quel que soit 
                le moyen ou le procédé utilisé, est interdite, sauf autorisation 
                écrite préalable.
              </p>
            </div>
          </section>

          {/* 4. Protection des données */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Protection des Données Personnelles
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed font-light mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD) 
                et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, 
                de rectification, de suppression et d'opposition aux données vous concernant.
              </p>
              <p className="text-gray-700 leading-relaxed font-light mb-4">
                Pour exercer ces droits ou pour toute question relative à la protection 
                de vos données, contactez-nous à :
              </p>
              <a
                href="mailto:privacy@leadspodium.com"
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
              >
                <Mail className="w-4 h-4" />
                privacy@leadspodium.com
              </a>
              <p className="text-gray-700 leading-relaxed font-light mt-4">
                Pour en savoir plus sur la collecte et le traitement de vos données, 
                consultez notre{" "}
                <a
                  href="/politique-de-confidentialite"
                  className="text-orange-600 hover:text-orange-700 underline font-medium"
                >
                  Politique de Confidentialité
                </a>
                .
              </p>
            </div>
          </section>

          {/* 5. Cookies */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Cookies
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed font-light mb-4">
                Ce site utilise des cookies techniques nécessaires à son bon 
                fonctionnement. Aucun cookie publicitaire ou de tracking tiers 
                n'est utilisé sans votre consentement préalable.
              </p>
              <p className="text-gray-700 leading-relaxed font-light">
                Vous pouvez à tout moment désactiver les cookies dans les paramètres 
                de votre navigateur.
              </p>
            </div>
          </section>

          {/* 6. Responsabilité */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Limitation de Responsabilité
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed font-light mb-4">
                IDTRADING LLC s'efforce d'assurer l'exactitude et la mise à jour 
                des informations diffusées sur ce site. Toutefois, IDTRADING LLC 
                ne peut garantir l'exactitude, la précision ou l'exhaustivité des 
                informations mises à disposition.
              </p>
              <p className="text-gray-700 leading-relaxed font-light">
                Les informations présentes sur ce site ne constituent pas un conseil 
                juridique, fiscal ou technique. Pour toute décision importante, nous 
                vous recommandons de consulter un professionnel qualifié.
              </p>
            </div>
          </section>

          {/* 7. Loi applicable */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Loi Applicable et Juridiction
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed font-light">
                Les présentes mentions légales sont régies par le droit de Porto Rico. 
                En cas de litige, et à défaut d'accord amiable, les tribunaux compétents 
                de Porto Rico seront seuls compétents.
              </p>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Des questions ?
          </h3>
          <p className="text-gray-700 mb-6 font-light">
            Notre équipe est à votre disposition pour toute question relative 
            aux mentions légales ou à vos données personnelles.
          </p>
          <a
            href="mailto:privacy@leadspodium.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            Nous contacter
          </a>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="border-t border-gray-200 py-8 mt-16">
        <div className="container-page text-center">
          <p className="text-sm text-gray-500 font-light">
            © {new Date().getFullYear()} IDTRADING LLC · Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
}