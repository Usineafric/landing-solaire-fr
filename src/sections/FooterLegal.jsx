import { Mail, MapPin, FileText, Shield, Cookie } from "lucide-react";

export default function FooterLegal() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white">
      <div className="container-page py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Colonne 1 - À propos */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">
              Informations légales
            </h3>
            <div className="space-y-4 text-gray-400 text-sm font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-300 mb-1">Neclid LTD</div>
                  <div className="leading-relaxed">
                    5 Hagdud Haivri 1006<br />
                    7745511 Ashdod<br />
                    Israël
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-300 mb-1">Contact</div>
                  <a
                    href="mailto:privacy@leadspodium.com"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    privacy@leadspodium.com
                  </a>
                </div>
              </div>

              <div className="text-xs text-gray-500 pt-4 border-t border-gray-800">
                <strong className="text-gray-400">Hébergement :</strong> Netlify, Inc.<br />
                2325 3rd Street, Suite 296<br />
                San Francisco, CA 94107, USA
              </div>
            </div>
          </div>

          {/* Colonne 2 - Liens légaux */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">
              Liens utiles
            </h3>
            <nav className="space-y-3">
              {[
                { icon: FileText, label: "Mentions légales", href: "/mentions-legales" },
                { icon: Shield, label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
                { icon: Cookie, label: "Gestion des cookies", href: "/cookies" }
              ].map((link, i) => {
                const Icon = link.icon;
                return (
                  <a
                    key={i}
                    href={link.href}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-gray-600 group-hover:text-yellow-400 transition-colors" />
                    <span className="font-light">{link.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Colonne 3 - Engagements */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">
              Nos engagements
            </h3>
            <div className="space-y-3 text-sm text-gray-400 font-light">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                <p className="leading-relaxed">
                  Vos données sont uniquement utilisées pour traiter votre demande d'étude
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                <p className="leading-relaxed">
                  Aucune revente de données à des tiers ou partenaires commerciaux
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                <p className="leading-relaxed">
                  Vous pouvez exercer vos droits (accès, rectification, suppression) à tout moment
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-xs text-gray-500 font-light">
                En soumettant le formulaire, vous acceptez d'être recontacté dans le cadre strict de votre demande.
              </p>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-500">
            <div className="font-light">
              © {currentYear} Neclid LTD · Tous droits réservés
            </div>
            <div className="flex items-center gap-2 font-light">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Service en ligne
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}