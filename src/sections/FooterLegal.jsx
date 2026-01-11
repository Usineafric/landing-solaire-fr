import { Link } from "react-router-dom";
import { Mail, MapPin, FileText, Shield, Cookie, Zap, Award, Map, Calculator } from "lucide-react";

export default function FooterEnrichi() {
  const currentYear = new Date().getFullYear();

  const pagesSatellites = [
    { icon: Shield, label: "Garanties", href: "/garanties" },
    { icon: Map, label: "Processus", href: "/processus" },
    { icon: Zap, label: "Réalisations", href: "/realisations" },
    { icon: Calculator, label: "Simulateur", href: "/simulateur" }
  ];

  const liensLegaux = [
    { icon: FileText, label: "Mentions légales", href: "/mentions-legales" },
    { icon: Shield, label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    { icon: Cookie, label: "Gestion des cookies", href: "/cookies" }
  ];

  return (
    <footer className="bg-gray-950 text-white">
      <div className="container-page py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Colonne 1 - À propos */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="font-bold text-xl text-white">
                SolairePro
              </div>
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
              Votre partenaire de confiance pour l'installation de panneaux solaires. 
              Plus de 2 800 projets réalisés depuis 2019.
            </p>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Award key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-yellow-400 font-semibold text-sm">4.9/5</span>
            </div>
          </div>

          {/* Colonne 2 - Pages Satellites */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">
              Découvrir
            </h3>
            <nav className="space-y-3">
              {pagesSatellites.map((link, i) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={i}
                    to={link.href}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-gray-600 group-hover:text-yellow-400 transition-colors" />
                    <span className="font-light">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Colonne 3 - Liens légaux */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">
              Informations
            </h3>
            <nav className="space-y-3">
              {liensLegaux.map((link, i) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={i}
                    to={link.href}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-gray-600 group-hover:text-yellow-400 transition-colors" />
                    <span className="font-light">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Colonne 4 - Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">
              Contact
            </h3>
            <div className="space-y-4 text-gray-400 text-sm font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-300 mb-1">Neclid LTD</div>
                  <div className="leading-relaxed">
                    Service clientèle France
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-300 mb-1">Email</div>
                  <a
                    href="mailto:privacy@leadspodium.com"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    privacy@leadspodium.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm font-light">
              © {currentYear} SolairePro. Tous droits réservés.
            </div>

            <div className="text-xs text-gray-600 font-light text-center md:text-right">
              <strong className="text-gray-500">Hébergement :</strong> Cloudflare Pages<br />
              101 Townsend St, San Francisco, CA 94107, USA
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}